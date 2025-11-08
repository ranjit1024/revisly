import React, { useState } from 'react';

const DifficultySelector = () => {
  const [selected, setSelected] = useState('medium');

  const levels = [
    { id: 'easy', label: 'Easy', subtitle: 'Once a week' },
    { id: 'medium', label: 'Medium', subtitle: 'Twice a week' },
    { id: 'hard', label: 'Hard', subtitle: 'Daily' },
  ];

  return (
    <div className="w-full max-w-md mx-auto ">
     
      <div className="space-y-2">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setSelected(level.id)}
            className={`
              w-full p-4 rounded-xl text-left transition-all
              ${
                selected === level.id
                  ? 'bg-amber-50 border-2 border-amber-200'
                  : 'bg-white border-2 border-gray-200'
              }
            `}
          >
            <div className="flex flex-col">
              <span
                className={`
                  text-base font-medium
                  ${selected === level.id ? 'text-amber-900' : 'text-gray-900'}
                `}
              >
                {level.label}
              </span>
              <span
                className={`
                  text-sm
                  ${selected === level.id ? 'text-amber-700' : 'text-gray-500'}
                `}
              >
                {level.subtitle}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
