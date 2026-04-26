const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function chatWithAI(req, res, next) {
  try {
    const { message } = req.body;
    const lowerMessage = message.toLowerCase();

    // 1. Check for specific Action Triggers first (Quick Response)
    if (lowerMessage.includes('doctor') || lowerMessage.includes('clinic') || lowerMessage.includes('hospital')) {
      return res.json({ 
        reply: "Finding the right medical care is important. I'm opening the Nearby Care section for you to see facilities in your area. [ACTION:NAVIGATE:/care]" 
      });
    }

    if (lowerMessage.includes('diet') || lowerMessage.includes('food plan') || lowerMessage.includes('nutrition')) {
      return res.json({ 
        reply: "Planning your nutrition is 70% of the battle! I'm taking you to the Diet Planner where you can build your custom plate and track macros. [ACTION:NAVIGATE:/nutrition]" 
      });
    }

    // 2. Fallback to Real Gemini AI if available
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key') {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const systemPrompt = `You are Aacharya, an AI Fitness & Habit Mentor. 
        You help users with workouts, nutrition, and mental health. 
        Keep your responses concise, motivating, and helpful. 
        If a user asks to change their goal, respond with "[ACTION:CHANGE_GOAL:id]" where id is weight-loss, muscle-gain, or stay-fit.
        Current user message:`;

        const result = await model.generateContent(systemPrompt + message);
        const response = await result.response;
        return res.json({ reply: response.text() });
      } catch (aiError) {
        console.error("Gemini API Error:", aiError.message);
        // Fallback to basic responses if API fails
      }
    }

    // 3. Final Fallback (Mock Logic)
    let reply = "I'm your AI mentor. I can help you with your fitness journey!";
    if (lowerMessage.includes('weight loss')) {
      reply = "Got it! I've updated your goal to Weight Loss. [ACTION:CHANGE_GOAL:weight-loss]";
    } else if (lowerMessage.includes('muscle gain')) {
      reply = "Excellent! I've set your goal to Muscle Gain. [ACTION:CHANGE_GOAL:muscle-gain]";
    } else {
      reply = "I'm Aacharya, your AI mentor. You can ask me about goals, missions, or health tips!";
    }

    res.json({ reply });
  } catch (err) {
    next(err);
  }
}

module.exports = { chatWithAI };