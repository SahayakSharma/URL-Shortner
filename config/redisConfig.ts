import { Redis } from "@upstash/redis";



export class redisConfig{
    private static instance:redisConfig;

    private redis;

    private constructor(){
        this.redis=new Redis({
            token: process.env.NEXT_PUBLIC_TOKEN,
            url:process.env.NEXT_PUBLIC_REDIS_URL
        })
    }

    public static getInstance(){
        if(!this.instance){
            this.instance=new redisConfig()
        }
        return this.instance
    }

    getRedisInstance(){
        return this.redis
    }
}