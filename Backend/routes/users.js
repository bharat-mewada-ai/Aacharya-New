const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user data
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user data
router.put('/', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update task
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