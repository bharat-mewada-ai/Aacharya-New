const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, age, weight, height, goal, lifestyle, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultMissions = [
      { id: 1, title: "Iron Will", desc: "Complete 7-day streak", xp: 500, icon: "🔥", accepted: false, completed: false, type: "streak" },
      { id: 2, title: "Hydration Hero", desc: "Drink 3L water for 3 days", xp: 200, icon: "💧", accepted: false, completed: false, type: "water" },
      { id: 3, title: "Push-Up Pro", desc: "Do 100 push-ups in one session", xp: 350, icon: "💪", accepted: false, completed: false, type: "workout" },
      { id: 4, title: "Clean Eater", desc: "Log all meals for 5 days", xp: 300, icon: "🥗", accepted: false, completed: false, type: "diet" },
      { id: 5, title: "Step King", desc: "10,000 steps in a day", xp: 250, icon: "👟", accepted: false, completed: false, type: "steps" },
    ];
    const defaultTasks = [
      { title: "Morning workout", xp: 50, done: false, icon: "🏃" },
      { title: "Drink 2L water", xp: 30, done: false, icon: "💧" },
      { title: "Log breakfast", xp: 20, done: false, icon: "🍳" },
      { title: "10 min meditation", xp: 40, done: false, icon: "🧘" },
      { title: "Evening walk", xp: 35, done: false, icon: "🚶" },
    ];
    const user = new User({ name, age, weight, height, goal, lifestyle, email, password: hashedPassword, missions: defaultMissions, tasks: defaultTasks });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret');
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;