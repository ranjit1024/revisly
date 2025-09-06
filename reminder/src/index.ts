import {Redis} from "@upstash/redis"
import dotenv from "dotenv"
dotenv.config();
console.log(process.env.S3_BUCKET)
Redis.fromEnv()