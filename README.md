# Voice-Enabled Task Tracker

A simple task management application that allows users to create tasks manually or using voice input.  
Built with React, Tailwind CSS, Express, and MongoDB.

---

## 🚀 Features
- Voice-based task creation
- Manual task creation
- Priority & due date support
- Clean Tailwind UI

---

## 🛠️ Tech Stack
### Frontend
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB (Mongoose)

---

## 📦 Project Structure

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url>
cd project-folder


cd backend
npm install

PORT=4000
MONGO_URI=mongodb://localhost:27017/voice_task_tracker
OPENAI_API_KEY=your_api_key_here

npm run seed(optional)
npm run dev


cd frontend
npm install

## Create env file
VITE_API_URL=http://localhost:4000/api
npm run dev
http://localhost:5173