import { X, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ToastProps {
  message?: string
  onClose?: () => void
  duration?: number
}

export const TopicExistsToast = ({ 
  message = "This topic already exists in your collection", 
  onClose,
  duration = 4000 
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <div className={`fixed top-12 right-4 z-50 transform transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700 rounded-lg shadow-lg p-4 min-w-[320px] max-w-md">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Topic Already Exists
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {message}
            </p>
          </div>
          
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => onClose?.(), 300)
            }}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        </div>
        
        <div className="mt-3 h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full animate-shrink" 
               style={{ animation: `shrink ${duration}ms linear` }} />
        </div>
      </div>
    </div>
  )
}
