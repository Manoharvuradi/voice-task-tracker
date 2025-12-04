import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask } from './api';
import NewTaskForm from './components/newtaskform';
import TaskBoard from './components/taskboard';
import VoiceInputButton from './components/VoiceInputButton';
import VoiceReviewModal from './components/VoiceReviewModal';
import axios from 'axios';
import FilterBar from './components/FilterBar';
import EditTaskModal from './components/EditTaskModal';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [voiceData, setVoiceData] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editTask, setEditTask] = useState(null);


  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onCreate = async (payload) => {
    const created = await createTask(payload);
    setTasks(prev => [created, ...prev]);
  };

  const onUpdate = async (id, patch) => {
    const updated = await updateTask(id, patch);
    setTasks(prev => prev.map(t => (t._id === id ? updated : t)));
  };

  const handleTranscript = async (text) => {

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/parse`, {
      transcript: text,
    });

    setVoiceData({
      transcript: text,
      ...res.data
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? task.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const openEdit = (task) => setEditTask(task);

  const onDelete = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h4 className="text-lg font-semibold tracking-tight">Voice Task Tracker</h4>
      </header>

      {/* Main Layout */}
      <main className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">

        {/* Voice + Manual Form */}
        <div className="w-full space-y-4">
          <VoiceInputButton onTranscript={handleTranscript} />
          <NewTaskForm onCreate={onCreate} />
        </div>

        {/* Task Board */}
        <section className="flex-1 space-y-4">
          <FilterBar
            search={search}
            setSearch={setSearch}
            status={statusFilter}
            setStatus={setStatusFilter}
          />

          <TaskBoard
            tasks={filteredTasks}
            onUpdate={onUpdate}
            openEdit={openEdit}
            onDelete={onDelete}
          />
        </section>

      </main>

      {/* Modal (placed outside layout for proper overlay) */}
      {voiceData && (
        <VoiceReviewModal
          data={voiceData}
          onClose={() => setVoiceData(null)}
          onSave={async (task) => {
            const created = await createTask(task);
            setTasks(prev => [created, ...prev]);
            setVoiceData(null);
          }}
        />
      )}
      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={async (updated) => {
            await onUpdate(editTask._id, updated);
            setEditTask(null);
          }}
        />
      )}
    </div>
  );
}