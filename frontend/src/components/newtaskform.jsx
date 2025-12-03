import React, { useState } from 'react';

export default function NewTaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    await onCreate({ title, priority, dueDate: dueDate || null });
    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 w-full max-w-md"
    >
      <h3 className="font-semibold text-lg mb-4">Create Task</h3>
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Task Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
      >
        Create Task
      </button>
    </form>
  );
}