import { X, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ToastProps {
  message?: string
  onClose?: () => void
  duration?: number
}

export const ErrorToast = ({ 
  message = "Kindy enter valid input", 
  duration = 4000 
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className={`fixed top-12 w-100 max-md:w-[100%] max-md:top-14 max-md:z-1 right-4 max-md:p-1 max-md:right-0 z-50 transform transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-lg shadow-lg p-4 min-w-[320px] max-w-md ">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Invalid Input
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {message}
            </p>
          </div>
          
         
        </div>
        
        <div className="mt-3 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full animate-shrink" 
               style={{ animation: `shrink ${duration}ms linear` }} />
        </div>
      </div>
    </div>
  )
}
