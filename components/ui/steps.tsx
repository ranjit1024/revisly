import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileUp, Sparkles, Users, Send, CheckCircle2, UploadCloud, Database, Activity } from 'lucide-react';

const steps = [
  {
    id: 0,
    title: "Secure Authentication",
    description: "Access your dashboard via SSO with enterprise-grade security.",
    icon: Lock,
  },
  {
    id: 1,
    title: "Upload Policy Guide",
    description: "Drop your PDF guidelines into the secure encrypted vault.",
    icon: FileUp,
  },
  {
    id: 2,
    title: "AI Test Generation",
    description: "Our engine parses the rules and drafts a custom assessment.",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Import Candidates",
    description: "Sync your team via CSV or one-click HRIS integration.",
    icon: Users,
  },
  {
    id: 4,
    title: "Launch & Monitor",
    description: "Dispatch tests instantly and track live completion scores.",
    icon: Activity,
  }
];

const LandingPageShowcase = () => {
  const [activeStep, setActiveStep] = useState(1);

  // Animation variants for the whole section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    } 
  } as const;

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="py-24 px-6 bg-[#FAFAFA] font-sans text-slate-900 border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
            From Policy to Assessment in Minutes
          </h2>
          <p className="text-base text-slate-500 leading-relaxed">
            Automate your compliance workflow. Upload your governance documents and let our system handle the generation and distribution.
          </p>
        </motion.div>

        {/* Main Showcase Grid */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Side: Interactive Steps List */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-1 relative">
            <div className="absolute left-[31px] top-8 bottom-8 w-[1px] bg-slate-200 z-0 hidden lg:block" />

            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const Icon = step.icon;

              return (
                <div 
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 flex gap-5 items-start group z-10
                    ${isActive ? 'bg-white shadow-sm border border-slate-200/80' : 'hover:bg-slate-100/50 border border-transparent'}
                  `}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 border
                    ${isActive 
                      ? 'bg-[#FF6D24] text-white border-[#FF6D24] shadow-md shadow-[#FF6D24]/20' 
                      : 'bg-white text-slate-400 border-slate-200 group-hover:border-slate-300 group-hover:text-slate-600'}
                  `}>
                    <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                  </div>
                  
                  <div className="pt-0.5">
                    <h3 className={`text-sm font-semibold mb-1 transition-colors ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-[13px] leading-relaxed transition-colors ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right Side: The Minimalist App Preview */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/80 overflow-hidden flex flex-col">
              
              <div className="h-10 bg-[#FCFCFC] border-b border-slate-100 flex items-center px-4 gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
              </div>

              <div className="flex-1 relative bg-slate-50/50 flex items-center justify-center p-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  
                  {activeStep === 0 && (
                    <PreviewScreen key="s0">
                       <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
                         <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-slate-100">
                           <Lock className="text-slate-500" size={18} />
                         </div>
                         <div className="h-3 w-24 bg-slate-200 rounded-full mx-auto mb-8" />
                         <div className="space-y-3 mb-6">
                           <div className="h-9 w-full bg-slate-50 border border-slate-100 rounded-md" />
                           <div className="h-9 w-full bg-slate-50 border border-slate-100 rounded-md" />
                         </div>
                         <div className="h-10 w-full bg-slate-900 rounded-md" />
                       </div>
                    </PreviewScreen>
                  )}

                  {activeStep === 1 && (
                    <PreviewScreen key="s1">
                      <div className="w-full h-full max-h-[220px] max-w-md border border-dashed border-slate-300 bg-white rounded-xl flex flex-col items-center justify-center text-center transition-colors hover:border-[#FF6D24]/60 hover:bg-[#FF6D24]/5 cursor-pointer">
                        <UploadCloud size={32} strokeWidth={1.5} className="text-[#FF6D24] mb-3" />
                        <h4 className="text-sm font-semibold text-slate-700 mb-1">Click to upload document</h4>
                        <p className="text-[11px] text-slate-400">PDF, DOCX up to 50MB</p>
                      </div>
                    </PreviewScreen>
                  )}

                  {activeStep === 2 && (
                    <PreviewScreen key="s2">
                      <div className="w-full max-w-sm flex flex-col items-center text-center">
                        <div className="relative w-16 h-16 mb-6">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="absolute inset-0 border-[3px] border-slate-100 border-t-[#FF6D24] rounded-full" />
                          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FF6D24]" size={20} strokeWidth={1.5} />
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-4">Generating Assessment...</h4>
                        <div className="w-full space-y-2">
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: "10%" }} animate={{ width: "85%" }} transition={{ duration: 2.5, ease: "easeOut" }} className="h-full bg-[#FF6D24] rounded-full" />
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase text-left">Processing directives</p>
                        </div>
                      </div>
                    </PreviewScreen>
                  )}

                  {activeStep === 3 && (
                    <PreviewScreen key="s3">
                      <div className="w-full h-full bg-white border border-slate-100 shadow-sm rounded-xl p-5 flex flex-col max-w-md">
                        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                          <div className="h-4 w-20 bg-slate-200 rounded" />
                          <div className="h-7 w-24 bg-slate-900 rounded flex items-center justify-center gap-1.5">
                            <Database size={10} className="text-white/70" />
                            <span className="h-2 w-10 bg-white/20 rounded" />
                          </div>
                        </div>
                        <div className="space-y-2 flex-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                              <div className="w-7 h-7 rounded-full bg-slate-100 flex-shrink-0" />
                              <div className="space-y-1.5 flex-1">
                                <div className="h-2.5 w-24 bg-slate-200 rounded" />
                                <div className="h-2 w-16 bg-slate-100 rounded" />
                              </div>
                              <CheckCircle2 size={14} className="text-slate-300" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </PreviewScreen>
                  )}

                  {activeStep === 4 && (
                    <PreviewScreen key="s4">
                      <div className="text-center w-full max-w-sm">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100">
                          <Send size={20} className="text-emerald-600 translate-x-0.5 -translate-y-0.5" strokeWidth={1.5} />
                        </motion.div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-2">Campaign Ready</h4>
                        <p className="text-[13px] text-slate-500 mb-8">All candidates are queued to receive the policy assessment.</p>
                        <div className="w-full py-3 bg-[#FF6D24] text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-[#E55B15] transition-colors cursor-pointer">
                          Dispatch Now
                        </div>
                      </div>
                    </PreviewScreen>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

const PreviewScreen = ({ children }:any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="absolute inset-0 flex items-center justify-center p-6 w-full h-full"
  >
    {children}
  </motion.div>
);

export default LandingPageShowcase;