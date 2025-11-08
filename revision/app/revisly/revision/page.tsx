"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import TimePicker from "@/components/ui/time";
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
import { MTime } from "@/components/ui/MTime";
import Mchip from "@/components/ui/MChip";
import { Button } from "@/components/ui/button";
export default function Home(){
 const isMobile = useMediaQuery({ maxWidth: 768 });
   return isMobile ? <Mobile/> :<Desktop/>
}

function Mobile(){
   const [invalidInputError, setInvalidInputError] = useState<boolean>(false);
  const [showRepeteError, setShowrepeteError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectorData = createSelector(
    [(state:RootState) => state.revision],
    (revision) =>({
       topic: revision.topic,
      sessionIntervel: revision.sessionIntervel,
      time: revision.time,
      sessionStart: revision.startDate,
      sessionEnd: revision.endDate,
      difficulty: revision.difficulty,
      days: revision.days,
    })
  )
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

  return <div className="mb-6 flex-col gap-7 w-[100vw]  max-md:mb-1 flex items-start justify-between  p-2">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Set Revision Reminder
            </h1>
            <p className="mt-1 text-sm text-zinc-600  ">
              We use
              <span className="font-medium text-emerald-700">
                &nbsp;spaced repetition
              </span>{" "}
              &nbsp; to help you retain more with less time.
              
            </p>
          </div>
           <div className="w-full flex text-start items-start gap-7  justify-start h-full">
            <div className="w-[100%] ">
              <label
                className="block text-sm font-medium text-zinc-700 text-start ml-1"
                htmlFor="topic"
              >
                Topic Name
              </label>
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
                    className="w-full rounded-md border border-zinc-200 bg-white px-4 py-2 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                  />
                  <Layers
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={16}
                  />
                </div>
                </div>
                </div>
                </div>
                <div>
                <DatePickerResponsive/>
                  </div>
                <div>
                <MTime/>
                  </div>
                  <div className="h-100">                 
                  <label
              className="block ml-2 mb-3 text-sm font-medium text-zinc-800 text-start "
              htmlFor="topic"
            >
              Select The diffeculty level
            </label>
            <div>
              <Mchip/>
            </div>
            <div className="mt-5 h-35">
              <Button className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2.5 w-[96vw] text-sm font-medium h-10 text-white shadow-sm transition hover:bg-zinc-800 active:translate-y-px">
                <Send size={16} />
              Set Revision Reminder
              </Button>
            </div>
               </div>
                  
               
          </div>
}

function Desktop() {

  const [invalidInputError, setInvalidInputError] = useState<boolean>(false);
  const [showRepeteError, setShowrepeteError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectorData = createSelector(
    [(state:RootState) => state.revision],
    (revision) =>({
       topic: revision.topic,
      sessionIntervel: revision.sessionIntervel,
      time: revision.time,
      sessionStart: revision.startDate,
      sessionEnd: revision.endDate,
      difficulty: revision.difficulty,
      days: revision.days,
    })
  )
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
      {invalidInputError ? (
        <ErrorToast
         
         
        />
      ) : null}
      {showRepeteError ? <TopicExistsToast /> : null}

      {sendData ? <NotesgeneratorLoader /> : null}

      <div className="bg-white shadow p-5 rounded-md h-[120vh] max-md:p-3 ">
        <div className="mb-6 max-md:mb-1 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
              Set Revision Reminder
            </h1>
            <p className="mt-1 text-sm text-zinc-600 flex max-md:flex-col max-md:hidden max-md:items-start">
              We use
              <span className="font-medium text-emerald-700">
                &nbsp;spaced repetition
              </span>{" "}
              &nbsp; to help you retain more with less time.
              
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
              <label
                className="block text-sm font-medium text-zinc-700 text-start ml-1"
                htmlFor="topic"
              >
                Topic Name
              </label>
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
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                  />
                  <Layers
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10  ">
            <MaxRangeDatePicker
            // Limit to 30 days
            />
          </div>

          <div className="w-100 mt-10 hover:cursor-pointer  ">
            <TimePicker />
          </div>

          <div>{/* <Progress value={33} /> */}</div>
          <div className="flex flex-col mt-2">
            <label
              className="block mt-7 ml-2 mb-3 text-sm font-medium text-zinc-700 text-start "
              htmlFor="topic"
            >
              Select The diffeculty level
            </label>
            <div className="flex ml-1 gap-2">
              <Chip></Chip>
            </div>

            {sessionData.difficulty ? (
              sessionData.difficulty === "hard" ? (
                <div>{<Hard />}</div>
              ) : (
                <div className="mt-9 ml-2 transition">
                  <label
                    className="block mb-3 text-sm font-medium text-zinc-700 text-start "
                    htmlFor="topic"
                  >
                    Which day of week you want to shedule your revision
                  </label>

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
                  const setRevision = await axios.post(
                    "http://localhost:3000/api/revision",
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
                      setSendData(false)
                      setShowrepeteError(true);
                      return;
                    } else {
                      setSendData(true);
                    }
                  }
                }
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 active:translate-y-px"
            >
              <Send size={16} />
              Set Revision Reminder
            </button>

        
          </div>
        </div>
      </div>
    </div>
  );
}
