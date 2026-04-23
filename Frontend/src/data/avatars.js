// Avatar System Data - STRICT IMPLEMENTATION

export const avatarParts = {
  skin: [
    { id: 'skin-1', name: 'Light', color: '#ffd5b5', unlocked: true },
    { id: 'skin-2', name: 'Medium', color: '#d4a574', unlocked: true },
    { id: 'skin-3', name: 'Tan', color: '#c68642', unlocked: true },
    { id: 'skin-4', name: 'Deep', color: '#8d5524', unlocked: true }
  ],
  hair: [
    { id: 'hair-1', name: 'Short', style: 'short', unlocked: true },
    { id: 'hair-2', name: 'Long', style: 'long', unlocked: true },
    { id: 'hair-3', name: 'Bun', style: 'bun', unlocked: false, requiredRank: 'C' },
    { id: 'hair-4', name: 'Braided', style: 'braided', unlocked: false, requiredRank: 'B' }
  ],
  outfit: [
    { id: 'outfit-1', name: 'Casual', style: 'casual', unlocked: true },
    { id: 'outfit-2', name: 'Traditional', style: 'traditional', unlocked: false, requiredRank: 'D' },
    { id: 'outfit-3', name: 'Yoga', style: 'yoga', unlocked: false, requiredRank: 'C' },
    { id: 'outfit-4', name: 'Sage Robes', style: 'sage', unlocked: false, requiredRank: 'A' }
  ],
  accessory: [
    { id: 'acc-1', name: 'None', style: 'none', unlocked: true },
    { id: 'acc-2', name: 'Glasses', style: 'glasses', unlocked: true },
    { id: 'acc-3', name: 'Headband', style: 'headband', unlocked: false, requiredRank: 'D' },
    { id: 'acc-4', name: 'Crown', style: 'crown', unlocked: false, requiredRank: 'S' }
  ]
};

export const defaultAvatar = {
  skin: 'skin-1',
  hair: 'hair-1',
  outfit: 'outfit-1',
  accessory: 'acc-1'
};
