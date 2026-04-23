// Scanner Hook - STRICT IMPLEMENTATION
import { useApp } from '../context/AppContext';

export const useScanner = () => {
  const { state, dispatch } = useApp();

  const mockScanResults = [
    {
      name: 'Grilled Chicken Breast',
      category: 'Protein',
      goal: 'Great for all goals',
      benefits: 'High protein, low fat, supports muscle growth and recovery',
      usage: 'Pair with vegetables and complex carbs',
      xp: 20
    },
    {
      name: 'Oatmeal',
      category: 'Carbs',
      goal: 'Best for Muscle Gain & Stay Fit',
      benefits: 'Slow-release energy, fiber-rich, supports sustained workouts',
      usage: 'Eat pre-workout or breakfast',
      xp: 20
    },
    {
      name: 'Greek Yogurt',
      category: 'Protein',
      goal: 'Great for all goals',
      benefits: 'High protein, probiotics, supports digestion and muscle recovery',
      usage: 'Post-workout snack or breakfast',
      xp: 25
    },
    {
      name: 'Broccoli',
      category: 'Vegetable',
      goal: 'Best for Weight Loss',
      benefits: 'Low calorie, high fiber, vitamins, and minerals',
      usage: 'Steam or roast as a side dish',
      xp: 20
    },
    {
      name: 'Salmon',
      category: 'Protein',
      goal: 'Great for all goals',
      benefits: 'Omega-3 fatty acids, high protein, anti-inflammatory',
      usage: 'Grill or bake, eat 2-3 times per week',
      xp: 20
    },
    {
      name: 'Sweet Potato',
      category: 'Carbs',
      goal: 'Best for Muscle Gain',
      benefits: 'Complex carbs, vitamins, sustained energy for workouts',
      usage: 'Pre-workout meal or post-workout recovery',
      xp: 15
    }
  ];

  const performScan = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
        const scanResult = {
          ...result,
          id: Date.now(),
          timestamp: new Date().toISOString()
        };
        
        dispatch({ type: 'ADD_SCAN_RESULT', payload: scanResult });
        dispatch({ type: 'ADD_XP', payload: result.xp });
        
        // Check for scanner badge
        if (state.stats.totalScans + 1 >= 10) {
          dispatch({ type: 'UNLOCK_BADGE', payload: 'scanner-10' });
        }
        
        resolve(scanResult);
      }, 2000);
    });
  };

  return {
    scanHistory: state.scanHistory,
    performScan
  };
};
