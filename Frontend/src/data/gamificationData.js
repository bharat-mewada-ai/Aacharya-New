// Gamification Data - Rank System & Rewards
export const RANK_SYSTEM = [
  { id: 'E', name: 'Novice', level: 1, minXP: 0, auraColor: '#22c55e', auraType: 'green-mist', quote: "The journey of a thousand miles begins with a single step." },
  { id: 'D', name: 'Apprentice', level: 10, minXP: 100, auraColor: '#14b8a6', auraType: 'teal-leaf', quote: "Small wins lead to big changes. Keep going!" },
  { id: 'C', name: 'Adept', level: 20, minXP: 500, auraColor: '#3b82f6', auraType: 'blue-electric', quote: "Your potential is starting to overflow." },
  { id: 'B', name: 'Expert', level: 30, minXP: 1500, auraColor: '#a855f7', auraType: 'purple-energy', quote: "Mastery is within your reach." },
  { id: 'A', name: 'Master', level: 40, minXP: 4000, auraColor: '#9333ea', auraType: 'purple-fire', quote: "A true master never stops learning." },
  { id: 'S', name: 'Elite', level: 50, minXP: 10000, auraColor: '#f97316', auraType: 'orange-fire', quote: "You have ascended beyond the ordinary." },
  { id: 'SS', name: 'Legend', level: 60, minXP: 25000, auraColor: '#ef4444', auraType: 'red-inferno', quote: "Legends are told of your dedication." },
  { id: 'SSS', name: 'Mythic', level: 70, minXP: 50000, auraColor: '#ffffff', auraType: 'white-divine', quote: "A mythic presence in the realm of health." },
  { id: '∞', name: 'Transcendent', level: 80, minXP: 100000, auraColor: '#fbbf24', auraType: 'gold-rays', quote: "You have reached the pinnacle of existence." },
];

export const getRankFromXP = (xp) => {
  for (let i = RANK_SYSTEM.length - 1; i >= 0; i--) {
    if (xp >= RANK_SYSTEM[i].minXP) {
      return { ...RANK_SYSTEM[i], index: i };
    }
  }
  return { ...RANK_SYSTEM[0], index: 0 };
};

export const getNextRank = (currentRankIndex) => {
  if (currentRankIndex < RANK_SYSTEM.length - 1) {
    return RANK_SYSTEM[currentRankIndex + 1];
  }
  return null;
};

export const XP_SOURCES = {
  WORKOUT: 50,
  NUTRITION: 30,
  HYDRATION: 20,
  SLEEP: 40,
  MINDFULNESS: 25,
  STREAK_7DAY: 200,
  CHALLENGE_MONTHLY: 500,
};
