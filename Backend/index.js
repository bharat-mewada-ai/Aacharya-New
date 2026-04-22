// Main entry point for the backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorHandler');
const { connectPostgres } = require('./services/postgres');
const { connectRedis } = require('./services/redis');

const app = express();
app.use(cors());
app.use(express.json());

// Rate Limiter
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/missions', require('./routes/missions'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/scanner', require('./routes/scanner'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to DBs and start server
(async () => {
  await connectPostgres();
  await connectRedis();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
