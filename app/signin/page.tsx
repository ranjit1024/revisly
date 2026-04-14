import React from 'react';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-slate-100 to-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      <div className="max-w-md w-full relative">
        
        {/* The Main Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-2xl shadow-slate-200/50 border border-white/60">
          
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 tracking-tighter inline-block mb-6">
              revisly
            </h1>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h2>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
              Access your dashboard via SSO with enterprise-grade security.
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button
              type="button"
              className="group hover:cursor-pointer relative w-full flex justify-center items-center gap-3 py-3.5 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-base font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110 duration-300" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Social Proof / Trust Signal */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center justify-center">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Trusted by 10 merchants
            </p>
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white"></div>
              <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white"></div>
              <div className="w-7 h-7 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-[10px] text-white font-medium">+7</div>
            </div>
          </div>
          
        </div>

        {/* Floating Footer Links */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="font-medium text-slate-700 hover:text-slate-900 underline underline-offset-2 decoration-slate-300 hover:decoration-slate-500 transition-colors">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-slate-700 hover:text-slate-900 underline underline-offset-2 decoration-slate-300 hover:decoration-slate-500 transition-colors">
              Privacy Policy
            </a>.
          </p>
        </div>

      </div>
    </div>
  );
}