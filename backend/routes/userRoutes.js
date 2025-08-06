const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User');

// Hash password with SHA-256
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// SIGNUP
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  // Validate input
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if username already exists (case-insensitive)
  const existing = await User.findOne({ username: new RegExp(`^${username}$`, 'i') }).lean();
  if (existing) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Save new user
  const hashedPassword = hashPassword(password);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();

  res.json({ message: 'Signup successful' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Hash entered password
  const hashedPassword = hashPassword(password);

  // Check if user exists
  const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i'), password: hashedPassword }).lean();

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password. Please sign up first.' });
  }

  res.json({ message: 'Login successful', role: user.role });
});

module.exports = router;
