"use server"
import prisma from "../prisma"
import { getServerSession } from "next-auth"
import { authOption } from "../auth"
import { da } from "date-fns/locale";
export async function getuserData(){
    const session = await getServerSession(authOption);
    // get total session count
    const subSessions = await prisma.revisionSession.findMany({
        where:{
            email:session?.user?.email || "",
        },
        take:5,
        select:{
            status:true,
            topic:true,
            reminderDate:true,
            
        }
    })
    const mainSessions =await prisma.revision.findMany({
        where:{
            email:session?.user?.email || "",

        },
        select:{
            topic:true,
            score:true
        }
    })
    const data = Promise.all([mainSessions,subSessions])
    return data ;
}
export async function currentTopic(){
    const session = await getServerSession(authOption);
    const Topic = await prisma.revision.findFirst({
         where:{
            email:session?.user?.email || "",
            status:"PENDING"
        },
        select:{
            topic:true,
            brif:true
        }
    })
    const progressData = await prisma.revisionSession.findMany({
        where:{
            topic:Topic?.topic
        },
        select:{
            status:true
        }
    })
    const progress = progressData.filter(data =>  data.status === "COMPLETED").length / 
    progressData.filter(data => data.status === 'PENDING' || data.status === 'MISSED').length
    const result = {...Topic, progress  }

    console.log(result);
    return result;
}