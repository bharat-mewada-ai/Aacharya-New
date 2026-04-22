const { getPool } = require('../services/postgres');

async function getTasks(req, res, next) {
  try {
    // Fetch tasks for user
    res.json([]); // stub
  } catch (err) {
    next(err);
  }
}

async function completeTask(req, res, next) {
  try {
    // Mark task as complete, update XP
    res.json({ message: 'Task completed (stub)' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTasks, completeTask };