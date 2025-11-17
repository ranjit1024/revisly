"use server"
import prisma from "../prisma"
import { getServerSession } from "next-auth"
import { authOption } from "../auth"
import type { userType } from "./newUser"
type RevisionSession = {
    id: string;
    email: string;
    sessinNumber: number;
    topic: string;
    sessionsintervel: Date[];
    sessions: number;
    days: string[];
    createdSession: Date;
    startSesion: Date;
    endSession: Date;
    totalDays: number;
    brif: string;
    status:"COMPLETED" | "PENDING" | "MISSED",
    score: number | null;
};
export async function getUserSession(){
    const session : userType | null  = await getServerSession(authOption);
    
    const revisionsSession : RevisionSession[] = await prisma.revision.findMany({
        where:{
            email:session?.user.email
        },
        orderBy:{
            createdSession:"desc"
        }
    });

    return revisionsSession;
}
