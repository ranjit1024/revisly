"use cient"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export function Milscc({open,setOpen}:{
    open:boolean,
    setOpen:(open:boolean) =>void
}) {
    const router = useRouter()
  return (

    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Something Went Wrong</AlertDialogTitle>
          <AlertDialogDescription>
            Currntly we can not process your request
            Kildly try after some time
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          
          <AlertDialogAction onClick={()=>{
            
            router.push('/revisly/home')
          }}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
