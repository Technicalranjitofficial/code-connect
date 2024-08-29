import React, { useEffect, useState } from 'react'



interface TestCases {
    input: string;
    expectedOutput: string;
    passed: boolean | null | "pending";
    output:undefined|string

}[]

const Footer = ({ testCases,message,running }: {
    testCases: {
        input: string;
        expectedOutput: string;
        passed: boolean | null | "pending";
        output:undefined|string

    }[]

    running:boolean,

    message:{
        compile_output:string;
        status:number
    }
}) => {

    const [currentTestCases, setCurrentTestCases] = useState(0);

    const [TestCases, setTestCases] = useState<TestCases[]>([]);



    useEffect(() => {

        console.log("here", testCases, TestCases.length, TestCases);
        if (testCases.length > 0) {
            setTestCases(testCases);
            console.log(testCases);
        }

    }, [testCases, TestCases,running])



    return (
        <div className='h-auto'>
            <div className='flex gap-2 px-3 py-2 flex-row'>
                {TestCases.map((t, i) => {
                    return <button  onClick={() => setCurrentTestCases(i)} key={i} className={`px-3 py-2 rounded-md border ${t.passed===undefined?`border-gray-600`:t.passed?`border-green-500`:`border-red-500`} `}>Test-{i}</button>
                })}
            </div>



            <div className='bg-[#1f1f1f] p-3'>
                <h1 className='text-xl font-bold text-white'>{message.status}</h1>
            </div>

            {/* input  */}

            <div className=' p-3 flex gap-2 flex-col'>

                <span>Input</span>

                <div className=' text-white bg-[#1f1f1f] p-3'>
                    {TestCases.length > 0 && TestCases[currentTestCases].input}
                </div>
            </div>

            <div className=' p-3 flex gap-2 flex-col'>

                <span>Expected Output</span>

                <div className=' text-white bg-[#1f1f1f] p-3'>
                    {TestCases.length > 0 && TestCases[currentTestCases].expectedOutput}
                </div>
            </div>

            {/* {typeof TestCases[currentTestCases].output}; */}

{


    TestCases.length>0 && TestCases[currentTestCases]?.output!==undefined &&   <div className=' p-3 flex gap-2 flex-col'>

    <span>Output</span>

    <div className=' text-white bg-[#1f1f1f] p-3'>
        { TestCases[currentTestCases].output}
    </div>
</div>
}




            {message.status !== 0 && <div className=' p-3 flex gap-2 flex-col'>

                <span>Message:</span>
                <div className=' text-white bg-[#1f1f1f] p-3'>
                    {message.compile_output}
                </div>
            </div>
            }



        </div>
    )
}

export default Footer
