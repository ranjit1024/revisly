"use client";
import { motion, useInView, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getUserSession } from "@/lib/actions/getSession";
import SessionCard from "@/components/ui/revisionCard";
import { useRouter } from "next/navigation";
import Listloader from "@/components/ui/listLoader";
import EmptySessionState from "@/components/ui/emptylist";
const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

type RevisionSession = {
  id: string ;
  email: string;
  topic: string;
  sessionsintervel: Date[];
  sessions: number;
  time: Date;
  createdSession: Date;
  endSession: Date;
  brif: string;
  status: "COMPLETED" | "PENDING" | "MISSED";
} | null;

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [revisionSessionInfo, setRevisionSessionInfo] = useState<
    RevisionSession[] | null 
  >(null);

  useEffect(() => {
    async function getRevisionSession() {
      const getrevisionSesion  = await getUserSession();
      setRevisionSessionInfo(getrevisionSesion);
     
    }
    getRevisionSession();
    console.log(revisionSessionInfo)
  }, []);


  if(revisionSessionInfo === null){
    return <motion.div 
    ref={ref}
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="flex flex-col gap-3  w-[98%] max-md:w-[100vw]   ">
      <Listloader/>

    
    </motion.div>
  }
  if(revisionSessionInfo.length === 0){
    return <EmptySessionState/>
  }
  return (
    <div className=" flex w-[100%] justify-center ">
      <motion.div
        ref={ref}
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="flex flex-col gap-3  w-[98%]  "
      >
        {revisionSessionInfo?.map((item, index) =>
          <SessionCard
              key={index}
              title={item!.topic}
              startDate={item!.createdSession}
              endDate={item!.endSession}
              brief={item!.brif}
              sessionNumber={revisionSessionInfo.length - index}
              id={item!.id}
              progress={30}
              status={item!.status}
            />
          
        )}
      </motion.div>
    </div>
  );
}
