"use client"
import { useEffect, useState } from "react"
import { format, addDays, differenceInDays, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange, useDayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDispatch } from "react-redux"
import { actions } from "@/store/slices/revison"

export function MaxRangeDatePicker() {
  const today = new Date()
  const maxDate = addDays(today, 30);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: undefined,
  })

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    if (!selectedDate) {
      setDate(selectedDate)
      return
    }

    // If both from and to are selected, check if the range exceeds 30 days
    if (selectedDate.from && selectedDate.to) {
      const daysDifference = differenceInDays(selectedDate.to, selectedDate.from)

      if (daysDifference > 30) {
        // If range exceeds 30 days, set 'to' to 30 days from 'from'
        setDate({
          from: selectedDate.from,
          to: addDays(selectedDate.from, 30)
        })
      } else {
        setDate(selectedDate)
      }
    } else {
      setDate(selectedDate)
    }
  }
  useEffect(()=>{
    const dateObj = new Date();
   
     dispatch(actions.addStartTime({
      startDate:String(date?.from )
     }));
     dispatch(actions.addEndTime({
      endDate: date?.to ? String(subDays(date.to,1)): ''
     }))
     
  },[open])

  return (

    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen} >
        <label className="block text-sm font-medium text-zinc-700 text-start ml-1" htmlFor="topic">
          Select Date
        </label>
        <PopoverTrigger asChild>

          <Button
            
            
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal h-11 rounded-2xl",
              !date && "text-white"
            )}
          
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <div className="absolute top-0 " >
          
          <PopoverContent  className="w-fit absolute p-0" align="start">
          

            
            <div className=" ">

            
            <Calendar
              className=""
              disabled={(date) => date < today || date > maxDate}
              mode="range"

              defaultMonth={date?.from}
              
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              showOutsideDays={false}
            >
              
            </Calendar>
            </div>
          
           <div className="text-end m-2 ">
         <Button className="bg-linear-120 hover:shadow-2xl hover:cursor-pointer from-indigo-600 to-indigo-500" onClick={()=>{
         setOpen(prev  => !prev);
         
         }}>OK</Button>
           </div>
          </PopoverContent>
        </div>
      </Popover>
    </div>

  )
}
