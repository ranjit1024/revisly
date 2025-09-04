'use client'
import { motion, useInView, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RevisionSessionCard from "@/components/ui/revisionCard";
import { getUserSession } from "@/lib/actions/getSession";
import Skeleton from "@/components/ui/cardSkeleton";
import SessionCard from "@/components/ui/revisionCard";
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
  brif:string
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  
};

export default function Home() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true });
  const [revisionSessionInfo, setRevisionSessionInfo] = useState<RevisionSession[] | null>(null)
  
  useEffect(()=>{
    async function getRevisionSession() { 
      const getrevisionSesion = await getUserSession();
      setRevisionSessionInfo(getrevisionSesion)
    
    }
    getRevisionSession()
  },[])
  
  // console.log(g)
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
          status={"PENDING"}         
        />)
    }


  </motion.div>
  </div>
}