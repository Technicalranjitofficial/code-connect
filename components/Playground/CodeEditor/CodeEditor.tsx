import { runCode } from '@/ServerActions/actions';
import { mapBoilerplateCodeToLanguage } from '@/utils/helper';
import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react'

const CodeEditor = ({ executionFunction, functionSignature,problemId,testCases,description,code,setCode }: {
    executionFunction: {
        "c": string;
        "c++": string;
        "java": string;
    },
    problemId: string;
    description: string;
    code: string;
    setCode:(code:string)=>void;
    functionSignature: {
        "c": string;
        "c++": string;
        "java": string;
    },
    testCases: {
        input: string;
        expectedOutput: string;
        passed: boolean|null;

    }[]
}) => {




    // console.log(executionFunction);





    const onChange = (newValue: any) => {
        // console.log(newValue);

        setCode(newValue);


    }



    const onSubmit = async () => {
        if(!problemId) return alert("Please select a problem first");
        console.log("submitting code");

        console.log(code);

        const res = await runCode({
            code: code,
            languageCode: "75",
            problemId: problemId
        })

        console.log(res);



        



    }
  return (
    <Editor theme='vs-dark' height="100%" onChange={onChange} value={code} defaultLanguage="c" />

  )
}

export default CodeEditor
