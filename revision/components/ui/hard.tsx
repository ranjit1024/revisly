"use client";
import { eachDayOfInterval, format } from "date-fns";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function findSpecificWeekdaysWithDateFns(startDate: string, endDate: string) {
  const dayMap: Record<string, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };
  const myDate = new Date(startDate);
  myDate.setDate(myDate.getDate()+ 1)
  const allDays: Date[] = eachDayOfInterval({
    start: new Date(myDate),
    end: new Date(endDate),
  });

  return allDays;
}
export function Hard() {
  const date = useSelector((state: RootState) => {
    const data = {
      from: state.revision.startDate ,
      to: state.revision.endDate,
    };
    return data;
  });

  useEffect(() => {
    const res = findSpecificWeekdaysWithDateFns(
      String(date.from),
      String(date.to)
    );
    console.log(res);
  }, []);
  return "";
}
