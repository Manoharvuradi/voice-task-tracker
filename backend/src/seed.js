require('dotenv').config();
const mongoose = require('mongoose');
const Task = require('./models/Task');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Task.deleteMany({});
  const tasks = [
    { title: 
      'Review pull request for auth module', priority: 'high', status: 'todo', dueDate: new Date(Date.now() + 24*3600*1000) },
    { title: 
      'Write unit tests for payment flow', priority: 'medium', status: 'in-progress' },
    { title: 
      'Deploy staging build', priority: 'low', status: 'done' },
  ];
  await Task.insertMany(tasks);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });