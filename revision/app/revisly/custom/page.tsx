import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DrawerDemo } from "@/components/ui/intervel";
import { Label } from "@/components/ui/label";
import { MaxRangeDatePicker } from "@/components/ui/Daterange";


import { Sparkles } from "lucide-react";
export default function Home() {
  return (
    <div className="h-[90vh] relative">
     

    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <span className="text-sm font-medium text-emerald-700">Working</span>
    </div>


    </div>
  );
}
