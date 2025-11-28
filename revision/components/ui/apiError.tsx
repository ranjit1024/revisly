
"use client"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
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


export function ApiError({open , setOpen}:{
    open:boolean,
    setOpen:(open:boolean) =>void
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent className="sm:max-w-2xl z-100 ">
        <DialogHeader>
          <DialogTitle >Something Went wrong</DialogTitle>
          <DialogDescription>
           Sorry!
          </DialogDescription>
        </DialogHeader>
       <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
              Sorry, Due to some issue we cannot process your request


            </p>
            </div>

                   <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="w-8 h-8 text-red-500 animate-bounce" />
                </div>
                {/* Ripple Effect */}
                <div className="absolute inset-0 w-16 h-16 bg-red-200 dark:bg-red-800/50 rounded-full animate-ping opacity-20"></div>
              </div>
            </div>
        

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant={"outline"}>
              go to dahsboard
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
