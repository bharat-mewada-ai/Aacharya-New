const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Chat with AI
router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required and must be a string' });
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key is missing in environment' });
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const apiError = data?.error?.message || 'Gemini request failed';
      return res.status(response.status).json({ error: apiError });
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text || '')
      .join('')
      .trim();

    if (!reply) {
      return res.status(502).json({ error: 'Gemini returned an empty response' });
    }

    res.json({ reply, model });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
});

module.exports = router;
