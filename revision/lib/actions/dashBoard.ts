"use server"
import prisma from "../prisma"
import { getServerSession } from "next-auth"
import { authOption } from "../auth"
export async function getuserData(){
    const session = await getServerSession(authOption);
    // get total session count
    const subSessions = await prisma.revisionSession.findMany({
        where:{
            email:session?.user?.email || "",
        },
    })
    const mainSessions =await prisma.revision.findMany({
        where:{
            email:session?.user?.email || "",

        },
    })
    const data = Promise.all([mainSessions,subSessions])
    return data ;
}
