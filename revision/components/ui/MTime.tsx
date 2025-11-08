"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
export function MTime() {
  const [Hours, setHours] = React.useState("");
  const [Min, setMin] = React.useState("");

  return (
    <Drawer>
      <label
        className="block text-sm mb-1 font-medium text-zinc-700 text-start ml-1"
        htmlFor="session-duration"
      >
        When should we remind you
      </label>
      <DrawerTrigger asChild>
        <Button
          variant={"outline"}
          className="w-[97vw] h-11 justify-start text-left font-normal"
        >
          5:00 AM
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Select Time</DrawerTitle>
            <DrawerDescription>Set your Reminder Time.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 w-[100%] grid grid-cols-[60%_40%] justify-start items-center">
            <div className="flex gap-3 justify-start ">
              <div className="text-center flex justify-center flex-col gap-4 items-center">
               <input
                  type="number"
                  className="text-xl w-20 p-2 rounded-2xl border text-center font-medium"
                  onChange={(e) => {
                    const value = e.target.value;

                    const numValue = parseInt(value);
                    
                  setHours(String(Math.min(Math.max(numValue, 1), 12)))
                  }}
                  onFocus={(e) => e.target.select()}
                  value={Hours}
                ></input>
              </div>
              <div className="flex justify-center items-center">
                <p className="font-black">:</p>
              </div>
              <div className="text-center flex justify-center flex-col gap-4 items-center">
                <input
                  type="number"
                  className="text-xl w-20 p-2 rounded-2xl border text-center font-medium"
                  onChange={(e) => {
                    const value = e.target.value;

                    const numValue = parseInt(value);
                    
                  setMin(String(Math.min(Math.max(numValue, 1), 60)))
                  }}
                  onFocus={(e) => e.target.select()}
                  value={Min}
                ></input>
              </div>
            </div>
            <div className="flex gap-1 w-full justify-center items-center-safe flex-wrap">
              <Button className=" bg-transparent border-2 rounded-2xl w-fit text-center focus:bg-teal-600/20 font-semibold focus:border-teal-600 text-black px-6 py-5">
                AM
              </Button>
              <Button className=" bg-transparent border-2 rounded-2xl w-fit text-center text-black px-6 py-5 font-semibold">
                PM
              </Button>
            </div>
          </div>
          <DrawerFooter className="mt-5">
            <DrawerClose asChild>
              <Button>Done</Button>
            </DrawerClose>

            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
