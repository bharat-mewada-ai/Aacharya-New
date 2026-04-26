// App Reducer - STRICT IMPLEMENTATION
import { missions as initialMissions, generateMissionsForGoal } from '../data/missions';
import { badges as initialBadges } from '../data/badges';
import { ranks, getRankByXP } from '../data/ranks';
import { defaultAvatar } from '../data/avatars';

export const initialState = {
  // User Profile
  user: {
    name: '',
    age: '',
    weight: '',
    goal: null,
    avatar: defaultAvatar,
    healthCondition: false,
    healthConditionDetails: '',
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
  
  // Daily Tracking (Dynamic)
  dailyTracking: {
    date: new Date().toDateString(),
    calories: 0,
    steps: 0,
    speed: 0,
    water: 0
  },
  
  // UI State
  showRankUpCinematic: false,
  showConfetti: false,
  showShop: false
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOP':
      return { ...state, showShop: !state.showShop };

    // User Actions
    case 'SET_USER_NAME':
      return {
        ...state,
        user: { ...state.user, name: action.payload }
      };

    case 'SET_USER_AGE':
      return {
        ...state,
        user: { ...state.user, age: action.payload }
      };

    case 'SET_USER_WEIGHT':
      return {
        ...state,
        user: { ...state.user, weight: action.payload }
      };

    case 'SET_HEALTH_CONDITION':
      return {
        ...state,
        user: { 
          ...state.user, 
          healthCondition: action.payload.hasCondition,
          healthConditionDetails: action.payload.details || ''
        }
      };
    
    case 'SET_USER_GOAL': {
      const newBaseMissions = generateMissionsForGoal(action.payload.id);
      
      // Preserve custom missions (which have purely numeric IDs like Date.now())
      const customMissions = state.missions.filter(m => typeof m.id === 'number' || !isNaN(m.id));
      
      // Merge base missions, keeping completion status if they existed before
      const mergedMissions = newBaseMissions.map(newM => {
        const existing = state.missions.find(old => old.id === newM.id);
        return existing ? { ...newM, completed: existing.completed } : newM;
      });

      return {
        ...state,
        user: { ...state.user, goal: action.payload },
        missions: [...customMissions, ...mergedMissions]
      };
    }
    
    // Tracking Actions
    case 'LOG_CALORIES':
      return { ...state, dailyTracking: { ...state.dailyTracking, calories: state.dailyTracking.calories + action.payload } };
    case 'LOG_STEPS':
      return { ...state, dailyTracking: { ...state.dailyTracking, steps: state.dailyTracking.steps + action.payload.steps, speed: action.payload.speed } };
    case 'LOG_WATER':
      return { ...state, dailyTracking: { ...state.dailyTracking, water: state.dailyTracking.water + action.payload } };
    
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
      
    case 'ADD_MISSION':
      return {
        ...state,
        missions: [action.payload, ...state.missions]
      };
      
    case 'REMOVE_MISSION':
      return {
        ...state,
        missions: state.missions.filter(m => m.id !== action.payload)
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
      
      let updatedMissions = state.missions;
      if (newStreak >= 7) {
        updatedMissions = updatedMissions.map(m => 
          (m.type === 'challenge' && m.id === 'challenge-1') ? { ...m, completed: true } : m
        );
      }
      
      return {
        ...state,
        streak: newStreak,
        missions: updatedMissions,
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
