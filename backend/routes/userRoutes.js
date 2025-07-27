const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();

// Utility function to hash password
const sha256 = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Signup
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = sha256(password);
    const newUser = new User({ username, passwordHash, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.passwordHash !== sha256(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

module.exports = router;
