"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actions } from "@/store/slices/revison";
import React, { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import NotesgeneratorLoader from "@/components/ui/notestgenratorLading";
import {ArrowRight, Send , Zap} from "lucide-react";
import { MaxRangeDatePicker } from "@/components/ui/Daterange";
import Chip from "@/components/ui/level";
import { SelectDay } from "@/components/ui/days";
import { ErrorToast } from "@/components/ui/toast";
import { ApiError } from "@/components/ui/apiError";
import { Hard } from "@/components/ui/hard";
import { TopicExistsToast } from "@/components/ui/topicExits";
import { createSelector } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import { DatePickerResponsive } from "@/components/ui/MDatePicker";
import { MDifficluty } from "@/components/ui/MDiffculty";
import MNotesLoader from "@/components/ui/MNotesloader";
import { Milscc } from "@/components/ui/wrong";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? <Mobile /> : <Desktop />;
}

function Mobile() {
  const [sendData, setSendData] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [repeatSub, setRepeatSub] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectorData = createSelector(
    [(state: RootState) => state.revision],
    (revision) => ({
      topic: revision.topic,
      sessionIntervel: revision.sessionIntervel,
      sessionStart: revision.startDate,
      sessionEnd: revision.endDate,
      difficulty: revision.difficulty,
      days: revision.days,
    })
  );
  const sessionData = useSelector(selectorData);

  // error handaling 
  // sendIng Data
  useEffect(() => {
    if (errorInput === true) {
      setTimeout(() => {
        setErrorInput(false);
      }, 1500);
      return;
    }
  }, [errorInput]);
  useEffect(() => {
    if (repeatSub === true) {
      setTimeout(() => {
        setRepeatSub(false);
      }, 1500);
    }
  }, [repeatSub]);
  return (
    <div className="mb-6 flex-col gap-4 w-[100vw]  max-md:mb-1 flex items-start justify-between  p-2">
      {errorInput ? <ErrorToast /> : null}
      {repeatSub ? <TopicExistsToast /> : null}
      {
        //loader
        sendData ? <MNotesLoader /> : null
      }
      {<Milscc open={open} setOpen={setOpen} />}
        <div className=" text-center w-full mb-10 mt-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4 shadow-inner">
            <Zap size={20} className="text-slate-900" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Revision Goal</h1>
          <p className="text-slate-500 mt-1 text-sm">Set up a smart schedule for your new topic.</p>
        </div>
      <div className="w-full flex text-start items-start gap-0  justify-start h-full">
        <div className="w-[100%] ">
          <Label> 1. What are you learning?</Label>
          <div className="mt-3">
            <div className="relative">
              <input
                onBlur={(e) => {
                  console.log(e.currentTarget.value);
                  dispatch(
                    actions.addTopic({
                      topic: e.currentTarget.value,
                    })
                  );
                }}
                id="topic"
                placeholder="e.g., System Design — Caching"
                className="w-full p-3 bg-gray-50  rounded-md border-1 border-border text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
             
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 mt-4">
        <DatePickerResponsive />
      </div>

      <div className="h-100 mt-2">
        <Label>3. What is your current confidence?</Label>

        <div className="mt-4">
          <MDifficluty />
          {/* <Chip/> */}
        </div>
        
         
      
        <div className="mt-8 h-40">
          <button
            //checking for error
            onClick={async () => {
              try {
                setSendData(true);
                let count = 0;
                if(sendData && count < 10){
                  setInterval(()=>{
                    count ++;
                  },4000)
                }
                console.log(sessionData);
                const setRevision = await axios.post(

                  "https://www.revisly.in/api/revision",
                  sessionData,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (setRevision.data.message === "Notes and database updated") {
                  router.push("/revisly/all");
                  setSendData(false);

                }
                setSendData(false);
              } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                  if (e.response?.data.message === "Invalid Input") {
                    console.log("data");

                    setSendData(false);
                    setErrorInput(true);
                    return;
                  }
                  if (
                    e.response?.data.message ===
                    "Session Exists with same topic"
                  ) {
                    setSendData(false);
                    setRepeatSub(true);
                    return;
                  }
                  if (
                    e.response?.data.message === "Cannot Process Your Request" ||
                    e.response?.data.message === "Something went wrong"
                  ) {
                    setSendData(false);
                    setOpen(true);
                    return;
                  } else {
                    setSendData(true);
                  }
                }
              }
            }}
            className="inline-flex items-center gap-2 w-[100%] h-12 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 active:translate-y-px"
          >
            <Send size={16} />
            Set Revision Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

function Desktop() {
  const [open, setOpen] = useState<boolean>(false);
  const [invalidInputError, setInvalidInputError] = useState<boolean>(false);
  const [showRepeteError, setShowrepeteError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectorData = createSelector(
    [(state: RootState) => state.revision],
    (revision) => ({
      topic: revision.topic,
      sessionIntervel: revision.sessionIntervel,
      sessionStart: revision.startDate,
      sessionEnd: revision.endDate,
      difficulty: revision.difficulty,
      days: revision.days,
    })
  );
  const sessionData = useSelector(selectorData);
  useEffect(() => {
    apiError
      ? setTimeout(() => {
          router.push("/revisly/home");
        }, 1500)
      : null;
  }, [apiError]);
  useEffect(() => {
    if (invalidInputError) {
      const timeOut = setTimeout(() => {
        setInvalidInputError(false);
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [invalidInputError]);
  useEffect(() => {
    if (showRepeteError) {
      const timeOut = setTimeout(() => {
        setShowrepeteError(false);
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [showRepeteError]);
  const [sendData, setSendData] = useState<boolean>(false);

  return (
    <div className=" ">
      <ApiError open={apiError} setOpen={setApiError}></ApiError>
      {invalidInputError ? <ErrorToast /> : null}
      {showRepeteError ? <TopicExistsToast /> : null}

      {sendData ? <NotesgeneratorLoader /> : null}
          {<Milscc open={open} setOpen={setOpen} />}
      <div className="bg-white shadow p-5 rounded-md h-[120vh] max-md:p-3 ">
     
           
           <div className=" text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4 shadow-inner">
            <Zap size={20} className="text-slate-900" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Revision Goal</h1>
          <p className="text-slate-500 mt-1 text-sm">Set up a smart schedule for your new topic.</p>
        </div>
        <div className="pt-6 w-full">
          <div className="w-full flex text-start items-start gap-4  justify-start h-full">
            <div className="w-[100%] ">
             <Label> 1. What are you learning?</Label>
              <div className="mt-3">
                <div className="relative">
                  <Input
                    onBlur={(e) => {
                      console.log(e.currentTarget.value);
                      dispatch(
                        actions.addTopic({
                          topic: e.currentTarget.value,
                        })
                      );
                    }}
                    id="topic"
                    placeholder="e.g., System Design — Caching"
                    className="w-[70%] p-3 border bg-gray-50 rounded-lg text-sm h-10 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <MaxRangeDatePicker
            // Limit to 30 days
            />
          </div>
          <div>{/* <Progress value={33} /> */}</div>
          <div className="flex flex-col mt-9">
             <Label>3. What is your current confidence?</Label>
                         
            <div className="flex w-full  gap-2 mt-5 mb-5">
              <Chip></Chip>
            </div>

            {sessionData.difficulty ? (
              sessionData.difficulty === "hard" ? (
                <div>{<Hard />}</div>
              ) : (
                <div className="mt-8 ml-2 transition">
                   <label className="text-sm font-medium text-gray-700  ml-1">Select Day</label>

                  <SelectDay
                    Limit={sessionData.difficulty === "medium" ? 3 : 1}
                  />
                </div>
              )
            ) : null}
          </div>
          <div className="mt-5 flex items-center gap-3 flex-col">
             <div className="mt-6 bg-slate-50 rounded-xl py-10 px-5 border w-full border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Live Preview</span>
              </div>
              <div className="p-[0.3rem] relative mt-3 bg-slate-200 rounded-2xl">
              
                <div className="absolute top-0 flex justify-evenly  w-full ">
                  {
                    sessionData.sessionIntervel?.map((data,index)=>{
                      return<div className="">
                        <div className="p-1 bg-green-500 rounded-2xl  bord(er-indigo-100 border"></div>
                <div className="absolute text-center mt-1 text-[11px] text-gray-900 font-medium">{`${data.split(' ')[2]} ${data.split(' ')[1]} `} <p className="font-semibold">{index+1}</p></div>

                </div>
                    })
                  }
               
                </div>
              </div>
            </div>
            <button
              onClick={async () => {
                try {
                  setSendData(true);
                  console.log(sessionData);
                  const setRevision = await axios.post(
                    "https://www.revisly.in/api/revision",
                    sessionData,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  router.push("/revisly/all");
                  setSendData(false);
                } catch (e: unknown) {
                  if (axios.isAxiosError(e)) {
                    console.log(e.response?.data.message);
                    if (e.response?.data.message === "Invalid Input") {
                      console.log("data");

                      setSendData(false);
                      setInvalidInputError(true);
                      return;
                    }
                    if (
                      e.response?.data.message ===
                      "Session Exists with same topic"
                    ) {
                      setSendData(false);
                      setShowrepeteError(true);
                      return;
                    }
                    if (
                      e.response?.data.message === "Cannot Process Your Request"
                    ) {
                      setSendData(false);
                      setOpen(true);
                      return;
                    } else {
                      setSendData(true);
                    }
                  }
                }
              }}
              className="group w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-lg font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
            >
               Schedule Revision
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              
            </button>



            
          </div>
        </div>
      </div>
    </div>
  );
}

// {topic: 'mjhbm', sessionIntervel: Array(6), time: '5:04AM', sessionStart: 'Sun Nov 09 2025 11:06:58 GMT+0530 (India Standard Time)', sessionEnd: 'Fri Nov 21 2025 00:00:00 GMT+0530 (India Standard Time)', …}days: (3) ['monday', 'tuesday', 'wednesday']difficulty: "medium"sessionEnd: "Fri Nov 21 2025 00:00:00 GMT+0530 (India Standard Time)"sessionIntervel: (6) ['Mon Nov 10 2025', 'Tue Nov 11 2025', 'Wed Nov 12 2025', 'Mon Nov 17 2025', 'Tue Nov 18 2025', 'Wed Nov 19 2025']sessionStart: "Sun Nov 09 2025 11:06:58 GMT+0530 (India Standard Time)"time: "5:04AM"topic: "mjhbm"[[Prototype]]: Object
// turbopack-hot-reloader-common.ts:41
