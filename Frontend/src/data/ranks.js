// Rank System Data - STRICT IMPLEMENTATION

export const ranks = [
  {
    id: 'E',
    name: 'Explorer',
    minXP: 0,
    maxXP: 499,
    color: '#71717a',
    icon: '🌱'
  },
  {
    id: 'D',
    name: 'Disciple',
    minXP: 500,
    maxXP: 1499,
    color: '#10b981',
    icon: '🌿'
  },
  {
    id: 'C',
    name: 'Cultivator',
    minXP: 1500,
    maxXP: 2999,
    color: '#06b6d4',
    icon: '🌸'
  },
  {
    id: 'B',
    name: 'Balanced',
    minXP: 3000,
    maxXP: 4999,
    color: '#a855f7',
    icon: '⚖️'
  },
  {
    id: 'A',
    name: 'Adept',
    minXP: 5000,
    maxXP: 7499,
    color: '#ec4899',
    icon: '✨'
  },
  {
    id: 'S',
    name: 'Sage',
    minXP: 7500,
    maxXP: Infinity,
    color: '#fbbf24',
    icon: '🏆'
  }
];

export const getRankByXP = (xp) => {
  return ranks.find(rank => xp >= rank.minXP && xp <= rank.maxXP) || ranks[0];
};

export const getNextRank = (currentRank) => {
  const currentIndex = ranks.findIndex(r => r.id === currentRank.id);
  return ranks[currentIndex + 1] || null;
};

export const getProgressToNextRank = (xp, currentRank) => {
  const nextRank = getNextRank(currentRank);
  if (!nextRank) return 100;
  
  const progress = ((xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100;
  return Math.min(Math.max(progress, 0), 100);
};
