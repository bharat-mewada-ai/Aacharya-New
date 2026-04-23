// Streak Hook - STRICT IMPLEMENTATION
import { useApp } from '../context/AppContext';
import { useEffect } from 'react';

export const useStreak = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Update streak on mount
    dispatch({ type: 'UPDATE_STREAK' });
    
    // Check for streak badges
    if (state.streak >= 7) {
      dispatch({ type: 'UNLOCK_BADGE', payload: 'streak-7' });
    }
    if (state.streak >= 30) {
      dispatch({ type: 'UNLOCK_BADGE', payload: 'streak-30' });
    }
  }, []);

  return {
    streak: state.streak,
    lastActiveDate: state.lastActiveDate
  };
};
