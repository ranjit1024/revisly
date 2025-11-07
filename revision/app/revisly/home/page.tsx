"use client";
import { Retation } from "@/components/ui/retation";
import { CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SuccessvsFail } from "@/components/ui/completeVSfail";
import { SessionHistory } from "@/components/ui/sessionHistory";
import { CurretnTopicCard } from "@/components/ui/DashboardCurenttopic";
import { useEffect, useState } from "react";
import { getFirst } from "@/lib/actions/dashBoard";
import CreateFirstRevisionSession from "@/components/ui/firstSession";
import { DashboardSpinner } from "@/components/ui/dashBoardLoader";
import { useMediaQuery } from "react-responsive";
import  MRetation  from "@/components/mRetain";
import { Last5 } from "@/components/ui/last5";
import { MSessionHistory } from "@/components/ui/msessionH";
interface type {
  id: string | null;
  email: string;
  sessinNumber: number;
  topic: string | null;
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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <Mobile/> :<Desktop/>
}
function Mobile() {
  return <div className="p-2">
    <h1 className="text-[2.5rem] font-semibold text-zinc-800 mb-3">React</h1>
    <p className="text-sm font-normal text-zinc-600 mb-3 ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae deleniti mollitia laborum. </p>
    <MRetation/>
       < motion.div 
       initial={{
            opacity: 0,
            x: 10,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
                    once: true,
                    amount: 0.3,
                  }}
          transition={{
            duration: 0.6,
            delay:0.5
          }}
       className="bg-gray-900 p-5 mb-4 mt-5 rounded-2xl ">
            <p className="text-sm font-medium text-zinc-200">
              Upcoming Revision
            </p>
            <h3 className="mt-1 text-xl font-semibold text-zinc-200 tracking-tight">
              topic name
            </h3>
            <p className="mt-3 text-sm text-zinc-200">Topic info</p>

            <div className="mt-4 flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-amber-100 text-amber-700">
                <CalendarCheck size={16} />
              </div>
              <p className="text-sm text-zinc-200">Tomorrow • 5:00 AM</p>
            </div>
          </motion.div>
          <motion.div 
          initial={{
            opacity: 0,
            y: -100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
                    once: true,
                    amount: 0.3,
                  }}
          transition={{
            duration: 1,
          }}
          >
          <MSessionHistory/>
          </motion.div>
          <div className="mb-20">

          </div>
  </div>;
}
function Desktop() {
  const [isEmpty, setIsempty] = useState<type | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    async function check() {
      setIsempty(await getFirst());
      setLoading(false);
    }
    check();
  }, []);
  if (loading) {
    return <DashboardSpinner />;
  }
  if (isEmpty === null) {
    return <CreateFirstRevisionSession />;
  }
  return (
    <div className="">
      <div className="w-[100%] h-full max-md:w-[100vw] max-md:p-1  ">
        <motion.section
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          <CurretnTopicCard></CurretnTopicCard>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-sm font-medium text-zinc-500">
              Upcoming Revision
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              topic name
            </h3>
            <p className="mt-3 text-sm text-zinc-600">Topic info</p>

            <div className="mt-4 flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-amber-100 text-amber-700">
                <CalendarCheck size={16} />
              </div>
              <p className="text-sm text-zinc-700">Tomorrow • 5:00 AM</p>
            </div>
          </div>
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
          className="pt-3   w-[100%]"
        >
          <Retation />
        </motion.div>
        <div className="grid grid-cols-2 gap-3">
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
            className="pt-3   w-[100%]"
          >
            <SessionHistory />
          </motion.div>
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
            className="pt-3   w-[100%]"
          >
            <SuccessvsFail />
          </motion.div>
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
