import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react" // Optional: Adds a warning icon

interface SessionLimitAlertProps {
  isOpen: boolean
  onClose: () => void
}

export function SessionLimitAlert({ isOpen, onClose }: SessionLimitAlertProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[400px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            </div>
            <AlertDialogTitle>Session Limit Reached</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-2">
            We currently allow only 5 sessions. Please manage your existing sessions or upgrade your plan to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3 ">
          <AlertDialogCancel onClick={onClose}>Dismiss</AlertDialogCancel>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
