'use client'
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, Hash, BookOpen, BarChart3, Aperture } from "lucide-react";
import { getNotes } from "@/lib/actions/getNotesPdf";
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
  hover: { border: '1px solid gray' }
};

function formatDate(d: any) {
  const dt = d instanceof Date ? d : new Date(d);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(dt);
}

const SessionCard = (
  {
    sessionNumber = 1,
    title = "Revision Session",
    startDate = new Date(),
    endDate = new Date(),
    brief = "Short summary about what to revise in this session.",
    progress = 0,
    id = "",
    status = "PENDING",
    score = null
  }: {

    title: string,
    startDate: Date,
    endDate: Date,
    brief: string,
    sessionNumber: number,
    progress: number
    id: string
    status: 'PENDING' | 'COMPLETED' | 'MISSED'
    score: number | null
  }
) => {

  const router = useRouter();
  return (
    <motion.div

      variants={cardVariant}

      className="w-full  bg-white rounded-lg shadow  hover:shadow-lg border border-gray-100 hover:shadow-indigo-100  overflow-hidden   ">
      {/* Header with date */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar size={16} />
          <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
        </div>
        <div className="flex max-md:hidden items-center gap-2 text-gray-400 text-xs">
          <span className={`bg-amber-50 text-amber-500 text-xs font-semibold px-3 py-1 rounded-md ${status === 'COMPLETED' ? 'bg-green-50 text-green-500 text-xs font-semibold px-3 py-1 rounded-md ' : null} `}>
            {status}
          </span>
          <div className="flex gap-1">

            <Clock size={14} />
            <span>{(endDate.getDate() - startDate.getDate()) < 0 ? Math.abs((startDate.getDate() - endDate.getDate()) - (new Date().getMonth() === 4 || 6 || 9 || 100 ? 30 : 31) ): (endDate.getDate() - startDate.getDate())}</span>

          </div>
        </div>
      </div>


      {/* Main content */}
      <div className="p-6">
        {/* Title section */}
        <div className="flex justify-between">


          <div className="flex items-center gap-4 mb-6 ">
            <div className="w-12 h-12 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl flex items-center justify-center shadow">
              <BookOpen className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
              <p className="text-gray-500 text-sm font-medium">Session #{sessionNumber}</p>
            </div>
          </div>
          <p className={`${score === 0 ? 'text-md font-medium text-gray-50' : 'text-md font-medium text-gray-600'}`}>
            {score}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm">{brief}</p>
        </div>

        {/* Progress section */}


        {/* Action buttons */}
        <div className="flex gap-3 max-md:flex-col">
          <button
            onClick={async () => {
              const userNotes = await getNotes({ folderKey: `${id}-${title}/notes/notes.pdf` });
              console.log(id)
              if (userNotes) {

                window.open(userNotes)
              }
            }}
            className="flex-1 bg-zinc-900 hover:bg-zinc-700 hover:cursor-pointer text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2">
            View Notes
          </button>
          <button

            className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={() => {

              router.push(`/revisly/revision/${id}`);

            }}
          >
            View All Sessions
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SessionCard;