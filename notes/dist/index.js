"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("@upstash/redis");
//all config
dotenv_1.default.config();
const redis = redis_1.Redis.fromEnv();
// llm init
console.log(process.env.GROQ_API_KEY);
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY
});
//  init a s3 client
const s3Client = new client_s3_1.S3Client({
    region: (_a = process.env.AWS_REGION) !== null && _a !== void 0 ? _a : "us-east-1", // e.g., "us-east-1"
    credentials: {
        accessKeyId: (_b = process.env.AWS_ACCESS_KEY_ID) !== null && _b !== void 0 ? _b : "",
        secretAccessKey: (_c = process.env.AWS_SECRET_ACCESS_KEY) !== null && _c !== void 0 ? _c : '',
    },
    maxAttempts: 5,
});
