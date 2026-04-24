async function chatWithAI(req, res, next) {
  try {
    const { message } = req.body;
    const lowerMessage = message.toLowerCase();
    
    let reply = "I'm your AI mentor. I can help you with your fitness journey!";

    // Simple keyword-based logic to simulate AI intelligence
    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
      reply = "Got it! I've updated your goal to Weight Loss. Let's focus on cardio and a calorie deficit. [ACTION:CHANGE_GOAL:weight-loss]";
    } else if (lowerMessage.includes('muscle gain') || lowerMessage.includes('build muscle')) {
      reply = "Excellent choice! I've set your goal to Muscle Gain. We'll focus on strength training and high protein intake. [ACTION:CHANGE_GOAL:muscle-gain]";
    } else if (lowerMessage.includes('stay fit') || lowerMessage.includes('maintain fit')) {
      reply = "Great! Consistency is key. I've updated your goal to Stay Fit. [ACTION:CHANGE_GOAL:stay-fit]";
    } else if (lowerMessage.includes('change mission') || lowerMessage.includes('new mission')) {
      reply = "Sure! I've assigned you a new mission: 'Intense 15-min HIIT'. Check your mission list! [ACTION:UPDATE_MISSION:Intense 15-min HIIT]";
    } else if (lowerMessage.includes('health condition') || lowerMessage.includes('condition')) {
      if (lowerMessage.includes('health: no known conditions')) {
        reply = "It's great that you're in good health! We can push a bit harder with your training.";
      } else {
        reply = "I see you have a health condition. I'll make sure to suggest exercises that are safe for you. Always listen to your body!";
      }
    } else {
      reply = "I'm Aacharya, your AI mentor. You can ask me to change your goal or assign you a new mission!";
    }

    res.json({ reply });
  } catch (err) {
    next(err);
  }
}

module.exports = { chatWithAI };