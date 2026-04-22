const { getPool } = require('../services/postgres');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res, next) {
  try {
    const { email, password, name, age, weight, height, goal, lifestyle } = req.body;
    const pool = getPool();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, name, age, weight, height, goal, lifestyle) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id',
      [email, hashedPassword, name, age, weight, height, goal, lifestyle]
    );
    res.status(201).json({ userId: result.rows[0].id });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const pool = getPool();
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };