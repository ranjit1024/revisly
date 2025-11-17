"use server"
import prisma from "../prisma"
import { getServerSession } from "next-auth"
import { authOption } from "../auth"
export async function getFirst(){
    const session = await getServerSession(authOption) 
    const dashboardData = await prisma.revision.findFirst({
        where:{
            email:session?.user?.email || "",
            
        },
    })
   
    return dashboardData ;
}
export async function Frist(){
    const session = await getServerSession(authOption) 
    const dashboardData = await prisma.revision.findFirst({
        where:{
            email:session?.user?.email || "",
            status:'PENDING'
        },
        orderBy:{
            createdSession:'asc'
        }
    })
    return dashboardData;
}
export async function Progress() {
    const session = await getServerSession(authOption) 
    const Total = await prisma.revisionSession.findMany({
        where:{
            email:session?.user?.email || "",
            status:'PENDING'
        },
    })
    const Completed = await prisma.revisionSession.findMany({
        where:{
            email:session?.user?.email || "",
            status:'COMPLETED'
        },
    })
    console.log({total:Total,
        completed:Completed,
        percentage:((Completed.length / Total.length) *100)})
    return {
        total:Total,
        completed:Completed,
        percentage:((Completed.length / Total.length) *100)
    };
}

export async function Last5Score(){
    const session = await getServerSession(authOption) 
    const scores = await prisma.revision.findMany({
        
        where:{
            email:session?.user?.email || "",
            
        },
        select:{
            score:true, 
            topic:true        
        },
        orderBy:{
            score:'desc'
        },
        take:5
    })
    return scores;

}

export async function getCompleted(){
        const session = await getServerSession(authOption) 
    const data = await prisma.revisionSession.findMany({
        where:{
            email:session?.user?.email || "",
            status:"COMPLETED"
        },
        select:{
            status:true
        }
     
    })
    return data;
}
export async function getFailed(){
        const session = await getServerSession(authOption) 
    const data = await prisma.revisionSession.findMany({
        where:{
            email:session?.user?.email || "",
            status:"MISSED"
        },
        select:{
            status:true
        }
     
    })
    return data;
}