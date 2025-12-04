import { useState } from "react";

export default function EditTaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate ? task.dueDate.substring(0, 16) : ""
  });

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-semibold">Edit Task</h2>

        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={update}
          className="w-full border p-2 rounded-lg"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={update}
          rows={3}
          className="w-full border p-2 rounded-lg"
        />

        {/* Priority */}
        <select
          name="priority"
          value={form.priority}
          onChange={update}
          className="w-full border p-2 rounded-lg"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={update}
          className="w-full border p-2 rounded-lg"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Due Date */}
        <input
          type="datetime-local"
          name="dueDate"
          value={form.dueDate}
          onChange={update}
          className="w-full border p-2 rounded-lg"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}