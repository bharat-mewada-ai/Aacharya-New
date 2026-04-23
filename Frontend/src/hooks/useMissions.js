// Missions Hook - STRICT IMPLEMENTATION
import { useApp } from '../context/AppContext';

export const useMissions = () => {
  const { state, dispatch } = useApp();

  const completeMission = (missionId) => {
    const mission = state.missions.find(m => m.id === missionId);
    if (mission && !mission.completed) {
      dispatch({ type: 'COMPLETE_MISSION', payload: missionId });
      dispatch({ type: 'ADD_XP', payload: mission.xp });
      
      // Check for badge unlocks
      checkBadgeUnlocks();
    }
  };

  const resetDailyMissions = () => {
    dispatch({ type: 'RESET_DAILY_MISSIONS' });
  };

  const hideConfetti = () => {
    dispatch({ type: 'HIDE_CONFETTI' });
  };

  const checkBadgeUnlocks = () => {
    const completedCount = state.missions.filter(m => m.completed).length;
    
    // First mission badge
    if (completedCount === 1) {
      dispatch({ type: 'UNLOCK_BADGE', payload: 'first-mission' });
    }
    
    // All daily missions badge
    const allDailyComplete = state.missions
      .filter(m => m.type === 'daily')
      .every(m => m.completed);
    
    if (allDailyComplete) {
      dispatch({ type: 'UNLOCK_BADGE', payload: 'all-daily' });
    }
  };

  const getDailyMissions = () => state.missions.filter(m => m.type === 'daily');
  const getWeeklyMissions = () => state.missions.filter(m => m.type === 'weekly');
  const getChallengeMissions = () => state.missions.filter(m => m.type === 'challenge');

  return {
    missions: state.missions,
    showConfetti: state.showConfetti,
    completeMission,
    resetDailyMissions,
    hideConfetti,
    getDailyMissions,
    getWeeklyMissions,
    getChallengeMissions
  };
};
