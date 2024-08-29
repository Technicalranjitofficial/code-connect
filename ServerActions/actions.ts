"use server";


export const addQuestion = async(question:any)=>{
    try {
        const res = await fetch("http://localhost:8000/app/createProblem",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        });

        if(res.ok){
            return res.json();
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const runCode = async(data:{
    code:string;
    languageCode:string;
    problemId:string;
})=>{
    try {
        const res = await fetch("http://localhost:8000/app/runCode",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(res.ok){
            const data = await res.json();
            console.log(data);
            return data;
        }

        // console.log(res);
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}
