"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer"
import { DialogTitle } from "@radix-ui/react-dialog"

export function DatePickerResponsive() {
  // Calculate date range
  const today = new Date()
  const twoMonthsLater = new Date(today)
  twoMonthsLater.setMonth(today.getMonth() + 1)

  // Initialize with default range starting from today
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: today,
    to: undefined
  })
  const [open, setOpen] = React.useState(false)

  // Format the display text
  const displayText = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`
      : format(dateRange.from, "PPP")
    : "Pick a date range"

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
      <DrawerContent className="h-[59%] p-3">
        <DialogTitle className="text-center text-gray-600 text-lg font-medium">
          Pick a date range
        </DialogTitle>
        <div className="p-3 w-[100%] h-full">
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
        <DrawerClose asChild className="text-end w-full flex justify-center items-center ">
          <div>

              <Button className="mt-6 rounded-md w-[82%]  ">Done</Button>
          </div>
            </DrawerClose>
      
      </DrawerContent>
    </Drawer>
  )
}
