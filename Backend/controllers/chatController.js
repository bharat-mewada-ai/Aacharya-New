async function chatWithAI(req, res, next) {
  try {
    // Call OpenAI API here
    res.json({ reply: 'AI reply (stub)' });
  } catch (err) {
    next(err);
  }
}

module.exports = { chatWithAI };