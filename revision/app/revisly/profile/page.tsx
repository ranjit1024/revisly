"use client";
import { Mail, Trash2 } from "lucide-react";
import { useState } from "react";
import user from "../../../public/user.jpg";
import Image from "next/image";
import { useSession } from "next-auth/react";


export default function Home() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const {data:session} = useSession()
  

  return (
    <div className="w-full mx-auto p-1">
      <div className="bg-white rounded-xl p-8 space-y-8 border border-gray-100/50 backdrop-blur-sm">
        {/* Profile Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-300 flex items-center justify-center ring-4 ring-amber-50 transition-all duration-300 group-hover:ring-amber-100">
                <Image
                  src={user || ""}
                  className="w-full h-full rounded-full object-cover"
                  alt="profile"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                {session?.user?.name}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">Profile</p>
            </div>
          </div>

          {/* Session Badge */}
          <div className="flex flex-col items-end mt-1">
            <div className="text-lg font-bold text-gray-800">
              {3}
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Sessions
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Email Section */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-gray-400 font-medium flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            Email Address
          </label>
          <input
            type="email"
            value={session?.user?.email || ""}
            readOnly
            className="w-full px-0 py-2 bg-transparent border-0 border-b border-gray-200 text-gray-700 text-sm focus:outline-none focus:border-gray-900 transition-colors placeholder:text-gray-300"
          />
        </div>

        {/* Delete Button */}
        <button
          onClick={()=>{console.log("Delete")}}
          className={`
            w-full py-3.5 px-6 rounded-2xl font-medium text-sm
            transition-all duration-300 flex items-center justify-center gap-2
            ${
              showDeleteConfirm
                ? "bg-red-600 text-white shadow-lg shadow-red-500/30 scale-[1.02]"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20"
            }
          `}
        >
          <Trash2 className="w-4 h-4" />
          {showDeleteConfirm ? "Click Again to Confirm" : "Delete Permanently"}
        </button>

        {showDeleteConfirm && (
          <p className="text-xs text-center text-gray-400 -mt-4 animate-pulse">
            This action cannot be undone
          </p>
        )}
      </div>
    </div>
  );
}
