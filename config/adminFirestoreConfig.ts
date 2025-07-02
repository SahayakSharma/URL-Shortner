import { getFirestore } from "firebase-admin/firestore";
import { getApps,initializeApp,cert } from "firebase-admin/app";
import { getServiceAccountKey } from "@/helper/config";


export class adminFirestoreConfig {
    private static instance: adminFirestoreConfig;

    private db;
    
    private constructor() {
        const serviceAccount=getServiceAccountKey();
        if (!serviceAccount){
            throw new Error("service account key not found")
        }
        if (getApps().length === 0) {
            console.log("this is the service key",serviceAccount)
            initializeApp({
                credential: cert(serviceAccount),
            });
        }
        this.db = getFirestore();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new adminFirestoreConfig()
        }
        return this.instance
    }

    getDB(){
        return this.db
    }
}