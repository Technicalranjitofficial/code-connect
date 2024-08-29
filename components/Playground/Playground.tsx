import React, { useEffect, useState } from 'react'

import Split from 'react-split';
import CodeEditor from './CodeEditor/CodeEditor';
import Footer from './Footer/Footer';
import { mapBoilerplateCodeToLanguage } from '@/utils/helper';
import { runCode } from '@/ServerActions/actions';
const Playground = ({ executionFunction, functionSignature, problemId, testCases, description }: {
    executionFunction: {
        "c": string;
        "c++": string;
        "java": string;
    },
    problemId: string;
   
    description: string;
    functionSignature: {
        "c": string;
        "c++": string;
        "java": string;
    },
    testCases: {
        input: string;
        expectedOutput: string;
        passed: boolean | null;
        output:undefined|string

    }[]
}) => {

    const [TestCase,setTestCase] = useState<{
        input: string;
        expectedOutput: string;
        passed: boolean | null;
        output:undefined|string
    }[]>([]);

    const [code, setCode] = useState<string>(`${mapBoilerplateCodeToLanguage("c", functionSignature["c"], executionFunction["c"])}`);

    const [running,setRunning] = useState(false);

    const [message, setMessage] = useState<{
        compile_output:string;
        status:number
    }>({
        compile_output:"",
        status:0
    });


    const onRunCode = async()=>{
        if(!problemId) return alert("Please select a problem first");
        console.log("submitting code");

        console.log(code);

        setRunning(true);

       

        const res = await runCode({
            code: code,
            languageCode: "75",
            problemId: problemId
        })

        const tCases = res.TestCasePassed;

        // const newTestCase = []
        console.log("tcase",tCases);

        if(tCases?.length>0){
           const newT = testCases.map((t,i)=>{
                return {
                    ...t,
                    output:tCases[i].output,
                    passed:tCases[i].passed
                }
            })

            setTestCase(newT);
            setMessage({
                compile_output:res.compile_output,
                status:res.status.id
            })
            // console.log(newT,TestCase);
        }

        console.log(res);


    }

    const onSubmitCode = async() => {};



    return (

        <div className='flex flex-col h-[95vh] text-white  w-full'

        >

            <div>
                <button className='text-white bg-[#1f1f1f] px-3 py-2 rounded-tr-md rounded-tl-md  font-bold' >Code</button>
            </div>
            <Split className='h-full' direction='vertical' sizes={[50, 50]} minSize={50}>

                <CodeEditor code={code} setCode={setCode} executionFunction={executionFunction} functionSignature={functionSignature} problemId={problemId} testCases={TestCase.length>0?TestCase:testCases} description={description} />

                <Footer running={running} message={message} testCases={TestCase.length>0?TestCase:testCases} />

            </Split>


            <div className='flex justify-end gap-2 my-2 mr-2'>
                <button onClick={onRunCode} className='px-3 py-2 bg-yellow-800 hover:bg-yellow-900 rounded-md'>Run Code</button>
                <button onClick={onSubmitCode} className='px-3 py-2 bg-green-800 rounded-md hover:bg-green-900'>Submit</button>
            </div>

        </div>
    )
}

export default Playground
