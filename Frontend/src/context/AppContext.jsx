// App Context - With Backend Sync
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { appReducer, initialState } from './appReducer';
import { authAPI, usersAPI } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load state from localStorage
  const loadState = () => {
    try {
      const savedState = localStorage.getItem('aacharyaState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed && typeof parsed === 'object') {
          return { 
            ...initialState, 
            ...parsed, 
            user: { ...initialState.user, ...(parsed.user || {}) },
            dailyTracking: { ...initialState.dailyTracking, ...(parsed.dailyTracking || {}) }
          };
        }
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(appReducer, initialState, loadState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('aacharyaState', JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [state]);

  // ── Backend Sync: XP changes ───────────────────────────────────────────────
  const syncXPToBackend = useCallback(async (newXP) => {
    const userId = authAPI.getUserId();
    if (!userId || !authAPI.isLoggedIn()) return;
    try {
      await usersAPI.updateXP(userId, newXP);
    } catch (err) {
      // Silently fail — offline-first approach
      console.warn('[Backend] XP sync failed:', err.message);
    }
  }, []);

  // Sync XP whenever it changes
  useEffect(() => {
    syncXPToBackend(state.xp);
  }, [state.xp, syncXPToBackend]);

  // ── Backend Sync: Streak changes ───────────────────────────────────────────
  const syncStreakToBackend = useCallback(async (newStreak) => {
    const userId = authAPI.getUserId();
    if (!userId || !authAPI.isLoggedIn()) return;
    try {
      await usersAPI.updateStreak(userId, newStreak);
    } catch (err) {
      console.warn('[Backend] Streak sync failed:', err.message);
    }
  }, []);

  useEffect(() => {
    syncStreakToBackend(state.streak);
  }, [state.streak, syncStreakToBackend]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
