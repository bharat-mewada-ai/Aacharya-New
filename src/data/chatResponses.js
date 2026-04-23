// Chat AI Responses - INTELLIGENT & PERSONALIZED

/**
 * Get intelligent chat response based on user context
 * @param {string} message - User message
 * @param {object} userContext - User data (name, goal, streak, xp, etc.)
 * @returns {string} AI response
 */
export const getChatResponse = (message, userContext = {}) => {
  const lowerMessage = message.toLowerCase();
  const { name = 'Champion', goal = 'Stay Fit', streak = 0, xp = 0, rank = 'E' } = userContext;
  
  // Greeting responses (personalized)
  if (lowerMessage.match(/\b(hello|hi|hey|greetings)\b/)) {
    const greetings = [
      `Hey ${name}! 👋 You're on a ${streak}-day streak! How can I help you today?`,
      `Hello ${name}! 🙌 Ready to crush your ${goal} goals?`,
      `Hi there! You've earned ${xp} XP so far. What would you like to work on today?`,
      `Hey ${name}! Your dedication is inspiring. What's on your mind?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Motivation & encouragement
  if (lowerMessage.match(/\b(motivate|motivation|inspire|encourage)\b/)) {
    const motivations = [
      `${name}, you're already ${streak} days in! That's ${streak} days of choosing yourself. Keep going! 💪`,
      `Every rep, every meal, every choice matters. You're building the best version of yourself, ${name}!`,
      `Remember why you started. Your ${goal} goal is within reach. One day at a time! 🔥`,
      `${name}, you're at Rank ${rank} with ${xp} XP. That's progress! Celebrate how far you've come!`,
      `The hardest part is showing up. You're here, you're committed. That's what winners do! 🏆`
    ];
    return motivations[Math.floor(Math.random() * motivations.length)];
  }
  
  // Fitness goal questions
  if (lowerMessage.match(/\b(goal|target|objective)\b/)) {
    const goalResponses = {
      'Weight Loss': `Your goal is Weight Loss! Focus on:\n• Calorie deficit (eat 300-500 cal below maintenance)\n• Cardio 3-4x/week (HIIT, running, cycling)\n• Strength training to preserve muscle\n• Stay hydrated and get 7-9h sleep\n\nYou've got this, ${name}! 🔥`,
      'Muscle Gain': `Your goal is Muscle Gain! Here's your blueprint:\n• Calorie surplus (eat 300-500 cal above maintenance)\n• Progressive overload in strength training\n• 1g protein per lb bodyweight\n• Rest days are crucial for growth\n\nLet's build that strength, ${name}! 💪`,
      'Stay Fit': `Your goal is Stay Fit! Perfect for balance:\n• Mix of cardio and strength training\n• Maintain healthy eating habits\n• Stay active and consistent\n• Focus on overall wellness\n\nKeep up the great work, ${name}! ✨`
    };
    return goalResponses[goal] || `Your current goal is ${goal}. I'm here to help you achieve it!`;
  }
  
  // Weight loss specific
  if (lowerMessage.match(/\b(lose weight|weight loss|fat loss|slim|lean)\b/)) {
    return `For effective weight loss:\n\n🔥 Nutrition (70% of results):\n• Track calories - aim for 300-500 deficit\n• High protein (keeps you full)\n• Lots of veggies and fiber\n• Drink 8+ glasses of water\n\n💪 Exercise (30% of results):\n• Cardio 3-4x/week (HIIT is great!)\n• Strength training 2-3x/week\n• Stay active throughout the day\n\n${streak > 0 ? `You're ${streak} days in - consistency is key!` : 'Start today and build momentum!'} 🎯`;
  }
  
  // Muscle gain specific
  if (lowerMessage.match(/\b(muscle|gain|bulk|build|strength|strong)\b/)) {
    return `Building muscle requires:\n\n💪 Training:\n• Progressive overload (increase weight/reps)\n• Compound exercises (squats, deadlifts, bench)\n• 4-5 workouts per week\n• Focus on form over ego\n\n🍗 Nutrition:\n• Calorie surplus (300-500 above maintenance)\n• 1g protein per lb bodyweight\n• Carbs for energy, fats for hormones\n\n😴 Recovery:\n• 7-9 hours sleep\n• Rest days are when you grow!\n\n${name}, consistency beats intensity. Keep showing up! 🏆`;
  }
  
  // Diet & nutrition
  if (lowerMessage.match(/\b(diet|eat|food|meal|nutrition|calories)\b/)) {
    const dietTips = [
      `Nutrition tips for ${goal}:\n• Track your calories (use an app)\n• Eat whole foods (80% of the time)\n• Protein with every meal\n• Don't skip meals - fuel your body!\n• Treat meals are okay (balance is key)\n\nYou're doing great, ${name}! 🥗`,
      `Smart eating for ${goal}:\n• Breakfast: Protein + complex carbs\n• Lunch: Lean protein + veggies + healthy fats\n• Dinner: Similar to lunch, lighter portions\n• Snacks: Fruits, nuts, Greek yogurt\n\nConsistency > perfection! 🍎`,
      `${name}, here's what works:\n• Meal prep on Sundays\n• Keep healthy snacks handy\n• Drink water before meals\n• Eat slowly and mindfully\n• Don't label foods as "good" or "bad"\n\nYou've got this! 💚`
    ];
    return dietTips[Math.floor(Math.random() * dietTips.length)];
  }
  
  // Workout advice
  if (lowerMessage.match(/\b(workout|exercise|training|gym|fitness)\b/)) {
    return `Workout tips for ${goal}:\n\n🏋️ Strength Training:\n• Compound movements first\n• 3-4 sets of 8-12 reps\n• Rest 60-90 seconds between sets\n• Focus on progressive overload\n\n🏃 Cardio:\n• HIIT for fat loss (20-30 min)\n• Steady state for endurance (30-45 min)\n• Mix it up to avoid boredom\n\n${streak > 0 ? `${streak} days strong! Your consistency is paying off! 🔥` : 'Start today - future you will thank you! 💪'}`;
  }
  
  // Water & hydration
  if (lowerMessage.match(/\b(water|hydration|hydrate|drink)\b/)) {
    return `Hydration is crucial, ${name}! 💧\n\n• Drink 8-10 glasses daily (more if active)\n• Start your day with water\n• Drink before, during, after workouts\n• Carry a water bottle everywhere\n\nBenefits:\n✓ Better performance\n✓ Faster recovery\n✓ Improved fat loss\n✓ More energy\n✓ Clearer skin\n\nStay hydrated! 🌊`;
  }
  
  // Sleep & recovery
  if (lowerMessage.match(/\b(sleep|rest|recovery|tired|fatigue)\b/)) {
    return `Sleep is when magic happens, ${name}! 😴\n\n🌙 Why it matters:\n• Muscle repair and growth\n• Hormone regulation\n• Mental clarity\n• Fat loss optimization\n\n💤 Sleep better:\n• 7-9 hours nightly\n• Consistent sleep schedule\n• Dark, cool room\n• No screens 1h before bed\n• Avoid caffeine after 2pm\n\nRecovery = Results! 🌟`;
  }
  
  // Stress management
  if (lowerMessage.match(/\b(stress|anxiety|overwhelm|pressure)\b/)) {
    return `${name}, stress management is part of fitness! 🧘\n\n🌿 Stress relief:\n• Deep breathing (4-7-8 technique)\n• Light exercise or walks\n• Meditation (even 5 min helps)\n• Talk to someone\n• Journal your thoughts\n\n💡 Remember:\n• Progress > perfection\n• Rest days are productive\n• You're doing better than you think\n\nYou've got this! 💚`;
  }
  
  // Streak & consistency
  if (lowerMessage.match(/\b(streak|consistent|consistency|daily)\b/)) {
    if (streak > 0) {
      return `${name}, your ${streak}-day streak is AMAZING! 🔥\n\n${streak >= 30 ? '30+ days! You\'re a habit master!' : streak >= 14 ? '2 weeks strong! Keep the momentum!' : streak >= 7 ? '1 week down! You\'re building discipline!' : 'Every day counts! Keep going!'}\n\nConsistency compounds:\n• Small actions daily = big results\n• Don't break the chain\n• Progress over perfection\n\nYou're unstoppable! 💪`;
    } else {
      return `Start your streak today, ${name}! 🔥\n\nConsistency is the secret:\n• Show up daily (even 10 min counts)\n• Track your progress\n• Celebrate small wins\n• Don't break the chain\n\nDay 1 or One Day? You decide! 💪`;
    }
  }
  
  // XP & rank
  if (lowerMessage.match(/\b(xp|rank|level|progress)\b/)) {
    return `${name}, you're at Rank ${rank} with ${xp} XP! 🏆\n\n${xp >= 1000 ? 'Incredible progress! You\'re a fitness warrior!' : xp >= 500 ? 'Halfway to the next rank! Keep pushing!' : 'Every mission completed gets you closer!'}\n\n📈 Keep earning XP:\n• Complete daily missions\n• Stay consistent with workouts\n• Track your meals\n• Help others in the community\n\nYour dedication is inspiring! ✨`;
  }
  
  // Missions
  if (lowerMessage.match(/\b(mission|task|challenge|daily)\b/)) {
    return `Missions are your daily fitness quests! 🎯\n\n✓ Complete missions to:\n• Earn XP and rank up\n• Build healthy habits\n• Stay accountable\n• Unlock achievements\n\n💡 Pro tip: Do the hardest mission first thing in the morning!\n\n${streak > 0 ? `You're ${streak} days consistent - keep it up!` : 'Start today and build momentum!'} 🔥`;
  }
  
  // Scanner
  if (lowerMessage.match(/\b(scan|scanner|food|meal)\b/)) {
    return `The Scanner is your nutrition detective! 📸\n\n🍽️ How to use:\n1. Open Scanner page\n2. Point camera at food\n3. Get instant nutrition info\n4. Make informed choices\n\nPerfect for:\n• Tracking calories\n• Learning about foods\n• Making better choices\n• Staying on track with ${goal}\n\nScan smart, eat smart! 🥗`;
  }
  
  // Posture & form
  if (lowerMessage.match(/\b(posture|form|technique|injury)\b/)) {
    return `Proper form prevents injury, ${name}! 💪\n\n✓ Form checklist:\n• Start with lighter weights\n• Control the movement\n• Full range of motion\n• Breathe properly\n• No ego lifting!\n\n🎯 Use the Posture Detection:\n• Real-time feedback\n• Rep counting\n• Form analysis\n\nQuality > quantity always! 🏋️`;
  }
  
  // Feeling down or unmotivated
  if (lowerMessage.match(/\b(sad|down|unmotivated|quit|give up|hard|difficult)\b/)) {
    return `${name}, I hear you. Tough days happen. 💙\n\nBut remember:\n• You've already come ${streak > 0 ? `${streak} days` : 'this far'}\n• Bad days don't erase progress\n• Rest is okay, quitting is not\n• You're stronger than you think\n\n💪 Do this now:\n1. Take 3 deep breaths\n2. Drink some water\n3. Do just 10 minutes of movement\n4. You'll feel better, I promise\n\nYou've got this, champion! 🌟`;
  }
  
  // Gratitude & thanks
  if (lowerMessage.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
    return `You're welcome, ${name}! 🙏\n\nBut the real credit goes to YOU:\n• You show up daily\n• You push through challenges\n• You choose growth\n\nI'm just here to guide. You're doing the work! Keep being awesome! 💪✨`;
  }
  
  // Questions about the app
  if (lowerMessage.match(/\b(how|what|why|when|where|app|aacharya)\b/)) {
    return `I'm Aacharya, your AI fitness mentor! 🤖\n\nI can help with:\n• Fitness goals & planning\n• Workout advice\n• Nutrition tips\n• Motivation & support\n• Tracking progress\n• Building habits\n\nAsk me anything about:\n✓ ${goal} strategies\n✓ Exercise techniques\n✓ Meal planning\n✓ Staying consistent\n\nWhat would you like to know, ${name}? 💬`;
  }
  
  // Default intelligent response
  const defaultResponses = [
    `That's interesting, ${name}! While I specialize in fitness and habits, I'm always learning. Try asking about workouts, nutrition, or your ${goal} goal! 💪`,
    `Great question! I'm best at helping with fitness, nutrition, and building healthy habits. What aspect of your ${goal} journey can I help with? 🎯`,
    `${name}, I'm here to support your fitness journey! Ask me about:\n• Workout tips\n• Nutrition advice\n• ${goal} strategies\n• Staying motivated\n\nWhat's on your mind? 💬`,
    `I'm still learning about that! But I'm an expert in fitness and habits. How can I help you with your ${goal} goal today? 🔥`
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Legacy function for backward compatibility
export const chatKeywords = {
  default: [
    "I'm here to guide your fitness journey. Ask me about goals, workouts, nutrition, or missions!",
    "Interesting question! I specialize in fitness and habits. Try asking about your goal, workout tips, or daily missions."
  ]
};
