
import { adminFirestoreConfig } from "@/config/adminFirestoreConfig";
import { redisConfig } from "@/config/redisConfig";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { hash } = body

        if (hash.length < 7) throw new Error("invalid URL entered");

        const firestoreInstance = adminFirestoreConfig.getInstance()
        const redisInstance = redisConfig.getInstance()

        const actualURLFromRedis = await redisInstance.getRedisInstance().get(hash);
        if (actualURLFromRedis) {
            return NextResponse.json({
                message: "Actual URL found",
                redirectTo: actualURLFromRedis
            })
        }

        const docSnap = await firestoreInstance.getDB().collection('URLRecords').where('short_URL_hash', '==', hash).get()
        if (docSnap.docs.length == 0) throw new Error('no URL exist with this hash');

        const actualURLFromFirestore = docSnap.docs[0].data().long_URL;
        await redisInstance.getRedisInstance().set(hash, actualURLFromFirestore);

        return NextResponse.json({
            message: "Actual URL found",
            redirectTo: actualURLFromFirestore
        })

    }
    catch (err) {
        NextResponse.json({
            message: "error",
            error: err instanceof Error ? err.message : 'unknown error'
        })
    }
}