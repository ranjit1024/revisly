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

export async function totalScore(){
    const session = await getServerSession(authOption) 
    const TotalScore = await prisma.revisionSession.findMany({
        
        where:{
            email:session?.user?.email || "",
            
        },
        select:{
            score:true,         
        },
        take:5
    })
    return TotalScore;

}