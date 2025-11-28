import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EmptySessionState = () => {
  const router = useRouter()
  return (
    <div className="min-h-[100vh] bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-4 rounded-md bg-red-50">
      <div className="max-w-md w-full text-center">
        {/* Icon Container */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-lg shadow-blue-100/50 flex items-center justify-center group hover:shadow-xl hover:shadow-blue-200/60 transition-all duration-300 hover:scale-105">
            <Plus className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
          </div>
          {/* Subtle background decoration */}
          <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-2xl blur-xl -z-10"></div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl font-medium text-slate-800">
            No sessions yet
          </h2>
          <p className="text-slate-500 leading-relaxed max-w-sm mx-auto">
            Create your first session to get started with your learning journey
          </p>
        </div>

        {/* CTA Button */}
        <button onClick={()=>router.push("/revisly/revision")} className="group relative inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-900/25">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Create First Session
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>
        </button>

        {/* Optional: Add some floating elements for visual interest */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-purple-200 rounded-full opacity-40 animate-pulse animation-delay-1000"></div>
      </div>
    </div>
  );
};

export default EmptySessionState;
