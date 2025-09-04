import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DrawerDemo } from "@/components/ui/intervel";
import { Label } from "@/components/ui/label";
import { MaxRangeDatePicker } from "@/components/ui/Daterange";


import { Sparkles } from "lucide-react";
export default function Home() {
  return (
    <div className="h-[90vh] relative">
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
      <div className="bg-white shadow p-5  rounded-md ">
        <p className="font-bold text-2xl text-neutral-800">
          Set Revision Reminder
        </p>
        <div className="pt-7 w-full">
          <div className="w-full flex text-center items-center gap-4  justify-center ">
            <div className="w-[100%] ">
              <Label className="mb-2 ">Topic Name</Label>
              <Input placeholder="Enter Topic Name"></Input>
            </div>
          </div>
        </div>

        <div>
          <Label className="mt-8 mb-2">Selct Date Range</Label>
          <MaxRangeDatePicker  />
        </div>
        <div className="w-100 mt-7 hover:cursor-pointer  ">
          <Label className="pb-2">Select Time</Label>
      
        </div>

        <div className="mt-8 hover:cursor-pointer  ">
          <Label className="pb-2">Selct Intervel</Label>
          <DrawerDemo />
        </div>

        <div className="mt-10 text-start">
          <Button className="bg-secondary hover:cursor-pointer">
            Set Revision Reminder
          </Button>
        </div>
      </div>
    </div>
  );
}
