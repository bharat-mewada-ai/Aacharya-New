const redis = require('redis');

let client;

async function connectRedis() {
  client = redis.createClient({
    url: process.env.REDIS_URI,
  });
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();
  console.log('Redis connected');
}

function getClient() {
  if (!client) throw new Error('Redis not connected');
  return client;
}

module.exports = { connectRedis, getClient };