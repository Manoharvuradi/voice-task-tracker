import React, { useState } from "react";

export default function VoiceReviewModal({ data, onClose, onSave }) {
  const [title, setTitle] = useState(data.title || "");
  const [priority, setPriority] = useState(data.priority || "medium");
  const [status, setStatus] = useState(data.status || "todo");
  const [dueDate, setDueDate] = useState(
    data.dueDate ? data.dueDate.substring(0, 16) : ""
  );

  const handleSubmit = () => {
    onSave({
      title,
      priority,
      status,
      dueDate,
      description: data.description || "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Review Parsed Task</h2>
        <p className="text-sm mb-3">
          <span className="font-semibold">Transcript:</span> {data.transcript}
        </p>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="datetime-local"
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Create Task
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}