"use client";
import { motion, useInView, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CircleAlert, PlusCircle } from "lucide-react";
import { getUserSession } from "@/lib/actions/getSession";
import Skeleton from "@/components/ui/cardSkeleton";
import SessionCard from "@/components/ui/revisionCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreateFirstRevisionSession from "@/components/ui/ DashboardNull";
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

  // console.log(g)
  if (revisionSessionInfo && revisionSessionInfo.length === 0) {
    return <CreateFirstRevisionSession/>;
  }
  if(revisionSessionInfo === null){
    for(let i = 0; i < 10; i++){
      return <div><Skeleton/></div>
    }
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
