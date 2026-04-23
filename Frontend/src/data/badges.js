// Badge System Data - STRICT IMPLEMENTATION

export const badges = [
  {
    id: 'first-mission',
    name: 'First Steps',
    description: 'Complete your first mission',
    icon: '🎯',
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'streak-30',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '💎',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'all-daily',
    name: 'Daily Devotee',
    description: 'Complete all daily missions in one day',
    icon: '⭐',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'rank-c',
    name: 'Cultivator',
    description: 'Reach Rank C',
    icon: '🌸',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'rank-a',
    name: 'Adept',
    description: 'Reach Rank A',
    icon: '✨',
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'rank-s',
    name: 'Sage',
    description: 'Reach Rank S',
    icon: '🏆',
    unlocked: false,
    rarity: 'legendary'
  },
  {
    id: 'scanner-10',
    name: 'Scanner Pro',
    description: 'Scan 10 items',
    icon: '📸',
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'chat-50',
    name: 'Conversationalist',
    description: 'Send 50 messages to Aacharya',
    icon: '💬',
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'wellness-master',
    name: 'Wellness Master',
    description: 'Complete 100 wellness missions',
    icon: '🧘',
    unlocked: false,
    rarity: 'epic'
  }
];

export const getBadgesByRarity = (rarity) => {
  return badges.filter(b => b.rarity === rarity);
};

export const getUnlockedBadges = () => {
  return badges.filter(b => b.unlocked);
};
