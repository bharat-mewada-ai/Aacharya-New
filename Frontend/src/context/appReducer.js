// App Reducer - STRICT IMPLEMENTATION
import { missions as initialMissions } from '../data/missions';
import { badges as initialBadges } from '../data/badges';
import { ranks, getRankByXP } from '../data/ranks';
import { defaultAvatar } from '../data/avatars';

export const initialState = {
  // User Profile
  user: {
    name: '',
    goal: null,
    avatar: defaultAvatar,
    onboardingComplete: false,
    setupComplete: false
  },
  
  // Progress
  xp: 0,
  rank: ranks[0],
  streak: 0,
  lastActiveDate: null,
  
  // Missions
  missions: initialMissions,
  
  // Badges
  badges: initialBadges,
  
  // Chat
  chatHistory: [],
  
  // Scanner
  scanHistory: [],
  
  // Stats
  stats: {
    totalMissionsCompleted: 0,
    totalScans: 0,
    totalChatMessages: 0,
    joinDate: new Date().toISOString()
  },
  
  // UI State
  showRankUpCinematic: false,
  showConfetti: false
};

export const appReducer = (state, action) => {
  switch (action.type) {
    // User Actions
    case 'SET_USER_NAME':
      return {
        ...state,
        user: { ...state.user, name: action.payload }
      };
    
    case 'SET_USER_GOAL':
      return {
        ...state,
        user: { ...state.user, goal: action.payload }
      };
    
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        user: { ...state.user, onboardingComplete: true }
      };
    
    case 'COMPLETE_SETUP':
      return {
        ...state,
        user: { ...state.user, setupComplete: true }
      };
    
    case 'UPDATE_AVATAR':
      return {
        ...state,
        user: { ...state.user, avatar: { ...state.user.avatar, ...action.payload } }
      };

    case 'UPDATE_USER_BIO':
      return {
        ...state,
        user: { ...state.user, bio: action.payload }
      };
    
    // XP and Rank Actions
    case 'ADD_XP': {
      const newXP = state.xp + action.payload;
      const newRank = getRankByXP(newXP);
      const rankChanged = newRank.id !== state.rank.id;
      
      return {
        ...state,
        xp: newXP,
        rank: newRank,
        showRankUpCinematic: rankChanged
      };
    }
    
    case 'HIDE_RANK_UP_CINEMATIC':
      return {
        ...state,
        showRankUpCinematic: false
      };
    
    // Mission Actions
    case 'COMPLETE_MISSION': {
      const updatedMissions = state.missions.map(mission =>
        mission.id === action.payload
          ? { ...mission, completed: true }
          : mission
      );
      
      const completedMission = state.missions.find(m => m.id === action.payload);
      const allDailyComplete = updatedMissions
        .filter(m => m.type === 'daily')
        .every(m => m.completed);
      
      return {
        ...state,
        missions: updatedMissions,
        stats: {
          ...state.stats,
          totalMissionsCompleted: state.stats.totalMissionsCompleted + 1
        },
        showConfetti: allDailyComplete
      };
    }
    
    case 'RESET_DAILY_MISSIONS':
      return {
        ...state,
        missions: state.missions.map(mission =>
          mission.type === 'daily'
            ? { ...mission, completed: false }
            : mission
        )
      };
    
    case 'HIDE_CONFETTI':
      return {
        ...state,
        showConfetti: false
      };
    
    // Streak Actions
    case 'UPDATE_STREAK': {
      const today = new Date().toDateString();
      const lastActive = state.lastActiveDate ? new Date(state.lastActiveDate).toDateString() : null;
      
      let newStreak = state.streak;
      
      if (lastActive === today) {
        // Same day, no change
        newStreak = state.streak;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastActive === yesterdayStr) {
          // Consecutive day
          newStreak = state.streak + 1;
        } else {
          // Streak broken
          newStreak = 1;
        }
      }
      
      return {
        ...state,
        streak: newStreak,
        lastActiveDate: new Date().toISOString()
      };
    }
    
    // Badge Actions
    case 'UNLOCK_BADGE':
      return {
        ...state,
        badges: state.badges.map(badge =>
          badge.id === action.payload
            ? { ...badge, unlocked: true }
            : badge
        )
      };
    
    // Chat Actions
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload],
        stats: {
          ...state.stats,
          totalChatMessages: state.stats.totalChatMessages + 1
        }
      };
    
    case 'CLEAR_CHAT_HISTORY':
      return {
        ...state,
        chatHistory: []
      };
    
    // Scanner Actions
    case 'ADD_SCAN_RESULT':
      return {
        ...state,
        scanHistory: [action.payload, ...state.scanHistory],
        stats: {
          ...state.stats,
          totalScans: state.stats.totalScans + 1
        }
      };
    
    // Reset
    case 'RESET_APP':
      return initialState;
    
    default:
      return state;
  }
};
