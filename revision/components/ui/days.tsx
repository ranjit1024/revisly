"use client";
import { actions } from "@/store/slices/revison";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eachDayOfInterval, format } from "date-fns";
import { RootState } from "@/store/store";
function findSpecificWeekdaysWithDateFns(
    startDate: string,
    endDate: string,
    weekdays: string[]
): string[] {
    const dayMap: Record<string, number> = {
        monday: 1, tuesday: 2, wednesday: 3, thursday: 4,
        friday: 5, saturday: 6, sunday: 0
    };

    const targetDays: number[] = weekdays?.map(day => dayMap[day.toLowerCase()]);

    const allDays: Date[] = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate)
    });

    return allDays
        .filter((date: Date) => targetDays.includes(date.getDay()))
        .map((date: Date) => date.toDateString());
}


export function SelectDay({ Limit }: {
    Limit: 1 | 3
}) {
    const dispatch = useDispatch();
    const week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const [selectedDay, setSelectdDay] = useState<string[]>([])
    const [chosseDays, setChossDay] = useState<string | null>(null);

    const date = useSelector((state: RootState) => {
        const data = {
            from: state.revision.startDate,
            to: state.revision.endDate
        }
        return data;
    })
    useEffect(() => {

        dispatch((actions.addDays({
            days: selectedDay
        })));
        console.log(selectedDay)
    }, [selectedDay])
    useEffect(() => {
        setSelectdDay([]);
    }, [Limit])
    
    useEffect(()=>{
        dispatch(actions.addSessionInterl({
            sessionIntervel:findSpecificWeekdaysWithDateFns(String(date.from ), String(date.to), selectedDay)
        }))
    }, [selectedDay])
    return (
        <div className="flex  gap-3 ">
            {week
                .map(day => <button
                    key={day}
                    onClick={() => {
                        setChossDay(day)

                        setSelectdDay(prev => {
                            const current = prev ?? [];
                            return current.includes(day) ? current.slice(0, Limit) : [...current, day].slice(0, Limit)
                        });
                    }
                    }
                    className={`px-5 py-[6px] rounded-full text-sm font-medium transition-all duration-300
            ${selectedDay?.includes(day)
                            ? "bg-indigo-600 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md"
                        }  `}
                >
                    {day.slice(0, 3)}
                </button>
                )}
        </div>
    );
}
