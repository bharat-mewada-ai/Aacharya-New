// Mission Data - STRICT IMPLEMENTATION

export const missions = [
  {
    id: 'daily-1',
    title: 'Morning Workout',
    description: 'Complete 30 minutes of exercise',
    xp: 50,
    type: 'daily',
    category: 'fitness',
    icon: '💪',
    completed: false
  },
  {
    id: 'daily-2',
    title: 'Hydration Check',
    description: 'Drink 8 glasses of water today',
    xp: 30,
    type: 'daily',
    category: 'health',
    icon: '💧',
    completed: false
  },
  {
    id: 'daily-3',
    title: 'Healthy Meal',
    description: 'Log one balanced, nutritious meal',
    xp: 40,
    type: 'daily',
    category: 'nutrition',
    icon: '🍽️',
    completed: false
  },
  {
    id: 'daily-4',
    title: 'Cardio Session',
    description: 'Complete 20 minutes of cardio',
    xp: 60,
    type: 'daily',
    category: 'fitness',
    icon: '🏃',
    completed: false
  },
  {
    id: 'daily-5',
    title: 'Sleep Tracker',
    description: 'Log your sleep hours (7-9 hours)',
    xp: 35,
    type: 'daily',
    category: 'health',
    icon: '😴',
    completed: false
  },
  {
    id: 'weekly-1',
    title: 'Strength Training',
    description: 'Complete 3 strength training sessions',
    xp: 100,
    type: 'weekly',
    category: 'fitness',
    icon: '🏋️',
    completed: false
  },
  {
    id: 'weekly-2',
    title: 'Meal Prep',
    description: 'Prepare healthy meals for the week',
    xp: 80,
    type: 'weekly',
    category: 'nutrition',
    icon: '🥗',
    completed: false
  },
  {
    id: 'challenge-1',
    title: '7-Day Streak',
    description: 'Complete all daily missions for 7 days',
    xp: 500,
    type: 'challenge',
    category: 'streak',
    icon: '🔥',
    completed: false
  }
];

export const getMissionsByType = (type) => {
  return missions.filter(m => m.type === type);
};

export const getCompletedMissions = () => {
  return missions.filter(m => m.completed);
};

export const getTotalXP = () => {
  return missions.reduce((total, m) => m.completed ? total + m.xp : total, 0);
};

export const generateMissionsForGoal = (goalId) => {
  // Keep base missions (hydration, sleep) but swap out fitness/nutrition based on goal
  const baseMissions = missions.filter(m => m.category === 'health' || m.type !== 'daily');
  
  let specificMissions = [];
  
  if (goalId === 'weight-loss') {
    specificMissions = [
      { id: 'daily-1', title: 'Fat Burn Cardio', description: '45 mins of high intensity cardio', xp: 60, type: 'daily', category: 'fitness', icon: '🏃', completed: false },
      { id: 'daily-3', title: 'Calorie Deficit', description: 'Stay under your calorie limit today', xp: 50, type: 'daily', category: 'nutrition', icon: '🥗', completed: false }
    ];
  } else if (goalId === 'muscle-gain') {
    specificMissions = [
      { id: 'daily-1', title: 'Heavy Lifting', description: 'Complete a progressive overload session', xp: 70, type: 'daily', category: 'fitness', icon: '🏋️', completed: false },
      { id: 'daily-3', title: 'Protein Target', description: 'Hit your daily protein macro goal', xp: 50, type: 'daily', category: 'nutrition', icon: '💪', completed: false }
    ];
  } else {
    // stay-fit
    specificMissions = [
      { id: 'daily-1', title: 'Active 30', description: '30 minutes of any physical activity', xp: 40, type: 'daily', category: 'fitness', icon: '🚶', completed: false },
      { id: 'daily-3', title: 'Balanced Meal', description: 'Eat at least 3 servings of veggies', xp: 40, type: 'daily', category: 'nutrition', icon: '🥦', completed: false }
    ];
  }
  
  return [...specificMissions, ...baseMissions];
};
