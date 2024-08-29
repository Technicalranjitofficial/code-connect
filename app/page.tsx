"use client"
import AddQuestion from "@/components/AddQuestion";
import { Editor } from "@monaco-editor/react";
import Image from "next/image";
import { useState } from "react";


const options = {
  selectOnLineNumbers: true,
  fontSize: 16,
  minimap: {
    enabled: false,
  },
}

export default function Home() {


  const [code, setCode] = useState<string>(`
  function sum(num1,num2){  
    return num1+num2;
  }
  `);





  const onChange = (newValue:any) => {
    // console.log(newValue);

    setCode(newValue);


  }

  

  const onSubmit = () => {
    console.log("submitting code");

    console.log(code);

   

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


      


{/* 
 <Editor height="90vh" onChange={onChange} value={code} defaultLanguage="javascript" defaultValue="// some comment" />;


 <button onClick={onSubmit}>Submit</button> */}



 <AddQuestion/>

     
    </main>
  );
}
