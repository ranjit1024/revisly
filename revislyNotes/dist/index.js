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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("@upstash/redis");
const groq_sdk_1 = require("groq-sdk");
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const groq = new groq_sdk_1.Groq({
    apiKey: process.env.GROQ_API_KEY
});
console.log(process.env.GROQ_API_KEY);
const s3 = new client_s3_1.S3Client({
    region: String(process.env.AWS_REGION),
    credentials: {
        accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
    },
    maxAttempts: 5,
    retryMode: 'adaptive'
});
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only pdf files are allowed'));
        }
    }
});
const redis = redis_1.Redis.fromEnv();
function getAiGeneratedNotes(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatCompletion = yield groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: params,
                },
            ],
            model: "openai/gpt-oss-120b",
        });
        return chatCompletion.choices[0].message.content;
    });
}
function GenerateNotesPdf(text) {
    const doc = new pdfkit_1.default();
    doc.pipe(fs_1.default.createWriteStream('./notes/notes2.pdf'));
    doc.fontSize(12)
        .text(text, 10, 10, {
        width: 1000,
        align: 'justify'
    });
    doc.end();
}
app.get("/notesuploaded", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revisionData = yield redis.rpop("revision");
        if (revisionData && revisionData.topic !== null && revisionData.topic.trim() !== '') {
            console.log(`Processing: ${revisionData.id}`);
            const notes = yield getAiGeneratedNotes(`generate notes for ${revisionData.topic} in clean string format `);
            const notesPdf = GenerateNotesPdf(String(`${notes}`));
            const fileContent = fs_1.default.promises.readFile('./notes/notes2.pdf');
            const params = {
                Bucket: String(process.env.S3_BUCKET),
                Key: `${revisionData.id} ${revisionData.topic}/notes/notes.pdf`,
                Body: yield fileContent,
                ContentLength: Number((yield fileContent).length),
                ContentType: 'application/pdf',
            };
            const command = new client_s3_1.PutObjectCommand(params);
            const result = yield s3.send(command);
            console.log('Notes uploaded successfully');
            res.status(200).json({
                message: "Notes uploaded successfully"
            });
            return "done with creating notes";
        }
        return "done with creating notes";
    }
    catch (err) {
        console.log('Queue processing error', err);
        res.status(400).json({
            message: "Queue processing error"
        });
        return "error";
    }
}));
app.listen(3002, () => {
    console.log(`listing on port number 3002`);
});
