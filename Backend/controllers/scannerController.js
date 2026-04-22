async function scanWorkout(req, res, next) {
  try {
    // Call Vision API here
    res.json({ result: 'Scan result (stub)' });
  } catch (err) {
    next(err);
  }
}

module.exports = { scanWorkout };