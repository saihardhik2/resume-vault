// routes/resumeRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Resume = require('../models/Resume');

const router = express.Router();

// File Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

// File Type Filter
const fileFilter = (req, file, cb) => {
  const allowed = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();
  allowed.test(ext) ? cb(null, true) : cb(new Error('Only PDF/DOC/DOCX allowed'));
};

const upload = multer({ storage, fileFilter });

// Upload Route
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const { name, roll } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resume = new Resume({
      name,
      roll,
      resumePath: req.file.path,
    });

    await resume.save();
    res.json({ message: 'Resume uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Fetch all resumes
router.get('/all', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Fetching failed' });
  }
});

module.exports = router;
