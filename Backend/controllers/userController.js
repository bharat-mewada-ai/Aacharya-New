const { getPool } = require('../services/postgres');

async function getUserProfile(req, res, next) {
  try {
    const pool = getPool();
    const result = await pool.query('SELECT * FROM users WHERE id=$1', [req.user.id]);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateUserProfile(req, res, next) {
  try {
    const pool = getPool();
    // Update logic here (example: name, age, etc.)
    res.json({ message: 'Profile updated (stub)' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getUserProfile, updateUserProfile };