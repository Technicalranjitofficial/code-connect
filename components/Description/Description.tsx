import React from 'react'

import { runCode } from '@/ServerActions/actions';
import { mapBoilerplateCodeToLanguage } from '@/utils/helper';
import { Editor } from '@monaco-editor/react';

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from 'rehype-raw';

import Split from 'react-split';
import { title } from 'process';


const Description = ({description,title}:{
    description:string;
    title:string;
}) => {
  return (

    <div className='flex flex-col h-[95vh]'

    >

       <div>
       <button className='text-white bg-[#1f1f1f] px-3 py-2 rounded-tr-md rounded-tl-md  font-bold' >Description</button>
       </div>

    <div className='p-5 bg-[#1f1f1f] h-full'>
        <h1 className='py-2 text-2xl font-bold text-white'>{title}</h1>
        <Markdown
    className='w-full bg-[#1f1f1f] text-white '

   components={{
   code:function code(props) {
      const {children,inline, className, node, ...rest} = props
      const match = /language-(\w+)/.exec(className || '')



    

        return inline? <code className='border px-2 py-1  border-[#585858] text-[#adadad] rounded-md' {...rest} children={children} /> :  <SyntaxHighlighter
        //   {...rest}
          
        //   PreTag="div"
          children={String(children).replace(/\n$/, '')}
            language={match ? match[1] : ''}
          style={oneDark}
        />


      
    },

    li:function li(props) {
        const {children, ...rest} = props
        return <li className='list-disc list-inside my-2' {...rest} children={children} />
    }

    // pre:function pre(props) {
    //     const {children, ...rest} = props
    //     return <pre className='bg-red-500 rounded-md' {...rest} children={children} />
    // }
  

    

  }}
    remarkPlugins={[remarkGfm]}>{description}</Markdown>
    </div>

    </div>
  )
}

export default Description
