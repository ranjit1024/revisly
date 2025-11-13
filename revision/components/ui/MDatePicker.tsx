"use client"

import * as React from "react"
import { format , subDays} from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange, useDayPicker ,} from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter
} from "@/components/ui/drawer"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "@/store/slices/revison"
import { RootState } from "@/store/store"

export function DatePickerResponsive() {
  // Calculate date range
  const today = new Date()
  const twoMonthsLater = new Date(today)
  twoMonthsLater.setMonth(today.getMonth() + 1)
  const dispatch = useDispatch()
  // Initialize with default range starting from today
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: today,
    to: undefined
  })
  const [open, setOpen] = React.useState(false)
  const selectDays = useSelector((data:RootState)=>{
    return data.revision.days
  })
  // Format the display text
  const displayText = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`
      : format(dateRange.from, "PPP")
    : "Pick a date range"

    React.useEffect(()=>{
      dispatch(actions.addStartTime({
        startDate:dateRange?.from ? String(subDays(dateRange.from,-1)): ''
      }))
      dispatch(actions.addEndTime({
        endDate:String(dateRange?.to)
      }))
    },[open])
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <label 
        className="block text-sm mb-1 font-medium text-zinc-700 text-start ml-1" 
        htmlFor="session-duration"
      >
        How long would you like your session to be
      </label>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[97vw] h-11 justify-start text-left font-normal",
            !dateRange?.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayText}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-fit p-3">
        <DialogTitle className="text-center text-gray-600 text-lg font-medium">
          Pick a date range
        </DialogTitle>
        <div className="p-3 w-[100%] h-100 ">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            defaultMonth={today}
            fromDate={today}
            toDate={twoMonthsLater}
            disabled={(date) => date < today || date > twoMonthsLater}
            initialFocus
            className="rounded-md w-full"
          />
 
    
        </div>
        <DrawerFooter>

        <DrawerClose asChild className="text-end w-full  flex justify-center items-center ">
          <div>

              <Button className="mt-5 rounded-md w-[90%]   ">Done</Button>
          </div>
            </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
