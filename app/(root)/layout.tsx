'use client'
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";




export default function ProtectedLayout({children}:{children:ReactNode}){
    const {user}=useAuth()
    const router=useRouter();
    const [loading,setLoading]=useState<boolean>(true)
    useEffect(()=>{
        if(!user){
            router.replace("/signin")
        }
        else setLoading(false)
    },[user])

    return(
        loading ? <p className="text-center py-52">Loading...</p> :
        <>
            {children}
        </>
    )
}