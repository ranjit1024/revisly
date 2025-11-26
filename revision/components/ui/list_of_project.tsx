import { BookmarkCheck } from 'lucide-react';
import React from 'react';
interface sessionType {
    topic: string;
    status: "COMPLETED" | "PENDING" | "MISSED",
    reminderDate: Date;
}
const ProjectList = ({projects}:{projects:sessionType[]}) => {
   const getStatusStyles = (status: sessionType['status']) => {
    switch(status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-orange-100 text-orange-700';
      case 'MISSED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  return (
    <div className=" mx-auto bg-blend-darken bg-background rounded-2xl  p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 pl-1 ">Revsion Session</h2>
        <button className="px-4 py-2 border border-zinc-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          + New
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {projects.map((project,index) => (
          
          <div
            key={index}
            className="flex items-center gap-4 p-3  rounded-lg hover:bg-amber-200 transition-colors cursor-pointer"
          >
            {/* Icon */}
            <div className={`w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl`}>
              <BookmarkCheck/>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-gray-800 font-medium text-sm">
                {project.topic}
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">
                Deadline {project.reminderDate.toDateString()}
              </p>
              {}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusStyles(project.status)}`}>{project.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
