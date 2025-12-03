import React from 'react';
import TaskCard from './taskcard';

export default function TaskColumn({ title, tasks, onMove, status }) {
  return (
    <div
      className="
        bg-white p-4 rounded-xl shadow border  border-gray-200 flex flex-col min-h-[300px]"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div
        className="space-y-3 flex-1 overflow-y-auto pr-1"
      >
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onMove={onMove} />
        ))}
        {tasks.length === 0 && (
          <p className="text-sm text-gray-400 italic text-center py-4">
            No tasks yet
          </p>
        )}
      </div>
    </div>
  );
}