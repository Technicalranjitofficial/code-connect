import Workspace from '@/components/Workspace';
import React from 'react'
// import Markdown from 'react-markdown';


const page = async () => {

    const getProblem = await fetch("http://localhost:8000/app/getProblems", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    });

    if (!getProblem.ok) {
        console.log("Error fetching data");
        return null;
    }

    const resp = await getProblem.json();

    console.log(resp);

   


    return (

        
        <div>








        {
            resp &&     <Workspace  title={resp[3].title} description={resp[3].description} testCases={resp[3].testCases} problemId={resp[3].id} executionFunction={resp[3].executionFunction} functionSignature={resp[3].functionSignature} />
        }

        </div>
    )
}

export default page
