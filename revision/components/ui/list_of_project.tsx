import React from 'react';

const ProjectList = () => {
  const projects = [
    {
      id: 1,
      icon: '✏️',
      title: 'Develop API Endpoints',
      deadline: 'Nov 30, 2024',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Onboarding Flow',
      deadline: 'Dec 5, 2024',
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-600'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Build Dashboard',
      deadline: 'Nov 30, 2024',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 4,
      icon: '⚡',
      title: 'Optimize Page Load',
      deadline: 'Dec 1, 2024',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 5,
      icon: '🔍',
      title: 'Cross-Browser Testing',
      deadline: 'Dec 10, 2024',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className=" mx-auto bg-emerald-50 rounded-2xl  p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 pl-1 ">Project</h2>
        <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          + New
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center gap-4 p-3  rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {/* Icon */}
            <div className={`w-10 h-10 ${project.bgColor} rounded-lg flex items-center justify-center text-xl`}>
              {project.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-gray-800 font-medium text-sm">
                {project.title}
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">
                Deadline {project.deadline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
