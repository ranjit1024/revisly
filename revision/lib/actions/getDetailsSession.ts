"use server"
import prisma from "../prisma"

export default async function GetdetailSession(id:string){
    const session = await prisma.revisionSession.findMany({
        where:{
            revisionid:id,   
        },
        orderBy:{
            sessionNumber:"asc"
        }
    })
    return session;
}

