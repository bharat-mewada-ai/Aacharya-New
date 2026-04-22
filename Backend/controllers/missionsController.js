const { getPool } = require('../services/postgres');

async function getMissions(req, res, next) {
  try {
    // Fetch missions for user
    res.json([]); // stub
  } catch (err) {
    next(err);
  }
}

async function acceptMission(req, res, next) {
  try {
    // Accept mission logic
    res.json({ message: 'Mission accepted (stub)' });
  } catch (err) {
    next(err);
  }
}

async function completeMission(req, res, next) {
  try {
    // Complete mission logic, update XP
    res.json({ message: 'Mission completed (stub)' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMissions, acceptMission, completeMission };