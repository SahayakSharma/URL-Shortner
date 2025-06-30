
import { NextResponse } from "next/server";


export async function POST(request:Request){
    try{
        console.log("begining process")
        return NextResponse.json({
            redirectTo:"https://www.google.com"
        })
    }
    catch(err){
        NextResponse.json({
            message:"something went wrong"
        })
    }
}