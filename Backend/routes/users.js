const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user profile
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH: update XP only
router.patch('/:id/xp', auth, async (req, res) => {
  try {
    const { xp } = req.body;
    if (typeof xp !== 'number') return res.status(400).json({ error: 'xp must be a number' });
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { xp },
      { new: true }
    ).select('xp');
    res.json({ xp: user.xp });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH: update streak only
router.patch('/:id/streak', auth, async (req, res) => {
  try {
    const { streak } = req.body;
    if (typeof streak !== 'number') return res.status(400).json({ error: 'streak must be a number' });
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { streak },
      { new: true }
    ).select('streak');
    res.json({ streak: user.streak });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update task done status
router.put('/tasks/:index', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.tasks[req.params.index]) {
      user.tasks[req.params.index].done = req.body.done;
      if (req.body.done) user.xp += user.tasks[req.params.index].xp;
      await user.save();
      res.json(user.tasks[req.params.index]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;