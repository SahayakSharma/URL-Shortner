'use client'
import { useAuth } from "@/context/authContext";
import { useState } from "react"


export default function RegisterNewURL(){

    const [newURL,setNewURL]=useState<string>('');
    const {user}=useAuth();

    async function handleRegisterNewURL() {
        try{
            fetch("/api/register",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    longURL:"https://sahayaksharma.in",
                    userId:user?.uid
                })
            })
            .then((res)=>res.json())
            .then((res)=>console.log(res))
        }
        catch(err){

        }
    }
    return(
        <main className="p-10">
            <input type="text"  className="outline-none border-[1px] border-white rounded-md px-5 py-3 text-xl" placeholder="https://"/>
            <button className="px-5 py-3 rounded-md bg-blue-500 mx-5" onClick={handleRegisterNewURL}>Register URL</button>
        </main>
    )
}