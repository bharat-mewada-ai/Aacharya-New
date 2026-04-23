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
    benefits: ['Gut health', 'Bone strength', 'Muscle repair'],
    tip: 'Choose plain, unsweetened for maximum health benefit.',
  },
  {
    id: 9,
    name: 'Sweet Potato',
    emoji: '🍠',
    category: 'Carbs',
    calories: 86,
    per: '100g',
    color: '#f97316',
    nutrients: {
      protein: { amount: '1.6g', dv: 3 },
      fat: { amount: '0.1g', dv: 0 },
      carbs: { amount: '20g', dv: 7 },
      fiber: { amount: '3g', dv: 11 },
    },
    vitamins: ['Beta-Carotene (Vit A)', 'Vitamin C', 'Manganese', 'Potassium'],
    benefits: ['Immunity boost', 'Vision health', 'Blood sugar balance'],
    tip: 'Pair with a fat source to absorb more beta-carotene.',
  },
  {
    id: 10,
    name: 'Almonds',
    emoji: '🥜',
    category: 'Nuts',
    calories: 579,
    per: '100g',
    color: '#b45309',
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
const DetailModal = ({ item, type, onClose }) => {
  if (!item) return null;
  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal glass" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {type === 'food' ? (
          <>
            <div className="modal-hero" style={{ background: `radial-gradient(circle at 30% 50%, ${item.color}20, transparent)` }}>
              <span className="modal-emoji">{item.emoji}</span>
              <div>
                <h2 className="modal-title">{item.name}</h2>
                <span className="modal-subtitle" style={{ color: item.color }}>{item.category} • {item.calories} kcal / {item.per}</span>
              </div>
            </div>
            <div className="modal-body">
              <h3 className="modal-section-title">Macronutrients</h3>
              <NutrientBar label="Protein" amount={item.nutrients.protein.amount} dv={item.nutrients.protein.dv} color="#a855f7" />
              <NutrientBar label="Fat" amount={item.nutrients.fat.amount} dv={item.nutrients.fat.dv} color="#f59e0b" />
              <NutrientBar label="Carbs" amount={item.nutrients.carbs.amount} dv={item.nutrients.carbs.dv} color="#06b6d4" />
              <NutrientBar label="Fiber" amount={item.nutrients.fiber.amount} dv={item.nutrients.fiber.dv} color="#10b981" />

              <h3 className="modal-section-title">Key Vitamins & Minerals</h3>
              <div className="tag-list">
                {item.vitamins.map((v, i) => (
                  <span key={i} className="nutrient-tag" style={{ borderColor: `${item.color}50`, color: item.color }}>{v}</span>
                ))}
              </div>

              <h3 className="modal-section-title">Health Benefits</h3>
              <div className="benefit-list">
                {item.benefits.map((b, i) => (
                  <div key={i} className="benefit-item">
                    <span className="benefit-dot" style={{ background: item.color }} />
                    {b}
                  </div>
                ))}
              </div>

              <div className="pro-tip-box" style={{ borderColor: `${item.color}40`, background: `${item.color}10` }}>
                <span className="pro-tip-label">💡 Pro Tip</span>
                <p>{item.tip}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="modal-hero" style={{ background: `radial-gradient(circle at 30% 50%, ${item.color}20, transparent)` }}>
              <span className="modal-emoji">{item.emoji}</span>
              <div>
                <h2 className="modal-title">{item.name}</h2>
                <span className={`vitamin-type-badge ${item.type === 'Fat-Soluble' ? 'fat' : 'water'} modal-badge`}>
                  {item.type}
                </span>
              </div>
            </div>
            <div className="modal-body">
              <div className="vit-info-row">
                <div className="vit-info-box" style={{ borderColor: `${item.color}40` }}>
                  <span className="vit-info-label">Daily Intake</span>
                  <span className="vit-info-value" style={{ color: item.color }}>{item.dri}</span>
                </div>
              </div>

              <h3 className="modal-section-title">Function</h3>
              <p className="modal-text">{item.function}</p>

              <h3 className="modal-section-title">Deficiency Signs</h3>
              <div className="warning-box">⚠️ {item.deficiency}</div>

              <h3 className="modal-section-title">Overdose Risk</h3>
              <p className="modal-text overdose">{item.overdose}</p>

              <h3 className="modal-section-title">Best Food Sources</h3>
              <div className="tag-list">
                {item.sources.map((s, i) => (
                  <span key={i} className="nutrient-tag" style={{ borderColor: `${item.color}50`, color: item.color }}>{s}</span>
                ))}
              </div>

              <div className="sol-display">
                <span>Body Absorption Rate</span>
                <div className="sol-bar-h-track">
                  <div className="sol-bar-h-fill" style={{ width: `${item.solubility}%`, background: item.color }} />
                </div>
                <span style={{ color: item.color }}>{item.solubility}%</span>
              </div>
            </div>
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
  const [vitaminType, setVitaminType] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType(null);
  };

  const filteredFood = foodData.filter(f => {
    const matchCat = foodCategory === 'All' || f.category === foodCategory;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
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
      </div>

      <BottomNav />

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal item={selectedItem} type={modalType} onClose={closeModal} />
      )}
    </div>
  );
};

export default Nutrition;
