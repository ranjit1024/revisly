import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

export function TopicCard() {
  return (
    <div className="relative bg-gray-100   rounded-3xl p-8 w-full max-w-lg  hover:border-slate-300/50 transition-all duration-300">
      {/* Accent Dot */}
      <div className="absolute top-8 right-8 w-2.5 h-2.5 bg-teal-600 rounded-full"></div>
      
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Current Topic
        </p>
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
          React
        </h2>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-600">Progress</span>
          <span className="text-base font-bold text-slate-900">65%</span>
        </div>
        <Progress 
          value={65} 
          className="h-2 bg-slate-100 rounded-full [&>*]:bg-teal-600 [&>*]:rounded-full" 
        />
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, tenetur.
      </p>

      {/* CTA Button */}
      <button className="group flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-teal-600 transition-colors duration-200">
        View Detail
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </button>
    </div>
  );
}
