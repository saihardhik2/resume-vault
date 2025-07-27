const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  roll: String,
  resumePath: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
