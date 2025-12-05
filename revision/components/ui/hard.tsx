"use client";
import { eachDayOfInterval } from "date-fns";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actions } from "@/store/slices/revison";
import { createSelector } from "@reduxjs/toolkit";

function findSpecificWeekdaysWithDateFns(
  startDate: string,
  endDate: string
): string[] {
  const myDate = new Date(startDate);
  myDate.setDate(myDate.getDate());
  const allDays: Date[] = eachDayOfInterval({
    start: new Date(myDate),
    end: new Date(endDate),
  });

  return allDays.map((date) => date.toDateString());
}
export function Hard() {
  const week: Record<number,string> = {
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
    0: "sunday",
  };
  const dispatch = useDispatch();
  const dateData = createSelector(
    [(state: RootState) => state.revision],
    (revision) => ({
      from: revision.startDate,
      to: revision.endDate,
    })
  );
  const date = useSelector(dateData);

  useEffect(() => {
    const res = findSpecificWeekdaysWithDateFns(
      String(date.from),
      String(date.to)
    );
    console.log(res)
    const days = res.map((date) => new Date(date).getDay())
    .map((day) => week[day]);
    
    dispatch(
      actions.addDays({
        days: days
      })
    );
    dispatch(
      actions.addSessionInterl({
        sessionIntervel: res
      })
     
    );
  }, []);
  return "";
}
