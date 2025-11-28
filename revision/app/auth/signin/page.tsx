"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import side from "../../../public/info.png";
import logo from "../../../public/revisly.png"

export default function LoginForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      router.push("/revisly/home");
    }
  }, [session, router, status]);
  if (status === "loading") return <Loader />;
  if (!session)
    return (
      <div className="w-full grid grid-cols-[50%_50%] relative max-md:grid-cols-1">
        <div className="flex w-[100%] h-[100%] relative justify-center items-center bg-center bg-contain flex-col  bg-no-repeat bg-white">
          <Image src={side} alt="images" fill className="object-contain" />
          <div className="flex absolute top-13 bg-white  left-53 items-center gap-2 max-md:ml-2 "></div>
        </div>
         <div className="relative min-h-screen bg-white  overflow-hidden flex items-center justify-center ">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
       
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]"></div>

      {/* Main Content */}
      <div className="relative w-full max-w-md">
        {/* Glass Card */}
        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-black/50">
          {/* Decorative gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 -z-10 blur-xl"></div>
          
          {/* Logo Section */}
          <div className="text-center mb-10">
            {/* Animated Logo */}
            <div className="inline-block relative mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-purple-500 p-1 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Image src={logo} height={60} width={80} alt="logo"/>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-zinc-900 via-cyan-800 to-violet-800 bg-clip-text text-transparent">
              Revisly
            </h1>
            <p className="text-slate-400 text-base font-medium tracking-wide">
              Create session and take quiz
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={() => {
              signIn("google", {callbackUrl:'/revisly/home'})
              console.log('Google login clicked');
            }}
            className="group hover:cursor-pointer relative w-full bg-white hover:bg-gray-50 text-slate-900 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 border hover:shadow-2xl hover:shadow-indigo-500/50 flex items-center justify-center gap-3 overflow-hidden"
          >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
            
            <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-base relative z-10">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="text-slate-500 text-sm font-medium">or explore</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-4 py-2 rounded-full bg-indigo-500/30 border border-indigo-500 text-indigo-500 text-sm font-medium backdrop-blur-sm">
              Smart Quizzes
            </span>
            <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500 text-purple-500 text-sm font-medium backdrop-blur-sm">
              Study Sessions
            </span>
            <span className="px-4 py-2 rounded-full bg-blue-500/30 border border-teal-500/20 text-blue-500 text-sm font-medium backdrop-blur-sm">
              Track Progress
            </span>
          </div>
        </div>

        {/* Bottom Badge */}
    
      </div>

    
    </div>
      </div>
    );
}
