"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "react-responsive"
import { DialogTitle } from "@radix-ui/react-dialog"

export function DatePickerResponsive() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  
  // Calculate date range
  const today = new Date()
  const twoMonthsLater = new Date(today)
  twoMonthsLater.setMonth(today.getMonth() + 2)

  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
             <label className="block text-sm mb-1 font-medium text-zinc-700 text-start ml-1" htmlFor="topic">
          How long would you like your session to be
        </label>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[95vw] h-11 mt-1 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogTitle className="text-center text-gray-600 text-lg font-medium">Pick a date</DialogTitle>
        <div className="p-3 w-[100%]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              setOpen(false)
            }}
            fromDate={today}
            toDate={twoMonthsLater}
            disabled={(date) => date < today || date > twoMonthsLater}
            initialFocus
            className="rounded-md border w-full"
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
