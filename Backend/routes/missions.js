const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get missions
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.missions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Accept mission
router.post('/:id/accept', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const mission = user.missions.find(m => m.id == req.params.id);
    if (mission) {
      mission.accepted = true;
      await user.save();
      res.json(mission);
    } else {
      res.status(404).json({ error: 'Mission not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Complete mission
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const mission = user.missions.find(m => m.id == req.params.id);
    if (mission && mission.accepted) {
      mission.completed = true;
      user.xp += mission.xp;
      await user.save();
      res.json(mission);
    } else {
      res.status(404).json({ error: 'Mission not found or not accepted' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;