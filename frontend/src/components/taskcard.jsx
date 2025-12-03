import React from 'react';

export default function TaskCard({ task, onMove }) {
  const { _id, title, priority, dueDate } = task;
  const dateStr = dueDate ? new Date(dueDate).toLocaleString() : '';

  const priorityClasses = {
    low: "bg-green-50 text-green-700",
    medium: "bg-orange-50 text-amber-700",
    high: "bg-red-50 text-red-700",
  };

  return (
    <div className="border border-gray-200 p-2 rounded-md mb-2 bg-white">
      <div className="flex justify-between items-center">
        <strong>{title}</strong>
        <span
          className={`px-2 py-1 rounded-full text-xs capitalize ${priorityClasses[priority]}`}
        >
          {priority}
        </span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <small>{dateStr}</small>

        <div className="flex task-actions">
          <button
            onClick={() => onMove(_id, 'todo')}
            className="ml-1.5 p-1.5 rounded-md border border-gray-300 bg-gray-50 cursor-pointer"
          >
            To Do
          </button>
          <button
            onClick={() => onMove(_id, 'in-progress')}
            className="ml-1.5 p-1.5 rounded-md border border-gray-300 bg-gray-50 cursor-pointer"
          >
            In Progress
          </button>
          <button
            onClick={() => onMove(_id, 'done')}
            className="ml-1.5 p-1.5 rounded-md border border-gray-300 bg-gray-50 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}