export const SHOP_PRODUCTS = [
  { id:1, name:'Whey Protein Pro', brand:'NutriForce', emoji:'🥛', price:2499, originalPrice:3299, discount:24, category:'Supplements', rating:4.7, reviews:1284, color:'#a855f7', badge:'🔥 Best Seller', sponsored:false, description:'25g protein per serving. Chocolate, vanilla & strawberry.' },
  { id:2, name:'Resistance Band Set', brand:'FitPeak', emoji:'🏋️', price:799, originalPrice:1299, discount:38, category:'Equipment', rating:4.5, reviews:892, color:'#06b6d4', badge:'✨ Sponsored', sponsored:true, description:'5 resistance levels. Perfect for home workouts.' },
  { id:3, name:'Vitamin D3 + K2', brand:'VitaCore', emoji:'☀️', price:649, originalPrice:899, discount:28, category:'Vitamins', rating:4.8, reviews:2156, color:'#fbbf24', badge:'⭐ Top Rated', sponsored:false, description:'2000 IU D3 + 100mcg K2. 90-day supply.' },
  { id:4, name:'Smart Water Bottle', brand:'HydroTech', emoji:'💧', price:1199, originalPrice:1799, discount:33, category:'Accessories', rating:4.6, reviews:543, color:'#10b981', badge:'🆕 New', sponsored:true, description:'Tracks daily intake. LED hydration reminders.' },
  { id:5, name:'Omega-3 Fish Oil', brand:'PureHealth', emoji:'🐟', price:549, originalPrice:799, discount:31, category:'Vitamins', rating:4.9, reviews:3401, color:'#f97316', badge:'💎 Premium', sponsored:false, description:'1000mg EPA+DHA. Ultra-purified, no fishy aftertaste.' },
  { id:6, name:'Yoga Mat Pro', brand:'ZenFlex', emoji:'🧘', price:1499, originalPrice:2199, discount:32, category:'Equipment', rating:4.4, reviews:718, color:'#ec4899', badge:'✨ Sponsored', sponsored:true, description:'6mm non-slip surface. Eco-friendly TPE foam.' },
];

export const SHOP_CATS = ['All','Supplements','Vitamins','Equipment','Accessories'];

export const PREMIUM_PLANS = [
  { id:'monthly', name:'Monthly', price:299, period:'/month', color:'#a855f7', popular:false, features:['AI Nutrition Coach (unlimited)','Advanced body analytics','Custom workout plans','Ad-free experience','Priority support'] },
  { id:'yearly', name:'Yearly', price:1999, period:'/year', savings:'Save ₹1,589', color:'#fbbf24', popular:true, features:['Everything in Monthly','1-on-1 dietitian session','Blood test analysis','Exclusive rank badges','Beta feature access','Family sharing (up to 3)'] },
];

export const PRESET_AVATARS = [
  { id: 'av1',  emoji: '🧑‍💪', label: 'Warrior',    bg: 'linear-gradient(135deg,#a855f7,#6366f1)' },
  { id: 'av2',  emoji: '🧘‍♀️', label: 'Zen',        bg: 'linear-gradient(135deg,#06b6d4,#0ea5e9)' },
  { id: 'av3',  emoji: '🏃‍♂️', label: 'Runner',     bg: 'linear-gradient(135deg,#10b981,#059669)' },
  { id: 'av4',  emoji: '🧑‍🍳', label: 'Chef',       bg: 'linear-gradient(135deg,#f59e0b,#f97316)' },
  { id: 'av5',  emoji: '🦸‍♂️', label: 'Hero',       bg: 'linear-gradient(135deg,#ec4899,#f43f5e)' },
  { id: 'av6',  emoji: '🧑‍🔬', label: 'Scientist',  bg: 'linear-gradient(135deg,#8b5cf6,#a855f7)' },
  { id: 'av7',  emoji: '🏋️‍♂️', label: 'Lifter',    bg: 'linear-gradient(135deg,#fbbf24,#eab308)' },
  { id: 'av8',  emoji: '🧑‍⚕️', label: 'Medic',     bg: 'linear-gradient(135deg,#14b8a6,#06b6d4)' },
  { id: 'av9',  emoji: '🥷',   label: 'Ninja',      bg: 'linear-gradient(135deg,#1e1b4b,#312e81)' },
  { id: 'av10', emoji: '🧑‍🎓', label: 'Scholar',   bg: 'linear-gradient(135deg,#4f46e5,#7c3aed)' },
  { id: 'av11', emoji: 'FOX',   label: 'Fox',        bg: 'linear-gradient(135deg,#f97316,#ef4444)' },
  { id: 'av12', emoji: 'DRG',   label: 'Dragon',     bg: 'linear-gradient(135deg,#dc2626,#7c3aed)' },
];
