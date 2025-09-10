"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { listUserPDFs } from "@/lib/actions/getNotesPdf"
import { id } from "date-fns/locale"
import { useEffect } from "react"

export function ViewNotes({topic,brief, notesLink}:{
topic:string | undefined,
brief:string | undefined,
id:string | undefined,
notesLink:string | undefined
}) {
    
  return (
    <Dialog>
      <DialogTrigger asChild>
           <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm hover:brightness-95 hover:cursor-pointer">View Notes</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="ml-1">
          <DialogTitle className="text-2xl">{topic === undefined ? <div className="h-10 bg-gray-100 rounded-md w-40"></div>:<div>{topic}</div>}</DialogTitle>
          <DialogDescription>
            {brief}
            
          </DialogDescription>
        </DialogHeader>
        {notesLink}
     
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="hover:cursor-pointer ">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
