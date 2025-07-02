import { adminFirestoreConfig } from "@/config/adminFirestoreConfig";
import { redisConfig } from "@/config/redisConfig";
import { convertToBase62 } from "@/helper/conversion";
import { NextResponse } from "next/server";



export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { longURL, userId } = body

        const redisInstance = redisConfig.getInstance()
        const firestoreInstance = adminFirestoreConfig.getInstance();
        
        const snap = await firestoreInstance.getDB().collection('URLRecords').where('long_URL', '==', longURL).where('user_id', '==', userId).get();

        if (snap.docs.length > 0) {
            throw new Error("long URL already mapped")
        }

        const count: number | null = await redisInstance.getRedisInstance().incr('unique-counter')
        if (count==null) {
            throw new Error(`count does not exist`)
        }

        const shortURL = convertToBase62(count)
        const TEN_YEARS = 60 * 60 * 24 * 365 * 10;
        await firestoreInstance.getDB().collection('URLRecords').add({
            created_at: new Date(),
            short_URL_hash: shortURL,
            long_URL: longURL,
            clicks: 0,
            user_id: userId,
            expire_at: new Date(Date.now() + TEN_YEARS * 1000),
        })
        await redisInstance.getRedisInstance().set(shortURL, longURL)
        return NextResponse.json({
            message: "success",
            count: count
        })
    }
    catch (err) {
        return NextResponse.json({
            message: "error",
            err: err instanceof Error ? err.message : 'Unknown error'
        })
    }
}