"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actions } from "@/store/slices/revison";
import React, { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import NotesgeneratorLoader from "@/components/ui/notestgenratorLading";
import { CalendarDays, Layers, Send } from "lucide-react";
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
import { send } from "process";
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
    <div className="mb-6 flex-col gap-7 w-[100vw]  max-md:mb-1 flex items-start justify-between  p-2">
      {errorInput ? <ErrorToast /> : null}
      {repeatSub ? <TopicExistsToast /> : null}
      {
        //loader
        sendData ? <MNotesLoader /> : null
      }
      {<Milscc open={open} setOpen={setOpen} />}
      <div className="mt-2">
    <h1 className="text-4xl font-medium text-gray-900">New Revision</h1>
    <p className="text-sm text-gray-500 mt-4">
      Set a spaced repetition schedule for your new topic.
    </p>
  </div>
      <div className="w-full flex text-start items-start gap-0  justify-start h-full">
        <div className="w-[100%] ">
          <label className="text-sm font-medium text-gray-700 ml-1">Topic</label>
          <div className="mt-2">
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
      <div className="mb-2">
        <DatePickerResponsive />
      </div>

      <div className="h-100">
        <label
          className="  text-sm font-medium text-gray-700 ml-1"
          htmlFor="topic"
        >
          Select The diffeculty level
        </label>

        <div>
          <MDifficluty />
        </div>
        <div className="mt-10 h-35">
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
        <div className=" max-md:mb-1 flex items-start justify-between gap-4">
           <div className="mb-2">
    <h1 className="text-4xl  text-gray-900  mb-4">New Revision</h1>
    <p className="text-sm text-gray-500 mt-1">
      Set a spaced repetition schedule for your new topic.
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
             <label className="text-sm font-medium text-gray-700 ml-1">Topic</label>
              <div className="mt-2">
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
                    className="w-[70%] p-3 border bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  />
                  
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <MaxRangeDatePicker
            // Limit to 30 days
            />
          </div>
          <div>{/* <Progress value={33} /> */}</div>
          <div className="flex flex-col mt-9">
             <label className="text-sm font-medium text-gray-700 ml-1 mb-2">Select Difficulty</label>
            <div className="flex  gap-2">
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
          <div className="mt-9 flex items-center gap-3">
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
              className="inline-flex items-center gap-2 rounded-md bg-zinc-900  py-2.5 h-11 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 w-[50%] ml-1 active:translate-y-px pl-4"
            >
              
              Set Revision Reminder
            </button>



            
          </div>
        </div>
      </div>
    </div>
  );
}

// {topic: 'mjhbm', sessionIntervel: Array(6), time: '5:04AM', sessionStart: 'Sun Nov 09 2025 11:06:58 GMT+0530 (India Standard Time)', sessionEnd: 'Fri Nov 21 2025 00:00:00 GMT+0530 (India Standard Time)', …}days: (3) ['monday', 'tuesday', 'wednesday']difficulty: "medium"sessionEnd: "Fri Nov 21 2025 00:00:00 GMT+0530 (India Standard Time)"sessionIntervel: (6) ['Mon Nov 10 2025', 'Tue Nov 11 2025', 'Wed Nov 12 2025', 'Mon Nov 17 2025', 'Tue Nov 18 2025', 'Wed Nov 19 2025']sessionStart: "Sun Nov 09 2025 11:06:58 GMT+0530 (India Standard Time)"time: "5:04AM"topic: "mjhbm"[[Prototype]]: Object
// turbopack-hot-reloader-common.ts:41
