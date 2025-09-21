'use client'
import { motion, useInView, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CircleAlert, PlusCircle } from "lucide-react";
import { getUserSession } from "@/lib/actions/getSession";
import Skeleton from "@/components/ui/cardSkeleton";
import SessionCard from "@/components/ui/revisionCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.10
    },
  },
};

type RevisionSession = {
  id: string;
  email: string;
  topic: string;
  sessionsintervel: Date[];
  sessions: number;
  time: Date;
  createdSession: Date;
  endSession: Date;
  brif:string;
  status:"COMPLETED" | "PENDING" |"MISSED";
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  
};

export default function Home() {
  const router = useRouter()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true });
  const [revisionSessionInfo, setRevisionSessionInfo] = useState<RevisionSession[] | "">("")
  
  useEffect(()=>{
    async function getRevisionSession() { 
      const getrevisionSesion = await getUserSession();
      setRevisionSessionInfo(getrevisionSesion)
    
    }
    getRevisionSession()
  },[])
  
  // console.log(g)
  if(revisionSessionInfo == ""){
    return <div className="mt-10 p-10  flex justify-center items-center h-[80vh]">
     <button onClick={()=>{
      router.push("/revisly/revision")
     }} className="inline-flex items-center gap-3 px-10 py-3 border flex-col hover:from-purple-600 border-gray-200 hover:to-indigo-700 text-gray-700 font-semibold rounded-xl shadow-sm hover:shadow-md transform transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300/50  hover:cursor-pointer">
      <PlusCircle/>
      Set Revision
    </button>
    </div>
  }
  return <div className=" flex w-[100%] justify-center ">

 
  <motion.div

    ref={ref}
    variants={containerVariant}
    initial="hidden"
    animate={inView ? "show" : "hidden"}
    className="flex flex-col gap-3  w-[98%]  ">

    {
      revisionSessionInfo === null ? <motion.div
        ref={ref}
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid h-[100vh] grid-cols-1 w-[80vw]  ">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </motion.div>
        : revisionSessionInfo?.map((item, index) => <SessionCard
          
          key={index}
          title={item.topic}
          startDate={item.createdSession}
          endDate={item.endSession}
          brief={item.brif}
          sessionNumber={revisionSessionInfo.length - index}
          id={item.id}
          progress={30}
          status={item.status}         
        />)
    }


  </motion.div>
  </div>
}