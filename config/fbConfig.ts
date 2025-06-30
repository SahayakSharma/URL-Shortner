import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider,signInWithRedirect } from "firebase/auth";
import { redirect } from "next/navigation";

const provider = new GoogleAuthProvider();

const fbConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId
};

const app=initializeApp(fbConfig)
const auth=getAuth(app)


export class firebaseConfig {
    private static instance: firebaseConfig;
    private constructor() {
        
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new firebaseConfig()
        }
        return this.instance
    }

    getApp(){
        return app
    }

    getAuth(){
        return auth
    }
    googleSignIn(){
        signInWithPopup(auth,provider)
    }
}