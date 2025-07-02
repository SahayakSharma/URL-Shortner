import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const fbConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId
};



export class firebaseConfig {
    private static instance: firebaseConfig;
    private app;
    private auth;
    private constructor() {
        this.app=initializeApp(fbConfig)
        this.auth=getAuth(this.app);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new firebaseConfig()
        }
        return this.instance
    }

    getApp(){
        return this.app
    }

    getAuth(){
        return this.auth
    }
    googleSignIn(){
        signInWithPopup(this.auth,provider)
    }
}