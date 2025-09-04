"use client";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import TimePicker from "@/components/ui/time";
import { useDispatch } from "react-redux";
import { actions } from "@/store/slices/revison";
import React, { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import NotesgeneratorLoader from "@/components/ui/notestgenratorLading";
import { CalendarDays, Layers, Send } from "lucide-react";
import { Preview } from "@/components/ui/Preview";
import { MaxRangeDatePicker } from "@/components/ui/Daterange";
import Chip from "@/components/ui/level";

import { SelectDay } from "@/components/ui/days";
import { tr } from "date-fns/locale";
import ErrorToast from "@/components/ui/toast";

export default function Home() {
  const [showError, setShowError] = useState<boolean>(false);
  const router = useRouter()
  const dispatch = useDispatch();
  const sessionData = useSelector((state: RootState) => {
    const data = {
      topic: state.revision.topic,
      sessionIntervel: state.revision.sessionIntervel,
      time: state.revision.time,
      sessionStart: state.revision.startDate,
      sessionEnd: state.revision.endDate,
      difficulty: state.revision.difficulty,
      days:state.revision.days,
    
    };
    return data;
  });
  useEffect(()=>{
    if(showError){
      const timeOut = setTimeout(()=>{
        setShowError(false)
      },5000)
      return () =>  clearTimeout(timeOut)
    }
  },[showError])
  const [sendData, setSendData] = useState<boolean>(false);

  return (
    <div className=" ">
      {
        showError ? <ErrorToast view={showError}/>:null
      }
      {
        
        sendData ? <NotesgeneratorLoader /> : null
      }

     

    
      <div className="bg-white shadow p-5 rounded-md h-[120vh] ">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Set Revision Reminder
            </h1>
            <p className="mt-1 text-sm text-zinc-600 flex">
              We use<span className="font-medium text-emerald-700">&nbsp;spaced repetition</span> &nbsp; to help you retain more with less time.
              <button className="ml-2 inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800">


              </button>
            </p>
          </div>
          <div className="hidden rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700 ring-1 ring-emerald-100 sm:flex items-center gap-2">
            <CalendarDays size={16} />
            <span className="text-sm font-medium">Revise Smartly</span>
          </div>
        </div>
        <div className="pt-6 w-full">
          <div className="w-full flex text-start items-start gap-4  justify-start h-full">
            <div className="w-[100%] ">


              <label className="block text-sm font-medium text-zinc-700 text-start ml-1" htmlFor="topic">
                Topic Name
              </label>
              <div className="mt-2">
                <div className="relative">
                  <input
                    onBlur={(e) => {
                      console.log(e.currentTarget.value);
                      dispatch(actions.addTopic({
                        topic: e.currentTarget.value
                      }))
                    }}
                    id="topic"

                    placeholder="e.g., System Design — Caching"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                  />
                  <Layers className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                </div>
              </div>



            </div>

          </div>
          <div className="mt-8  ">
            <MaxRangeDatePicker
            // Limit to 30 days
            />
          </div>

          <div className="w-100 mt-8 hover:cursor-pointer  ">

            <TimePicker />
          </div>

          <div>
            {/* <Progress value={33} /> */}
          </div>
          <div className="flex flex-col mt-2">
            <label className="block mt-7 ml-2 mb-3 text-sm font-medium text-zinc-700 text-start " htmlFor="topic">
              Select The diffeculty level
            </label>
            <div className="flex ml-1 gap-2">

              <Chip ></Chip>



            </div>
            {
              sessionData.difficulty  ? sessionData.difficulty === 'hard' ? null: <div className="mt-9 ml-2 transition">
               <label className="block mb-3 text-sm font-medium text-zinc-700 text-start " htmlFor="topic">
                Which day of week you want to shedule your revision
              </label>
              <SelectDay Limit={sessionData.difficulty === "medium" ? 3 : 1}/>
            </div>:null
            }
           

          </div>

          <div className="mt-9 flex items-center gap-3">
            <button
              onClick={async () => {
             
                try{
                  setSendData(true);
                  const setRevision = await axios.post('http://localhost:3000/api/revision',sessionData, {
                    headers:{
                      'Content-Type': 'application/json',
                    }
                  }
                   );
                  console.log(setRevision)
                  setSendData(false);
                  router.push('/revisly/all')

                }
                catch(e){
                  setShowError(true);
                  setSendData(false);
                }
              
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 active:translate-y-px"

            >
              <Send size={16} />
              Set Revision Reminder
            </button>

            {/* */}
            <Preview />
          </div>





        </div>
      </div>
    </div >
  );
}

