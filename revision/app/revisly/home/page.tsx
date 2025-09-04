"use client";
import {  Last5 } from "@/components/ui/last5";
import {Retation} from "@/components/ui/retation";
import {
  
  CalendarCheck,
  ChevronRight,
 
} from "lucide-react";
import { getDashBaordData } from "@/lib/actions/dashBoard";
import {  useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Subjects } from "@/components/ui/subjects";
import { CompletVsFail } from "@/components/ui/completeVSfail";
interface type {
   id: string;
    email: string;
    sessinNumber: number;
    topic: string;
    sessionsintervel: Date[];
    sessions: number;
    days: string[];
    time: Date;
    createdSession: Date;
    startSesion: Date;
    endSession: Date;
    totalDays: number;
    brif: string;
}
export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dashBoardData, setDashBaordData] = useState<type|null>(null)
  useEffect(()=>{
    async function Data(){
      const data =  await getDashBaordData();
      setDashBaordData(data)
    }
    Data()
  },[]);
  console.log(dashBoardData)
  return (
    <div className="">
  
     
      <div className="w-[100%] h-full ">
             <motion.section 
             initial={{
              opacity:0,
              scale:0.9
             }}
             animate={{
              opacity:1,
              scale:1
             }}
              transition={{
              duration: 0.6,
             
            }}
             className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Current Revision Topic</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{dashBoardData?.topic}</h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
                  Active
                </span>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div className="absolute inset-y-0 left-0 w-[86%] rounded-r-full bg-emerald-500" />
                </div>
                <p className="mt-3 text-sm text-zinc-600">
                  You’re <span className="font-semibold text-emerald-700">ahead of pace</span> and
                  should reach your goal <span className="font-semibold">ahead</span> of schedule.
                </p>
              </div>

              <div className="mt-4">
                <button className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-800">
                  View plan
                  <ChevronRight size={16} />
                </button>
              </div>
            </Card>

            
            <Card>
              <p className="text-sm font-medium text-zinc-500">Upcoming Revision</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">topic name</h3>
              <p className="mt-3 text-sm text-zinc-600">Topic info</p>

              <div className="mt-4 flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-amber-100 text-amber-700">
                  <CalendarCheck size={16} />
                </div>
                <p className="text-sm text-zinc-700">Tomorrow • 5:00 AM</p>
              </div>
            </Card>
            
          </motion.section>
        
        <motion.div 
          initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
        className="pt-3   w-[100%]">
          <Retation />
        </motion.div>
        <div className="mt-2">
          <CompletVsFail/>
        </div>
       
    
      </div>
    </div>
  );
}
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white/70 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {children}
    </div>
  );
}