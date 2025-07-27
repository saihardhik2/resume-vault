const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const resumeRoutes = require('./routes/resumeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/resumes', resumeRoutes);
app.use('/api/users', userRoutes);

// 🔗 MongoDB Atlas connection string
mongoose.connect('mongodb+srv://@cluster0.ptgxkak.mongodb.net/resume-manager?retryWrites=true&w=majority')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Atlas connection error:', err));

app.listen(3000, () => console.log('🚀 Server started on port 3000'));
