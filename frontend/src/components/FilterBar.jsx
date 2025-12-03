import React from "react";

export default function FilterBar({ search, setSearch, status, setStatus }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full md:w-64 px-4 py-2 border rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="px-3 py-2 border rounded-lg"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}