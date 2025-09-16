"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("@upstash/redis");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const redis = redis_1.Redis.fromEnv();
// llm notes init
console.log(process.env.GROQ_API_KEY);
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY
});
const app = (0, express_1.default)();
//  init a s3 client
const s3Client = new client_s3_1.S3Client({
    region: (_a = process.env.AWS_REGION) !== null && _a !== void 0 ? _a : "", // e.g., "us-east-1"
    credentials: {
        accessKeyId: (_b = process.env.AWS_ACCESS_KEY_ID) !== null && _b !== void 0 ? _b : "",
        secretAccessKey: (_c = process.env.AWS_SECRET_ACCESS_KEY) !== null && _c !== void 0 ? _c : '',
    },
    maxAttempts: 5,
});
//generating notes
function getAiGeneratedNotes(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const chatCompletion = yield groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: params,
                },
            ],
            model: "openai/gpt-oss-120b",
        });
        return (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message.content;
    });
}
//storing in pdf
function GenerateNotesPdf(notes) {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit_1.default(); // Create new instance each time
        const stream = fs_1.default.createWriteStream('notes.pdf');
        doc.pipe(stream);
        doc.fontSize(18).text(notes);
        doc.end();
        stream.on('finish', () => resolve());
        stream.on('error', () => reject());
    });
}
//main meat of logic
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            try {
                //pop revison message quque
                const revisionData = yield redis.rpop("revision");
                if (revisionData && revisionData.topic !== null && revisionData.topic.trim() !== '') {
                    console.log(`Processing: ${revisionData.id}`);
                    //hash sett 
                    yield redis.hset(revisionData.id, {
                        status: 'pending',
                        topic: revisionData.topic
                    });
                    const notes = yield getAiGeneratedNotes(`generate notes for ${revisionData.topic} in clean string format `);
                    const notesPdf = yield GenerateNotesPdf(String(notes));
                    const fileContent = yield fs_1.default.promises.readFile("notes.pdf");
                    //uploading to s3
                    const params = {
                        Bucket: String(process.env.S3_BUCKET),
                        Key: `${revisionData.id} ${revisionData.topic}/notes/notes.pdf`,
                        Body: fileContent,
                        ContentType: 'application/pdf',
                    };
                    const command = new client_s3_1.PutObjectCommand(params);
                    const result = yield s3Client.send(command);
                    console.log(result.$metadata.httpStatusCode, "Notes uploaded  succesffuly");
                    //hash updated
                    redis.hset(revisionData.id, {
                        topic: revisionData.topic,
                        status: "completed"
                    });
                    return "done with creating notes";
                }
            }
            catch (e) {
                console.log(`something went wrong ${e}`);
            }
        }
    });
}
main();
app.listen(5084, () => {
    console.log("Listinging on a port number 5084");
});
