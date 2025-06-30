'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react"




export default function RedirectShortURL(){

    const router=useRouter();

    useEffect(()=>{
        console.log("beginning redirecting process");
        fetch("/api/redirect",{
            method:'POST'
        })
        .then(res=>res.json())
        .then(res=>router.replace(res.redirectTo))
    })
    return(
        <main className="w-full h-screen bg-white">

        </main>
    )
}