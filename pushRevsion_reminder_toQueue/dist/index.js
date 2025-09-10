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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const redis_1 = require("@upstash/redis");
const redis = redis_1.Redis.fromEnv();
const prisma = new client_1.PrismaClient();
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.revisionSession.findMany({
                select: {
                    topic: true,
                    email: true,
                    reminderDate: true,
                    time: true,
                    revisionid: true
                }
            });
            data.forEach((reminderTime) => __awaiter(this, void 0, void 0, function* () {
                yield redis.lpush('reminder', JSON.stringify({
                    time: reminderTime.time,
                    topic: reminderTime.topic,
                    email: reminderTime.email,
                    id: reminderTime.revisionid
                }));
            }));
        }
        catch (e) {
            console.log(`something went wrong ${e}`);
        }
    });
}
getData();
