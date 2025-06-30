


'use client'

import { firebaseConfig } from "@/config/fbConfig"
import { useAuth } from "@/context/authContext"

export default function SignIn(){
    
    const instance=firebaseConfig.getInstance();


    return(
        <main className="w-full h-screen flex flex-col justify-center items-center gap-10">
            <div className="flex gap-3 items-center w-fit px-5 py-3 border-[1px] border-slate-600 rounded-md" onClick={()=>instance.googleSignIn()}>
                <p>SignIn With Gmail ID</p>
            </div>
        </main>
    )
}