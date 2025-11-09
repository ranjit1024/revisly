"use client"
import { Sparkles } from "lucide-react"
export default function Home(){
    return <div>
         <div className="flex  absolute h-full bg-gray-50 rounded-2xl w-[79vw] opacity-100">
        <div className=" h-full w-full flex items-center ">
          <div className=" p-5 rounded-xl w-full ">
            <div className=" text-gray-950 rounded-2xl  p-8 w-full flex flex-col justify-between h-auto space-y-3 ">
              <div>
                {/* Header section with Icon and Title */}
          <div className="absolute right-20 bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                Per token 1 session
            </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-600/20 p-3 rounded-full">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-950">
                    Get a Token for Custom Revisions
                  </h3>
                </div>

                {/* Description */}
                <p className="text-neutral-900 mb-6 ml-2">
                  Hi, I would like to make this feature free, But i need pay for servers...
                </p>
               
                
              </div>

              
              {/* Purchase Section */}
              <div className="mt-auto">
                {/* Price Display */}
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">₹10</span>
                  <span className="text-gray-800"> / per token</span>
                </div>

                {/* Call-to-Action Button */}
                <button className="w-full px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-200">
                  Buy Token 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}