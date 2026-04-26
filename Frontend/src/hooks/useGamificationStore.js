import { create } from 'zustand';
import { getRankFromXP, getNextRank } from '../data/gamificationData';

export const useGamificationStore = create((set, get) => ({
  // Core State
  totalXP: 0,
  rank: getRankFromXP(0),
  level: 1,
  stats: {
    calories: 0,
    waterIntake: 0,
    tasksCompleted: 0
  },

  // Animation & UI State
  currentAnimation: 'IDLE', // IDLE, WALK, COMBAT, POWER_UP, VICTORY
  showRankUp: false,
  previousRankId: 'E',

  // Actions
  addXP: (amount) => {
    const currentXP = get().totalXP;
    const newXP = currentXP + amount;
    const newRank = getRankFromXP(newXP);
    const oldRank = get().rank;

    const rankUp = newRank.id !== oldRank.id;

    set((state) => ({
      totalXP: newXP,
      rank: newRank,
      level: Math.floor(newXP / 100) + 1, // Simple level logic
      stats: {
        calories: Math.floor(newXP * 0.5),
        waterIntake: Math.floor(newXP / 100),
        tasksCompleted: Math.floor(newXP / 50),
      },
      showRankUp: rankUp || state.showRankUp,
      previousRankId: rankUp ? oldRank.id : state.previousRankId,
    }));
  },

  setAnimation: (anim) => set({ currentAnimation: anim }),
  
  closeRankUp: () => set({ showRankUp: false }),
  
  resetXP: () => set({
    totalXP: 0,
    rank: getRankFromXP(0),
    level: 1,
    stats: {
      calories: 0,
      waterIntake: 0,
      tasksCompleted: 0
    },
    showRankUp: false
  }),

}));
