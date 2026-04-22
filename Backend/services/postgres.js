const { Pool } = require('pg');

let pool;

async function connectPostgres() {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
  });
  try {
    await pool.query('SELECT NOW()');
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('PostgreSQL connection error:', err);
    process.exit(1);
  }
}

function getPool() {
  if (!pool) throw new Error('Postgres not connected');
  return pool;
}

module.exports = { connectPostgres, getPool };