const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Chat with AI
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required and must be a string' });
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.OPENAI_API_KEY;
    
    if (!apiKey || apiKey === 'your_openai_api_key') {
      return res.status(500).json({ error: 'AI API key is missing or invalid in environment' });
    }

    // Using gemini-3-flash-preview which is available for this key in the 2026 context
    const model = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
    
    const systemInstruction = `You are Aacharya, a wise and motivating AI wellness mentor. 
Your goal is to help users build healthy habits, stay fit, and maintain a positive mindset. 
Keep your responses concise, encouraging, and actionable.

CONTEXT HANDLING:
The user message starts with [Context - ...]. Use this to personalize your advice.
If the user has a health condition, be cautious and suggest modifications if needed.

ACTION COMMANDS:
1. To change the user's fitness goal, include: [ACTION:CHANGE_GOAL:<goal_id>]
   Options: 'weight-loss', 'muscle-gain', or 'stay-fit'.
2. To assign a new specific mission, include: [ACTION:UPDATE_MISSION:<mission_title>]
   Example: [ACTION:UPDATE_MISSION:15-min Morning Yoga]

Use these commands ONLY when the user explicitly asks to change their goal or wants a new mission.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Message with Context:\n${message}` }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('[Gemini API Error]:', JSON.stringify(data, null, 2));
      const apiError = data?.error?.message || 'Gemini request failed';
      return res.status(response.status).json({ error: apiError });
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text || '')
      .join('')
      .trim();

    if (!reply) {
      console.error('[Gemini Empty Response]:', JSON.stringify(data, null, 2));
      return res.status(502).json({ error: 'Gemini returned an empty response' });
    }

    res.json({ reply, model });
  } catch (err) {
    console.error('[Chat Route Error]:', err);
    res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
});


module.exports = router;
