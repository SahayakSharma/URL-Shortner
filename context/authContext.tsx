'use client'
import { createContext,useContext,useState,useEffect, ReactNode } from "react";
import { onAuthStateChanged,User } from "firebase/auth";
import { firebaseConfig } from "@/config/fbConfig";


type IAuthContext={
    user:User|null,

}

const AuthContext=createContext<IAuthContext>({
    user:null
})


export function AuthProvider({children}:{children:ReactNode}){
    const [user,setUser]=useState<User|null>(null)
    const [loading,setLoading]=useState<boolean>(true)
    useEffect(()=>{
        const instance=firebaseConfig.getInstance();
        onAuthStateChanged(instance.getAuth(),(data)=>{
            if(data){
                setUser(data)
            }
            else setUser(null)

            setLoading(false)
        })
    },[onAuthStateChanged])

    return(

        loading ? <p className="text-center py-52">Checking auth status</p>:
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    return useContext(AuthContext);
}