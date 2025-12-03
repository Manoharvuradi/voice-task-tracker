import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
});

export const getTasks = (params) => API.get('/tasks', { params }).then(r => r.data);
export const createTask = (payload) => API.post('/tasks', payload).then(r => r.data);
export const updateTask = (id, payload) => API.put(`/tasks/${id}`, payload).then(r => r.data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`).then(r => r.data);