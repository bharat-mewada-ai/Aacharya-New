// Nutrition Page - Food & Vitamins Encyclopedia
import { useState } from 'react';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import GlassCard from '../components/ui/GlassCard';
import './Nutrition.css';

// ─── Food Data ───────────────────────────────────────────────────────────────
const foodData = [
  {
    id: 1,
    name: 'Chicken Breast',
    emoji: '🍗',
    category: 'Protein',
    isVeg: false,
    calories: 165,
    per: '100g',
    color: '#f59e0b',
    nutrients: {
      protein: { amount: '31g', dv: 62 },
      fat: { amount: '3.6g', dv: 5 },
      carbs: { amount: '0g', dv: 0 },
      fiber: { amount: '0g', dv: 0 },
    },
    vitamins: ['B3 (Niacin)', 'B6', 'B12', 'Phosphorus', 'Selenium'],
    benefits: ['Muscle building', 'Weight management', 'High satiety'],
    tip: 'Grill or bake for lowest fat content.',
  },
  {
    id: 2,
    name: 'Egg',
    emoji: '🥚',
    category: 'Protein',
    isVeg: false,
    calories: 155,
    per: '100g',
    color: '#fbbf24',
    nutrients: {
      protein: { amount: '13g', dv: 26 },
      fat: { amount: '11g', dv: 14 },
      carbs: { amount: '1.1g', dv: 0 },
      fiber: { amount: '0g', dv: 0 },
    },
    vitamins: ['B12', 'B2 (Riboflavin)', 'Vitamin D', 'Choline', 'Selenium'],
    benefits: ['Complete protein', 'Brain health', 'Eye health'],
    tip: 'Whole egg yolk contains most nutrients — don\'t skip it!',
  },
  {
    id: 3,
    name: 'Spinach',
    emoji: '🥬',
    category: 'Vegetable',
    isVeg: true,
    calories: 23,
    per: '100g',
    color: '#10b981',
    nutrients: {
      protein: { amount: '2.9g', dv: 6 },
      fat: { amount: '0.4g', dv: 1 },
      carbs: { amount: '3.6g', dv: 1 },
      fiber: { amount: '2.2g', dv: 9 },
    },
    vitamins: ['Vitamin K', 'Vitamin A', 'Folate', 'Iron', 'Magnesium'],
    benefits: ['Bone health', 'Blood pressure', 'Anti-inflammatory'],
    tip: 'Lightly sauté with garlic — heat increases iron absorption.',
  },
  {
    id: 4,
    name: 'Banana',
    emoji: '🍌',
    category: 'Fruit',
    isVeg: true,
    calories: 89,
    per: '100g',
    color: '#fbbf24',
    nutrients: {
      protein: { amount: '1.1g', dv: 2 },
      fat: { amount: '0.3g', dv: 0 },
      carbs: { amount: '23g', dv: 8 },
      fiber: { amount: '2.6g', dv: 10 },
    },
    vitamins: ['Potassium', 'Vitamin B6', 'Vitamin C', 'Magnesium'],
    benefits: ['Energy boost', 'Muscle recovery', 'Gut health'],
    tip: 'Eat pre-workout for quick natural energy.',
  },
  {
    id: 5,
    name: 'Brown Rice',
    emoji: '🍚',
    category: 'Carbs',
    isVeg: true,
    calories: 216,
    per: '100g (cooked)',
    color: '#d97706',
    nutrients: {
      protein: { amount: '5g', dv: 10 },
      fat: { amount: '1.8g', dv: 2 },
      carbs: { amount: '45g', dv: 15 },
      fiber: { amount: '3.5g', dv: 14 },
    },
    vitamins: ['Magnesium', 'Phosphorus', 'B1 (Thiamine)', 'B3 (Niacin)', 'Manganese'],
    benefits: ['Sustained energy', 'Digestive health', 'Blood sugar control'],
    tip: 'Rinse before cooking to reduce arsenic content.',
  },
  {
    id: 6,
    name: 'Salmon',
    emoji: '🐟',
    category: 'Protein',
    isVeg: false,
    calories: 208,
    per: '100g',
    color: '#f97316',
    nutrients: {
      protein: { amount: '20g', dv: 40 },
      fat: { amount: '13g', dv: 17 },
      carbs: { amount: '0g', dv: 0 },
      fiber: { amount: '0g', dv: 0 },
    },
    vitamins: ['Omega-3 DHA', 'Omega-3 EPA', 'Vitamin D', 'B12', 'Selenium'],
    benefits: ['Heart health', 'Brain function', 'Anti-inflammatory'],
    tip: 'Wild-caught salmon has higher omega-3 content than farmed.',
  },
  {
    id: 7,
    name: 'Avocado',
    emoji: '🥑',
    category: 'Fats',
    isVeg: true,
    calories: 160,
    per: '100g',
    color: '#84cc16',
    nutrients: {
      protein: { amount: '2g', dv: 4 },
      fat: { amount: '15g', dv: 19 },
      carbs: { amount: '9g', dv: 3 },
      fiber: { amount: '7g', dv: 25 },
    },
    vitamins: ['Vitamin K', 'Folate', 'Vitamin C', 'Potassium', 'Vitamin E'],
    benefits: ['Healthy fats', 'Heart health', 'Skin glow'],
    tip: 'Half an avocado a day is the sweet spot for benefits.',
  },
  {
    id: 8,
    name: 'Greek Yogurt',
    emoji: '🍶',
    category: 'Dairy',
    isVeg: true,
    calories: 100,
    per: '100g',
    color: '#a78bfa',
    nutrients: {
      protein: { amount: '17g', dv: 34 },
      fat: { amount: '0.7g', dv: 1 },
      carbs: { amount: '6g', dv: 2 },
      fiber: { amount: '0g', dv: 0 },
    },
    vitamins: ['Calcium', 'B12', 'Probiotics', 'Phosphorus', 'Iodine'],
    benefits: ['Gut health', 'Muscle repair', 'Bone strength'],
    tip: 'Choose plain, unsweetened yogurt to avoid hidden sugars.',
  },
  {
    id: 9,
    name: 'Sweet Potato',
    emoji: '🍠',
    category: 'Carbs',
    isVeg: true,
    calories: 86,
    per: '100g',
    color: '#f97316',
    nutrients: {
      protein: { amount: '1.6g', dv: 3 },
      fat: { amount: '0.1g', dv: 0 },
      carbs: { amount: '20g', dv: 7 },
      fiber: { amount: '3g', dv: 12 },
    },
    vitamins: ['Vitamin A', 'Vitamin C', 'Manganese', 'B6', 'Potassium'],
    benefits: ['Vision health', 'Immunity', 'Gut health'],
    tip: 'A single sweet potato provides 400% of your daily Vitamin A!',
  },
  {
    id: 10,
    name: 'Almonds',
    emoji: '🥜',
    category: 'Nuts',
    isVeg: true,
    calories: 579,
    per: '100g',
    color: '#d97706',
    nutrients: {
      protein: { amount: '21g', dv: 42 },
      fat: { amount: '50g', dv: 64 },
      carbs: { amount: '22g', dv: 7 },
      fiber: { amount: '12.5g', dv: 45 },
    },
    vitamins: ['Vitamin E', 'Magnesium', 'Calcium', 'Riboflavin', 'Manganese'],
    benefits: ['Heart health', 'Brain boost', 'Weight management'],
    tip: 'A small handful (23 almonds) is the ideal daily portion.',
  },
  {
    id: 11,
    name: 'Mango',
    emoji: '🥭',
    category: 'Fruit',
    isVeg: true,
    calories: 60,
    per: '100g',
    color: '#fbbf24',
    nutrients: {
      protein: { amount: '0.8g', dv: 1 },
      fat: { amount: '0.4g', dv: 0 },
      carbs: { amount: '15g', dv: 5 },
      fiber: { amount: '1.6g', dv: 6 },
    },
    vitamins: ['Vitamin A', 'Vitamin C', 'Vitamin B6', 'Folate'],
    benefits: ['Immune boost', 'Eye health', 'Digestion'],
    tip: 'Rich in antioxidants like mangiferin.',
  },
  {
    id: 12,
    name: 'Paneer',
    emoji: '🧀',
    category: 'Protein',
    isVeg: true,
    calories: 265,
    per: '100g',
    color: '#f59e0b',
    nutrients: {
      protein: { amount: '18g', dv: 36 },
      fat: { amount: '20g', dv: 25 },
      carbs: { amount: '1.2g', dv: 0 },
      fiber: { amount: '0g', dv: 0 },
    },
    vitamins: ['Calcium', 'Vitamin D', 'Vitamin B12', 'Magnesium'],
    benefits: ['Muscle repair', 'Strong bones', 'Healthy weight'],
    tip: 'Best consumed fresh; grill with minimal oil.',
  },
  {
    id: 13,
    name: 'Kiwi',
    emoji: '🥝',
    category: 'Fruit',
    isVeg: true,
    calories: 61,
    per: '100g',
    color: '#4ade80',
    nutrients: {
      protein: { amount: '1.1g', dv: 2 },
      fat: { amount: '0.5g', dv: 0 },
      carbs: { amount: '15g', dv: 5 },
      fiber: { amount: '3g', dv: 12 },
    },
    vitamins: ['Vitamin C', 'Vitamin K', 'Vitamin E', 'Folate'],
    benefits: ['Heart health', 'Digestion', 'Skin health'],
    tip: 'Contains more Vitamin C than an orange!',
  },
  {
    id: 14,
    name: 'Blueberries',
    emoji: '🫐',
    category: 'Fruit',
    isVeg: true,
    calories: 57,
    per: '100g',
    color: '#3b82f6',
    nutrients: {
      protein: { amount: '0.7g', dv: 1 },
      fat: { amount: '0.3g', dv: 0 },
      carbs: { amount: '14g', dv: 5 },
      fiber: { amount: '2.4g', dv: 10 },
    },
    vitamins: ['Vitamin C', 'Vitamin K', 'Manganese', 'Antioxidants'],
    benefits: ['Brain health', 'Anti-aging', 'Heart health'],
    tip: 'One of the highest antioxidant-rich foods.',
  },
  {
    id: 15,
    name: 'Tofu',
    emoji: '⬜',
    category: 'Protein',
    isVeg: true,
    calories: 76,
    per: '100g',
    color: '#f8fafc',
    nutrients: {
      protein: { amount: '8g', dv: 16 },
      fat: { amount: '4.8g', dv: 6 },
      carbs: { amount: '1.9g', dv: 1 },
      fiber: { amount: '0.3g', dv: 1 },
    },
    vitamins: ['Calcium', 'Manganese', 'Selenium', 'Phosphorus', 'Iron'],
    benefits: ['Plant-based protein', 'Lower cholesterol', 'Bone health'],
    tip: 'Press out water before cooking for a crispier texture.',
  },
  {
    id: 16,
    name: 'Chickpeas',
    emoji: '🥣',
    category: 'Protein',
    isVeg: true,
    calories: 164,
    per: '100g (cooked)',
    color: '#fbbf24',
    nutrients: {
      protein: { amount: '9g', dv: 18 },
      fat: { amount: '2.6g', dv: 3 },
      carbs: { amount: '27g', dv: 9 },
      fiber: { amount: '7.6g', dv: 30 },
    },
    vitamins: ['Folate', 'Iron', 'Phosphorus', 'Copper', 'Manganese'],
    benefits: ['High fiber', 'Satiety', 'Blood sugar control'],
    tip: 'Rich in both fiber and protein — perfect for weight management.',
  },
  {
    id: 17,
    name: 'Lentils (Dal)',
    emoji: '🍲',
    category: 'Protein',
    isVeg: true,
    calories: 116,
    per: '100g (cooked)',
    color: '#f59e0b',
    nutrients: {
      protein: { amount: '9g', dv: 18 },
      fat: { amount: '0.4g', dv: 1 },
      carbs: { amount: '20g', dv: 7 },
      fiber: { amount: '7.9g', dv: 32 },
    },
    vitamins: ['Folate', 'Iron', 'Thiamine', 'Pantothenic Acid'],
    benefits: ['Iron source', 'Energy levels', 'Heart health'],
    tip: 'Add a squeeze of lemon to increase iron absorption.',
  },
  {
    id: 18,
    name: 'Broccoli',
    emoji: '🥦',
    category: 'Vegetable',
    isVeg: true,
    calories: 34,
    per: '100g',
    color: '#16a34a',
    nutrients: {
      protein: { amount: '2.8g', dv: 6 },
      fat: { amount: '0.4g', dv: 1 },
      carbs: { amount: '7g', dv: 2 },
      fiber: { amount: '2.6g', dv: 10 },
    },
    vitamins: ['Vitamin K', 'Vitamin C', 'Folate', 'Potassium'],
    benefits: ['Detoxification', 'Bone health', 'Immune support'],
    tip: 'Steam lightly for 3-4 minutes to preserve most nutrients.',
  },
  {
    id: 19,
    name: 'Apple',
    emoji: '🍎',
    category: 'Fruit',
    isVeg: true,
    calories: 52,
    per: '100g',
    color: '#ef4444',
    nutrients: {
      protein: { amount: '0.3g', dv: 1 },
      fat: { amount: '0.2g', dv: 0 },
      carbs: { amount: '14g', dv: 5 },
      fiber: { amount: '2.4g', dv: 10 },
    },
    vitamins: ['Vitamin C', 'Potassium', 'Vitamin K', 'Fiber'],
    benefits: ['Digestion', 'Heart health', 'Weight loss'],
    tip: 'Eat the skin! That\'s where half the fiber and most polyphenols are.',
  },
  {
    id: 20,
    name: 'Oats',
    emoji: '🥣',
    category: 'Carbs',
    isVeg: true,
    calories: 389,
    per: '100g (dry)',
    color: '#94a3b8',
    nutrients: {
      protein: { amount: '16.9g', dv: 34 },
      fat: { amount: '6.9g', dv: 9 },
      carbs: { amount: '66g', dv: 22 },
      fiber: { amount: '10.6g', dv: 42 },
    },
    vitamins: ['Manganese', 'Phosphorus', 'Magnesium', 'Iron', 'Zinc'],
    benefits: ['Lowers cholesterol', 'Steady energy', 'Heart health'],
    tip: 'Contains beta-glucan, a unique type of soluble fiber.',
  }
];

// ─── Vitamin Data ─────────────────────────────────────────────────────────────
const vitaminData = [
  {
    id: 'A',
    name: 'Vitamin A',
    emoji: '👁️',
    type: 'Fat-Soluble',
    color: '#f97316',
    dri: '700–900 mcg/day',
    function: 'Vision, immune function, skin health, cell growth',
    deficiency: 'Night blindness, dry skin, frequent infections',
    overdose: 'Nausea, liver damage, birth defects (supplements)',
    sources: ['Liver 🫀', 'Carrot 🥕', 'Sweet Potato 🍠', 'Spinach 🥬', 'Eggs 🥚'],
    solubility: 70,
  },
  {
    id: 'B1',
    name: 'Vitamin B1 (Thiamine)',
    emoji: '⚡',
    type: 'Water-Soluble',
    color: '#fbbf24',
    dri: '1.1–1.2 mg/day',
    function: 'Energy metabolism, nerve function, glucose conversion',
    deficiency: 'Beriberi, Wernicke encephalopathy, fatigue',
    overdose: 'Generally non-toxic (excess excreted)',
    sources: ['Whole grains 🌾', 'Pork 🥩', 'Nuts 🥜', 'Legumes 🫘', 'Seeds'],
    solubility: 50,
  },
  {
    id: 'B2',
    name: 'Vitamin B2 (Riboflavin)',
    emoji: '🔋',
    type: 'Water-Soluble',
    color: '#facc15',
    dri: '1.1–1.3 mg/day',
    function: 'Energy production, antioxidant defense, B6 & B9 metabolism',
    deficiency: 'Cracked lips, inflamed tongue, eye sensitivity',
    overdose: 'Non-toxic — urine turns bright yellow',
    sources: ['Milk 🥛', 'Eggs 🥚', 'Meat 🥩', 'Almonds 🥜', 'Leafy greens 🥬'],
    solubility: 55,
  },
  {
    id: 'B3',
    name: 'Vitamin B3 (Niacin)',
    emoji: '🧬',
    type: 'Water-Soluble',
    color: '#a3e635',
    dri: '14–16 mg/day',
    function: 'DNA repair, energy metabolism, cholesterol regulation',
    deficiency: 'Pellagra (dermatitis, diarrhea, dementia)',
    overdose: 'Skin flushing, liver damage at high doses',
    sources: ['Chicken 🍗', 'Tuna 🐟', 'Turkey 🦃', 'Peanuts 🥜', 'Mushrooms 🍄'],
    solubility: 60,
  },
  {
    id: 'B6',
    name: 'Vitamin B6 (Pyridoxine)',
    emoji: '🧠',
    type: 'Water-Soluble',
    color: '#34d399',
    dri: '1.3–1.7 mg/day',
    function: 'Protein metabolism, neurotransmitter synthesis, immune function',
    deficiency: 'Anemia, depression, confusion, skin rashes',
    overdose: 'Nerve damage (neuropathy) at very high doses',
    sources: ['Banana 🍌', 'Salmon 🐟', 'Chicken 🍗', 'Potato 🥔', 'Chickpeas 🫘'],
    solubility: 65,
  },
  {
    id: 'B12',
    name: 'Vitamin B12 (Cobalamin)',
    emoji: '❤️',
    type: 'Water-Soluble',
    color: '#f43f5e',
    dri: '2.4 mcg/day',
    function: 'Red blood cell formation, DNA synthesis, nerve function',
    deficiency: 'Pernicious anemia, nerve damage, memory loss',
    overdose: 'Non-toxic; excess excreted in urine',
    sources: ['Beef 🥩', 'Salmon 🐟', 'Eggs 🥚', 'Milk 🥛', 'Clams 🦪'],
    solubility: 45,
  },
  {
    id: 'C',
    name: 'Vitamin C (Ascorbic Acid)',
    emoji: '🍊',
    type: 'Water-Soluble',
    color: '#fb923c',
    dri: '75–90 mg/day',
    function: 'Antioxidant, collagen synthesis, iron absorption, immune support',
    deficiency: 'Scurvy, bleeding gums, slow wound healing',
    overdose: 'Kidney stones, GI distress at >2000mg',
    sources: ['Guava 🍈', 'Bell Pepper 🫑', 'Kiwi 🥝', 'Strawberry 🍓', 'Orange 🍊'],
    solubility: 80,
  },
  {
    id: 'D',
    name: 'Vitamin D (Calciferol)',
    emoji: '☀️',
    type: 'Fat-Soluble',
    color: '#fde047',
    dri: '600–800 IU/day',
    function: 'Calcium absorption, bone health, immune regulation, mood',
    deficiency: 'Rickets, osteoporosis, depression, weak immunity',
    overdose: 'Hypercalcemia, kidney stones, nausea',
    sources: ['Sunlight ☀️', 'Salmon 🐟', 'Tuna 🐠', 'Egg Yolk 🥚', 'Fortified milk 🥛'],
    solubility: 35,
  },
  {
    id: 'E',
    name: 'Vitamin E (Tocopherol)',
    emoji: '🛡️',
    type: 'Fat-Soluble',
    color: '#86efac',
    dri: '15 mg/day',
    function: 'Antioxidant, immune support, skin health, cellular protection',
    deficiency: 'Nerve damage, muscle weakness, vision problems',
    overdose: 'Blood thinning, increased bleeding risk',
    sources: ['Almonds 🥜', 'Sunflower seeds 🌻', 'Avocado 🥑', 'Spinach 🥬', 'Olive oil 🫒'],
    solubility: 40,
  },
  {
    id: 'K',
    name: 'Vitamin K',
    emoji: '🦴',
    type: 'Fat-Soluble',
    color: '#4ade80',
    dri: '90–120 mcg/day',
    function: 'Blood clotting, bone metabolism, cardiovascular health',
    deficiency: 'Excessive bleeding, easy bruising, weak bones',
    overdose: 'Rare; may interfere with blood thinners',
    sources: ['Kale 🥬', 'Spinach 🥬', 'Broccoli 🥦', 'Fermented foods', 'Liver 🫀'],
    solubility: 30,
  },
];

const foodCategories = ['All', 'Protein', 'Carbs', 'Fats', 'Vegetable', 'Fruit', 'Dairy', 'Nuts'];
const vitaminTypes = ['All', 'Water-Soluble', 'Fat-Soluble'];

// Helper to parse nutrient amount (e.g., "31g" -> 31)
const parseAmount = (str) => {
  if (!str) return 0;
  return parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
};

// ─── Nutrient Bar ─────────────────────────────────────────────────────────────
const NutrientBar = ({ label, amount, dv, color }) => (
  <div className="nutrient-bar-row">
    <div className="nutrient-bar-header">
      <span className="nutrient-name">{label}</span>
      <div className="nutrient-meta">
        <span className="nutrient-amount">{amount}</span>
        <span className="nutrient-dv">{dv}% DV</span>
      </div>
    </div>
    <div className="nutrient-bar-track">
      <div
        className="nutrient-bar-fill"
        style={{ width: `${Math.min(dv, 100)}%`, background: color }}
      />
    </div>
  </div>
);

// ─── Food Card ────────────────────────────────────────────────────────────────
const FoodCard = ({ food, onClick }) => (
  <GlassCard className="food-card" onClick={() => onClick(food)}>
    <div className={`diet-indicator ${food.isVeg ? 'veg' : 'non-veg'}`}></div>
    <div className="food-card-emoji" style={{ filter: `drop-shadow(0 0 12px ${food.color}60)` }}>
      {food.emoji}
    </div>
    <div className="food-card-body">
      <h4 className="food-card-name">{food.name}</h4>
      <span className="food-card-cat" style={{ color: food.color }}>{food.category}</span>
      <div className="food-card-cal">
        <span className="cal-num" style={{ color: food.color }}>{food.calories}</span>
        <span className="cal-label"> kcal / {food.per}</span>
      </div>
    </div>
    <div className="food-card-arrow">›</div>
  </GlassCard>
);

// ─── Vitamin Card ─────────────────────────────────────────────────────────────
const VitaminCard = ({ vitamin, onClick }) => (
  <GlassCard className="vitamin-card" onClick={() => onClick(vitamin)}>
    <div className="vitamin-card-icon" style={{ background: `${vitamin.color}20`, borderColor: `${vitamin.color}40` }}>
      <span>{vitamin.emoji}</span>
    </div>
    <div className="vitamin-card-body">
      <h4 className="vitamin-card-name">{vitamin.name}</h4>
      <span className={`vitamin-type-badge ${vitamin.type === 'Fat-Soluble' ? 'fat' : 'water'}`}>
        {vitamin.type}
      </span>
      <p className="vitamin-dri">Daily: {vitamin.dri}</p>
    </div>
    <div className="vitamin-solubility">
      <div className="sol-bar-track">
        <div className="sol-bar-fill" style={{ height: `${vitamin.solubility}%`, background: vitamin.color }} />
      </div>
      <span className="sol-label">Body Absorption</span>
    </div>
  </GlassCard>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

// ─── Diet Planner View ────────────────────────────────────────────────────────
const DietPlanner = ({ plate, onRemove, onAddMore }) => {
  const totals = plate.reduce((acc, item) => {
    acc.calories += item.calories;
    acc.protein += parseAmount(item.nutrients.protein.amount);
    acc.fat += parseAmount(item.nutrients.fat.amount);
    acc.carbs += parseAmount(item.nutrients.carbs.amount);
    return acc;
  }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

  return (
    <div className="diet-planner fade-up">
      <div className="planner-summary">
        <GlassCard className="summary-card">
          <div className="summary-header">
            <h3>My Daily Plate</h3>
            <span className="item-count">{plate.length} items</span>
          </div>
          <div className="summary-macros">
            <div className="macro-item">
              <span className="macro-val">{Math.round(totals.calories)}</span>
              <span className="macro-lab">Calories</span>
            </div>
            <div className="macro-item">
              <span className="macro-val" style={{color: '#a855f7'}}>{Math.round(totals.protein)}g</span>
              <span className="macro-lab">Protein</span>
            </div>
            <div className="macro-item">
              <span className="macro-val" style={{color: '#06b6d4'}}>{Math.round(totals.carbs)}g</span>
              <span className="macro-lab">Carbs</span>
            </div>
            <div className="macro-item">
              <span className="macro-val" style={{color: '#f59e0b'}}>{Math.round(totals.fat)}g</span>
              <span className="macro-lab">Fats</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="plate-list">
        {plate.length === 0 ? (
          <div className="empty-plate">
            <span>🍽️</span>
            <p>Your plate is empty. Add foods to calculate your diet!</p>
            <button className="add-btn-primary" onClick={onAddMore}>Browse Foods</button>
          </div>
        ) : (
          <>
            <div className="plate-items">
              {plate.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="plate-row glass">
                  <span className="p-emoji">{item.emoji}</span>
                  <div className="p-info">
                    <span className="p-name">{item.name}</span>
                    <span className="p-meta">{item.calories} kcal • {item.nutrients.protein.amount} P</span>
                  </div>
                  <button className="p-remove" onClick={() => onRemove(idx)}>✕</button>
                </div>
              ))}
            </div>
            <button className="add-more-btn" onClick={onAddMore}>+ Add More Items</button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Main Nutrition Page ──────────────────────────────────────────────────────
const Nutrition = () => {
  const [activeTab, setActiveTab] = useState('food');
  const [foodCategory, setFoodCategory] = useState('All');
  const [dietFilter, setDietFilter] = useState('All'); // 'All', 'Veg', 'Non-Veg'
  const [vitaminType, setVitaminType] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [plate, setPlate] = useState([]);

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const addToPlate = (item) => {
    setPlate([...plate, item]);
    closeModal();
  };

  const removeFromPlate = (index) => {
    const newPlate = [...plate];
    newPlate.splice(index, 1);
    setPlate(newPlate);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  const filteredFood = foodData.filter(f => {
    const matchCat = foodCategory === 'All' || f.category === foodCategory;
    const matchDiet = dietFilter === 'All' || (dietFilter === 'Veg' ? f.isVeg : !f.isVeg);
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiet && matchSearch;
  });

  const filteredVitamins = vitaminData.filter(v => {
    const matchType = vitaminType === 'All' || v.type === vitaminType;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="nutrition-page">
      <TopBar title="Nutrition" showProgress={false} />

      {/* Main Tabs */}
      <div className="nutrition-tabs">
        <button
          className={`nut-tab ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => { setActiveTab('food'); setSearch(''); }}
        >
          🍽️ Food
        </button>
        <button
          className={`nut-tab ${activeTab === 'vitamins' ? 'active' : ''}`}
          onClick={() => { setActiveTab('vitamins'); setSearch(''); }}
        >
          💊 Vitamins
        </button>
        <button
          className={`nut-tab ${activeTab === 'planner' ? 'active' : ''}`}
          onClick={() => { setActiveTab('planner'); setSearch(''); }}
        >
          📝 Planner
        </button>
      </div>

      <div className="nutrition-content">
        {/* Search */}
        <div className="nut-search-bar">
          <span className="search-icon-nut">🔍</span>
          <input
            type="text"
            placeholder={activeTab === 'food' ? 'Search foods...' : 'Search vitamins...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="nut-search-input"
          />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>

        {/* ── FOOD TAB ── */}
        {activeTab === 'food' && (
          <>
            <div className="diet-filters">
              {['All', 'Veg', 'Non-Veg'].map(type => (
                <button
                  key={type}
                  className={`diet-chip ${dietFilter === type ? 'active' : ''}`}
                  onClick={() => setDietFilter(type)}
                >
                  {type === 'Veg' ? '🟢 Veg' : type === 'Non-Veg' ? '🔴 Non-Veg' : '🍽️ All'}
                </button>
              ))}
            </div>
            <div className="filter-chips">
              {foodCategories.map(cat => (
                <button
                  key={cat}
                  className={`filter-chip ${foodCategory === cat ? 'active' : ''}`}
                  onClick={() => setFoodCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="results-count">{filteredFood.length} foods found</div>

            <div className="food-grid">
              {filteredFood.map(food => (
                <FoodCard key={food.id} food={food} onClick={f => openModal(f, 'food')} />
              ))}
              {filteredFood.length === 0 && (
                <div className="empty-state">
                  <span>🍽️</span>
                  <p>No foods found for "{search}"</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── VITAMINS TAB ── */}
        {activeTab === 'vitamins' && (
          <>
            <div className="filter-chips">
              {vitaminTypes.map(t => (
                <button
                  key={t}
                  className={`filter-chip ${vitaminType === t ? 'active' : ''}`}
                  onClick={() => setVitaminType(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="results-count">{filteredVitamins.length} vitamins found</div>

            <div className="vitamin-grid">
              {filteredVitamins.map(vit => (
                <VitaminCard key={vit.id} vitamin={vit} onClick={v => openModal(v, 'vitamin')} />
              ))}
              {filteredVitamins.length === 0 && (
                <div className="empty-state">
                  <span>💊</span>
                  <p>No vitamins found for "{search}"</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── PLANNER TAB ── */}
        {activeTab === 'planner' && (
          <DietPlanner 
            plate={plate} 
            onRemove={removeFromPlate} 
            onAddMore={() => setActiveTab('food')} 
          />
        )}
      </div>

      <BottomNav />

      {/* Detail Modal */}
      {selectedItem && (
        <div className="detail-modal-overlay" onClick={closeModal}>
          <div className="detail-modal glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>

            {modalType === 'food' ? (
              <>
                <div className="modal-hero" style={{ background: `radial-gradient(circle at 30% 50%, ${selectedItem.color}20, transparent)` }}>
                  <span className="modal-emoji">{selectedItem.emoji}</span>
                  <div>
                    <h2 className="modal-title">{selectedItem.name}</h2>
                    <span className="modal-subtitle" style={{ color: selectedItem.color }}>{selectedItem.category} • {selectedItem.calories} kcal / {selectedItem.per}</span>
                  </div>
                </div>
                <div className="modal-body">
                  <button className="add-to-plate-btn" onClick={() => addToPlate(selectedItem)}>
                    ➕ Add to My Plate
                  </button>

                  <h3 className="modal-section-title">Macronutrients</h3>
                  <NutrientBar label="Protein" amount={selectedItem.nutrients.protein.amount} dv={selectedItem.nutrients.protein.dv} color="#a855f7" />
                  <NutrientBar label="Fat" amount={selectedItem.nutrients.fat.amount} dv={selectedItem.nutrients.fat.dv} color="#f59e0b" />
                  <NutrientBar label="Carbs" amount={selectedItem.nutrients.carbs.amount} dv={selectedItem.nutrients.carbs.dv} color="#06b6d4" />
                  <NutrientBar label="Fiber" amount={selectedItem.nutrients.fiber.amount} dv={selectedItem.nutrients.fiber.dv} color="#10b981" />

                  <h3 className="modal-section-title">Key Vitamins & Minerals</h3>
                  <div className="tag-list">
                    {selectedItem.vitamins.map((v, i) => (
                      <span key={i} className="nutrient-tag" style={{ borderColor: `${selectedItem.color}50`, color: selectedItem.color }}>{v}</span>
                    ))}
                  </div>

                  <h3 className="modal-section-title">Health Benefits</h3>
                  <div className="benefit-list">
                    {selectedItem.benefits.map((b, i) => (
                      <div key={i} className="benefit-item">
                        <span className="benefit-dot" style={{ background: selectedItem.color }} />
                        {b}
                      </div>
                    ))}
                  </div>

                  <div className="pro-tip-box" style={{ borderColor: `${selectedItem.color}40`, background: `${selectedItem.color}10` }}>
                    <span className="pro-tip-label">💡 Pro Tip</span>
                    <p>{selectedItem.tip}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="modal-hero" style={{ background: `radial-gradient(circle at 30% 50%, ${selectedItem.color}20, transparent)` }}>
                  <span className="modal-emoji">{selectedItem.emoji}</span>
                  <div>
                    <h2 className="modal-title">{selectedItem.name}</h2>
                    <span className={`vitamin-type-badge ${selectedItem.type === 'Fat-Soluble' ? 'fat' : 'water'} modal-badge`}>
                      {selectedItem.type}
                    </span>
                  </div>
                </div>
                <div className="modal-body">
                  <div className="vit-info-row">
                    <div className="vit-info-box" style={{ borderColor: `${selectedItem.color}40` }}>
                      <span className="vit-info-label">Daily Intake</span>
                      <span className="vit-info-value" style={{ color: selectedItem.color }}>{selectedItem.dri}</span>
                    </div>
                  </div>

                  <h3 className="modal-section-title">Function</h3>
                  <p className="modal-text">{selectedItem.function}</p>

                  <h3 className="modal-section-title">Deficiency Signs</h3>
                  <div className="warning-box">⚠️ {selectedItem.deficiency}</div>

                  <h3 className="modal-section-title">Overdose Risk</h3>
                  <p className="modal-text overdose">{selectedItem.overdose}</p>

                  <h3 className="modal-section-title">Best Food Sources</h3>
                  <div className="tag-list">
                    {selectedItem.sources.map((s, i) => (
                      <span key={i} className="nutrient-tag" style={{ borderColor: `${selectedItem.color}50`, color: selectedItem.color }}>{s}</span>
                    ))}
                  </div>

                  <div className="sol-display">
                    <span>Body Absorption Rate</span>
                    <div className="sol-bar-h-track">
                      <div className="sol-bar-h-fill" style={{ width: `${selectedItem.solubility}%`, background: selectedItem.color }} />
                    </div>
                    <span style={{ color: selectedItem.color }}>{selectedItem.solubility}%</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nutrition;
