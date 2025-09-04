"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { useDispatch } from "react-redux";
import { actions } from "@/store/slices/revison";
import { Clock } from "lucide-react";
export default function TimePicker() {
  const dispatch = useDispatch();
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutes: string[] = [
    "00",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
  ];
  for (let i = 10; i <= 60; i++) {
    minutes.push(String(i));
  }
  const DEFAULT_MINUTE = "04";

  const [setTime, setSetTime] = useState<boolean>(false);
  const [selectedHours, setSelectedHours] = useState<string>("5");
  const [selectedMinutes, setSelectedMinutes] = useState<string>("00");
  const [timeZone, setTimezone] = useState<string>("AM");
  const minButtonRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const hourButtonRef = useRef<Record<string, HTMLButtonElement | null>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (minButtonRef.current[selectedMinutes]) {
      minButtonRef.current[selectedMinutes]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [setTime]);

  useEffect(() => {
    if (hourButtonRef.current[selectedHours]) {
      hourButtonRef.current[selectedHours]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [setTime]);

  useEffect(() => {
    function hide(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSetTime(false);
      }
    }
    document.addEventListener("click", hide);
    return () => document.removeEventListener("click", hide);
  }, [setTime]);

  useEffect(()=>{

    dispatch((actions.addTime({
      time:"5:04AM"
    })));
  },[])
  return (
    <div className="relative z-10" ref={dropdownRef}>
      
      <div className="mt-5">
            <label className="block text-sm font-medium ml-2 text-zinc-700" htmlFor="time">
              Select Revision Time
            </label>
            <div className="mt-2">
              <div className="relative max-w-xs">
                <input
                  id="time"
                  
                    readOnly
        placeholder="select A time when you want to revise "
        value={`${selectedHours}:${selectedMinutes} ${timeZone}`}
        onClick={() => {
          setSetTime((prev) => !prev);
        }}
             
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 pr-10 text-zinc-900 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                />
                <Clock className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              </div>
            </div>
          </div>
      {setTime ? (
        <div className="absolute p-4 h-[50vh]  top-18   bg-white shadow w-100 mt-1 border rounded-md ">
          <div className="grid grid-cols-[40%_40%_20%] justify-center items-center-safe">
            <div className="h-[43vh]   overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <p className="text-center text-xs mb-3 font-medium text-muted">
                Hours
              </p>
              {hours.map((item) => {
                return (
                  <div key={item} className="w-[100%] flex justify-center ">
                    <button
                      ref={(e2) => {
                        hourButtonRef.current[item] = e2;
                      }}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setSelectedHours(e?.currentTarget?.value);
                        console.log(e?.currentTarget?.value);
                      }}
                      value={item}
                      className={` ${
                        selectedHours === String(item)
                          ? "bg-primary text-white"
                          : null
                      } hover:bg-amber-300 focus:bg-primary focus:text-white rounded-4xl hover:cursor-pointer  flex justify-center items-center h-10 w-10 mb-1`}
                    >
                      {item}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="h-[43vh] overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <p className="text-center text-xs font-medium text-muted mb-3">
                Minutes
              </p>
              {minutes.map((item) => {
                return (
                  <div key={item} className="w-[100%] flex justify-center ">
                    <button
                      ref={(e1) => {
                        minButtonRef.current[item] = e1;
                      }}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        setSelectedMinutes(e.currentTarget.value);
                      }}
                      className={` ${
                        selectedMinutes === String(item)
                          ? "bg-primary text-white"
                          : null
                      } hover:bg-amber-300 focus:bg-primary focus:text-white rounded-4xl hover:cursor-pointer  flex justify-center items-center h-10 w-10 mb-1 `}
                      value={item}
                    >
                      {item}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="overflow-auto">
              <button
                onClick={(e) => {
                  setSetTime(false);
                  setTimezone(e.currentTarget.value);
                  dispatch(
                    actions.addTime({
                      time: `${selectedHours}:${selectedMinutes}${e.currentTarget.value}`
                    })
                  );
                }}
                value={"AM"}
                className={` hover:bg-amber-300 hover:cursor-pointer w-[100%] mb-2 rounded-md text-center text-sm py-1  font-medium text-gray-900 ${
                  timeZone === "AM" ? "bg-primary text-white" : null
                }`}
              >
                AM
              </button>
              
                

              <button
                onClick={(e) => {
                  setSetTime(false);
                  setTimezone(e.currentTarget.value);
                  dispatch(
                    actions.addTime({
                      time: `${selectedHours}:${selectedMinutes}${e.currentTarget.value}`,
                    })
                  );
                }}
                value={"PM"}
                className={`hover:bg-amber-300 hover:cursor-pointer w-[100%] mb-2 rounded-md text-center text-sm py-1  font-medium text-gray-900 ${
                  timeZone === "PM" ? "bg-primary text-white" : null
                }`}
              >
                PM
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
