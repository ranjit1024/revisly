'use client'
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
import { RootState } from "@/store/store"
import { useSelector,  } from "react-redux"

export function Preview() {
    const date = new Date();
    const sessionData = useSelector((state: RootState) => {
        const data = {
          topic: state.revision.topic,
          sessionIntervel: state.revision.sessionIntervel,
          time: state.revision.time,
          totaldays: state.revision.totalDays
        };
        return data;
      });
      
    return (
        <Dialog >
            <DialogTrigger asChild>
                <button className="text-sm hover:cursor-pointer font-medium text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline">
                    Preview schedule
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle># {sessionData.topic}</DialogTitle>
                    <DialogDescription className="mb-2">
                        Notes will be generated with AI. Your practice test will be curated
              from these notes and upcoming sessions.
                    </DialogDescription>
                </DialogHeader>
               <div className="grid grid-cols-2">
                <div className="border ">
                    <h1 className="border-b-1 text-center font-medium p-1 ">sessions</h1>
                   
                   
                </div>
                <div className="border ">
                    <h1 className="border-b-1 text-center font-medium p-1">Date</h1>
                    {

                      
                    }
                        
                    
                </div>
               </div>
                 
                <DialogFooter className="sm:justify-start mt-2">
                    <DialogClose asChild>
                        <Button type="button" variant='outline' >
                            OK
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
