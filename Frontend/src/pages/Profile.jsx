// Profile Page - FULLY WORKING
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import './Profile.css';

// ── Preset avatars (Snapchat-style) ──────────────────────────────────────────
const PRESET_AVATARS = [
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
  { id: 'av11', emoji: '🦊',   label: 'Fox',        bg: 'linear-gradient(135deg,#f97316,#ef4444)' },
  { id: 'av12', emoji: '🐉',   label: 'Dragon',     bg: 'linear-gradient(135deg,#dc2626,#7c3aed)' },
];

// ── Shop Products ─────────────────────────────────────────────────────────────
const SHOP_PRODUCTS = [
  { id:1, name:'Whey Protein Pro', brand:'NutriForce', emoji:'🥛', price:2499, originalPrice:3299, discount:24, category:'Supplements', rating:4.7, reviews:1284, color:'#a855f7', badge:'🔥 Best Seller', sponsored:false, description:'25g protein per serving. Chocolate, vanilla & strawberry.' },
  { id:2, name:'Resistance Band Set', brand:'FitPeak', emoji:'🏋️', price:799, originalPrice:1299, discount:38, category:'Equipment', rating:4.5, reviews:892, color:'#06b6d4', badge:'✨ Sponsored', sponsored:true, description:'5 resistance levels. Perfect for home workouts.' },
  { id:3, name:'Vitamin D3 + K2', brand:'VitaCore', emoji:'☀️', price:649, originalPrice:899, discount:28, category:'Vitamins', rating:4.8, reviews:2156, color:'#fbbf24', badge:'⭐ Top Rated', sponsored:false, description:'2000 IU D3 + 100mcg K2. 90-day supply.' },
  { id:4, name:'Smart Water Bottle', brand:'HydroTech', emoji:'💧', price:1199, originalPrice:1799, discount:33, category:'Accessories', rating:4.6, reviews:543, color:'#10b981', badge:'🆕 New', sponsored:true, description:'Tracks daily intake. LED hydration reminders.' },
  { id:5, name:'Omega-3 Fish Oil', brand:'PureHealth', emoji:'🐟', price:549, originalPrice:799, discount:31, category:'Vitamins', rating:4.9, reviews:3401, color:'#f97316', badge:'💎 Premium', sponsored:false, description:'1000mg EPA+DHA. Ultra-purified, no fishy aftertaste.' },
  { id:6, name:'Yoga Mat Pro', brand:'ZenFlex', emoji:'🧘', price:1499, originalPrice:2199, discount:32, category:'Equipment', rating:4.4, reviews:718, color:'#ec4899', badge:'✨ Sponsored', sponsored:true, description:'6mm non-slip surface. Eco-friendly TPE foam.' },
];

const SHOP_CATS = ['All','Supplements','Vitamins','Equipment','Accessories'];
const PREMIUM_PLANS = [
  { id:'monthly', name:'Monthly', price:299, period:'/month', color:'#a855f7', popular:false, features:['AI Nutrition Coach (unlimited)','Advanced body analytics','Custom workout plans','Ad-free experience','Priority support'] },
  { id:'yearly', name:'Yearly', price:1999, period:'/year', savings:'Save ₹1,589', color:'#fbbf24', popular:true, features:['Everything in Monthly','1-on-1 dietitian session','Blood test analysis','Exclusive rank badges','Beta feature access','Family sharing (up to 3)'] },
];

// ── AvatarBubble ──────────────────────────────────────────────────────────────
const AvatarBubble = ({ preset, size = 72, onClick }) => (
  <div
    className="avatar-bubble"
    style={{ width: size, height: size, background: preset?.bg || 'linear-gradient(135deg,#a855f7,#06b6d4)', borderRadius: '50%', cursor: onClick ? 'pointer' : 'default', display:'flex', alignItems:'center', justifyContent:'center', fontSize: size * 0.45 }}
    onClick={onClick}
  >
    {preset?.emoji || '👤'}
  </div>
);

// ── Avatar Picker Modal ───────────────────────────────────────────────────────
const AvatarPickerModal = ({ current, onSave, onClose }) => {
  const [selected, setSelected] = useState(current || 'av1');
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header">
          <h2>Choose Your Avatar</h2>
          <button className="prof-modal-close" onClick={onClose}>✕</button>
        </div>
        <p className="prof-modal-sub">Pick a character that represents you 🎭</p>
        <div className="avatar-grid">
          {PRESET_AVATARS.map(av => (
            <div
              key={av.id}
              className={`avatar-pick-item ${selected === av.id ? 'selected' : ''}`}
              onClick={() => setSelected(av.id)}
              style={{ borderColor: selected === av.id ? '#a855f7' : 'transparent' }}
            >
              <AvatarBubble preset={av} size={60} />
              <span className="avatar-pick-label">{av.label}</span>
              {selected === av.id && <div className="avatar-pick-check">✓</div>}
            </div>
          ))}
        </div>
        <button className="prof-save-btn" onClick={() => { onSave(selected); onClose(); }}>
          Save Avatar
        </button>
      </div>
    </div>
  );
};

// ── Edit Profile Modal ────────────────────────────────────────────────────────
const EditProfileModal = ({ user, onSave, onClose }) => {
  const [form, setForm] = useState({ 
    name: user.name || '', 
    goal: user.goal?.name || '', 
    bio: user.bio || '',
    healthCondition: user.healthCondition || false,
    healthConditionDetails: user.healthConditionDetails || ''
  });
  const goals = ['Weight Loss', 'Muscle Gain', 'Stay Fit', 'Endurance', 'Flexibility'];
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header">
          <h2>Edit Profile</h2>
          <button className="prof-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="edit-form">
          <label className="edit-label">Display Name</label>
          <input className="edit-input" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Your name" maxLength={30} />

          <label className="edit-label">Fitness Goal</label>
          <div className="goal-chips">
            {['Weight Loss', 'Muscle Gain', 'Stay Fit'].map(g => (
              <button key={g} className={`goal-chip ${form.goal === g ? 'active' : ''}`} onClick={() => setForm(p => ({...p, goal: g}))}>
                {g === 'Weight Loss' ? '🔥 Weight Loss' : g === 'Muscle Gain' ? '💪 Muscle Gain' : '⚡ Stay Fit'}
              </button>
            ))}
          </div>

          <label className="edit-label">Bio</label>
          <textarea className="edit-input edit-textarea" value={form.bio} onChange={e => setForm(p => ({...p, bio: e.target.value}))} placeholder="Tell something about yourself..." maxLength={120} rows={3} />
          <span className="char-count">{form.bio.length}/120</span>

          <label className="edit-label">Health Condition</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button 
              className={`goal-chip ${form.healthCondition ? 'active' : ''}`} 
              onClick={() => setForm(p => ({...p, healthCondition: true}))}
            >
              🏥 Has Condition
            </button>
            <button 
              className={`goal-chip ${!form.healthCondition ? 'active' : ''}`} 
              onClick={() => setForm(p => ({...p, healthCondition: false, healthConditionDetails: ''}))}
            >
              ✨ Healthy
            </button>
          </div>
          
          {form.healthCondition && (
            <input 
              className="edit-input" 
              value={form.healthConditionDetails} 
              onChange={e => setForm(p => ({...p, healthConditionDetails: e.target.value}))} 
              placeholder="Specify condition..." 
            />
          )}
        </div>
        <button className="prof-save-btn" onClick={() => { onSave(form); onClose(); }}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

// ── Refer Modal ───────────────────────────────────────────────────────────────
const ReferModal = ({ userName, onClose }) => {
  const code = `AACH-${(userName || 'USER').slice(0,4).toUpperCase()}-2026`;
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header"><h2>Refer & Earn</h2><button className="prof-modal-close" onClick={onClose}>✕</button></div>
        <div className="refer-hero">
          <div className="refer-icon">🤝</div>
          <h3 className="refer-title">Invite Friends, Earn XP!</h3>
          <p className="refer-sub">Get <span className="refer-highlight">+200 XP</span> for every friend who joins using your code</p>
        </div>
        <div className="refer-code-box">
          <span className="refer-code">{code}</span>
          <button className={`refer-copy-btn ${copied ? 'copied' : ''}`} onClick={copy}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
        <div className="refer-steps">
          {['Share your code with friends','They sign up using your code','You both get +200 XP bonus! 🎉'].map((s, i) => (
            <div key={i} className="refer-step"><span className="refer-step-num">{i+1}</span><span>{s}</span></div>
          ))}
        </div>
        <button className="prof-save-btn" style={{background:'linear-gradient(135deg,#10b981,#06b6d4)'}} onClick={() => { navigator.share?.({ title:'Join Aacharyaa!', text:`Use my code ${code} to join!`, url:'https://aacharyaa.app' }).catch(() => copy()); }}>
          Share Invite 🚀
        </button>
      </div>
    </div>
  );
};

// ── Settings Modal ────────────────────────────────────────────────────────────
const SettingsModal = ({ settings, onUpdate, onClose }) => {
  const [s, setS] = useState(settings);
  const toggle = (key) => { const n = {...s, [key]: !s[key]}; setS(n); onUpdate(n); };
  const rows = [
    { key:'notifications', label:'Push Notifications', icon:'🔔', desc:'Daily reminders & updates' },
    { key:'dailyReminders', label:'Daily Reminders', icon:'⏰', desc:'Workout & meal reminders' },
    { key:'soundEffects', label:'Sound Effects', icon:'🔊', desc:'XP gain & achievement sounds' },
    { key:'darkMode', label:'Dark Mode', icon:'🌙', desc:'Dark themed interface' },
    { key:'shareProgress', label:'Share Progress', icon:'📊', desc:'Allow progress sharing' },
  ];
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header"><h2>⚙️ Settings</h2><button className="prof-modal-close" onClick={onClose}>✕</button></div>
        <div className="settings-rows">
          {rows.map(r => (
            <div key={r.key} className="settings-row-item">
              <div className="settings-row-left">
                <span className="settings-row-icon">{r.icon}</span>
                <div><div className="settings-row-label">{r.label}</div><div className="settings-row-desc">{r.desc}</div></div>
              </div>
              <button className={`toggle-btn ${s[r.key] ? 'on' : 'off'}`} onClick={() => toggle(r.key)}>
                <span className="toggle-knob" />
              </button>
            </div>
          ))}
        </div>
        <div className="settings-danger-zone">
          <p className="danger-label">Danger Zone</p>
          <button className="danger-btn" onClick={() => { if(window.confirm('Clear all cached data?')) { localStorage.clear(); window.location.reload(); }}}>Clear App Data</button>
        </div>
      </div>
    </div>
  );
};

// ── Shop Modal ────────────────────────────────────────────────────────────────
const ShopModal = ({ onClose }) => {
  const [cat, setCat] = useState('All');
  const [cart, setCart] = useState([]);
  const filtered = SHOP_PRODUCTS.filter(p => cat === 'All' || p.category === cat);
  const addToCart = (id) => setCart(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass shop-modal-wide" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header">
          <div><h2>🛍️ Health Store</h2><p className="prof-modal-sub-inline">Premium products & supplements</p></div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            {cart.length > 0 && <span className="cart-pill">🛒 {cart.length}</span>}
            <button className="prof-modal-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="shop-cats">
          {SHOP_CATS.map(c => <button key={c} className={`shop-cat-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <div className="shop-grid">
          {filtered.map(p => (
            <div key={p.id} className="shop-card glass">
              {p.sponsored && <span className="ad-tag">Ad</span>}
              <div className="shop-emoji">{p.emoji}</div>
              <div className="shop-badge" style={{background:`${p.color}20`,color:p.color}}>{p.badge}</div>
              <div className="shop-name">{p.name}</div>
              <div className="shop-brand">{p.brand}</div>
              <div className="shop-desc">{p.description}</div>
              <div className="shop-rating">{'⭐'.repeat(Math.round(p.rating))} {p.rating} ({p.reviews.toLocaleString()})</div>
              <div className="shop-pricing">
                <span style={{color:p.color,fontWeight:800,fontFamily:'var(--font-number)'}}>₹{p.price}</span>
                <span className="shop-orig">₹{p.originalPrice}</span>
                <span className="shop-disc">-{p.discount}%</span>
              </div>
              <button className={`shop-cart-btn ${cart.includes(p.id)?'in-cart':''}`} style={cart.includes(p.id)?{borderColor:p.color,color:p.color}:{}} onClick={() => addToCart(p.id)}>
                {cart.includes(p.id) ? '✓ Added' : 'Add to Cart 🛒'}
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="shop-checkout-bar">
            <span className="checkout-info">{cart.length} items · ₹{SHOP_PRODUCTS.filter(p => cart.includes(p.id)).reduce((s,p)=>s+p.price,0).toLocaleString()}</span>
            <button className="checkout-btn-pill" onClick={() => alert('Payment integration coming soon! 🚀')}>Checkout →</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Premium Modal ─────────────────────────────────────────────────────────────
const PremiumModal = ({ onClose }) => {
  const [plan, setPlan] = useState('yearly');
  const [activated, setActivated] = useState(false);
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <button className="prof-modal-close" style={{position:'absolute',top:16,right:16}} onClick={onClose}>✕</button>
        <div className="premium-hero-section">
          <div className="premium-crown-big">👑</div>
          <h2 className="premium-title-big">Aacharyaa <span className="gold-text">Premium</span></h2>
          <p className="premium-sub">Unlock your full health potential</p>
        </div>
        {activated && <div className="premium-active-pill">✅ Premium Active — All features unlocked!</div>}
        <div className="premium-plans-row">
          {PREMIUM_PLANS.map(p => (
            <div key={p.id} className={`prem-plan ${plan===p.id?'selected':''} ${p.popular?'popular':''}`}
              style={plan===p.id?{borderColor:p.color,boxShadow:`0 0 20px ${p.color}30`}:{}} onClick={() => setPlan(p.id)}>
              {p.popular && <div className="prem-popular" style={{background:p.color}}>⭐ Most Popular</div>}
              <div className="prem-name" style={plan===p.id?{color:p.color}:{}}>{p.name}</div>
              <div className="prem-price-row"><span className="prem-price" style={plan===p.id?{color:p.color}:{}}>₹{p.price}</span><span className="prem-period">{p.period}</span></div>
              {p.savings && <div className="prem-savings" style={{background:`${p.color}20`,color:p.color}}>{p.savings}</div>}
              <ul className="prem-features">{p.features.map((f,i) => <li key={i}><span style={{color:p.color}}>✓</span> {f}</li>)}</ul>
            </div>
          ))}
        </div>
        <button className="prof-save-btn" style={{background: plan==='yearly'?'linear-gradient(135deg,#fbbf24,#f59e0b)':'linear-gradient(135deg,#a855f7,#06b6d4)'}}
          onClick={() => { setActivated(true); setTimeout(() => alert(`🎉 ${plan==='yearly'?'Yearly':'Monthly'} Plan Activated! (Demo)`), 200); }}>
          {activated ? '✓ Plan Active (Demo)' : `Activate ${plan==='yearly'?'Yearly':'Monthly'} Plan`}
        </button>
        <p className="prem-disclaimer">🔒 Demo mode · No real payment charged</p>
      </div>
    </div>
  );
};

// ── MAIN Profile ──────────────────────────────────────────────────────────────
const Profile = () => {
  const { state, dispatch } = useApp();
  const { user, xp, rank, streak, stats } = state;

  const [modal, setModal] = useState(null); // 'avatar' | 'edit' | 'refer' | 'settings' | 'shop' | 'premium'
  const [settings, setSettings] = useState({ notifications:true, dailyReminders:true, soundEffects:true, darkMode:true, shareProgress:false });
  const [avatarId, setAvatarId] = useState(user.avatarId || 'av1');

  const currentPreset = PRESET_AVATARS.find(a => a.id === avatarId) || PRESET_AVATARS[0];

  const saveAvatar = (id) => {
    setAvatarId(id);
    dispatch({ type: 'UPDATE_AVATAR', payload: { avatarId: id } });
  };

  const saveProfile = (form) => {
    dispatch({ type: 'SET_USER_NAME', payload: form.name });
    if (form.goal) dispatch({ type: 'SET_USER_GOAL', payload: { name: form.goal } });
    dispatch({ type: 'UPDATE_USER_BIO', payload: form.bio });
    dispatch({ 
      type: 'SET_HEALTH_CONDITION', 
      payload: { hasCondition: form.healthCondition, details: form.healthConditionDetails } 
    });
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

  return (
    <div className="profile-page">
      <TopBar title="Profile" showProgress={false} />

      <div className="profile-content">
        {/* ── Header Card ── */}
        <section className="fade-up">
          <GlassCard className="profile-header-card">
            <div className="prof-avatar-wrap" onClick={() => setModal('avatar')}>
              <AvatarBubble preset={currentPreset} size={88} />
              <div className="avatar-edit-badge">✏️</div>
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{user.name || 'Champion'}</h2>
              {user.bio && <p className="profile-bio">{user.bio}</p>}
              <p className="profile-goal-text">Goal: <span style={{color:'var(--neon-purple)'}}>{user.goal?.name || 'Not set'}</span></p>
              <div className="profile-rank-row" style={{color:rank.color}}>
                <span>{rank.icon}</span><span>{rank.name}</span><span>Rank {rank.id}</span>
              </div>
            </div>
            <button className="shop-icon-btn" onClick={() => setModal('shop')} title="Shop">🛍️</button>
          </GlassCard>
        </section>

        {/* ── Premium CTA ── */}
        <section className="fade-up">
          <GlassCard className="premium-cta-card" onClick={() => setModal('premium')}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <span className="premium-cta-crown">👑</span>
              <div><div className="premium-cta-title">Upgrade to Premium</div><div className="premium-cta-sub">AI coaching · Analytics · More →</div></div>
            </div>
            <div className="premium-cta-pill">Unlock →</div>
          </GlassCard>
        </section>

        {/* ── Stats ── */}
        <section className="fade-up">
          <h3 className="section-title">Your Stats</h3>
          <GlassCard className="stats-card">
            {[
              ['Total XP', xp],
              ['Current Streak', `${streak} days 🔥`],
              ['Missions Completed', stats.totalMissionsCompleted],
              ['Items Scanned', stats.totalScans],
              ['Health Status', user.healthCondition ? user.healthConditionDetails : 'Perfectly Healthy ✨'],
              ['Member Since', formatDate(stats.joinDate)],
            ].map(([label, val]) => (
              <div key={label} className="stat-row">
                <span className="stat-label">{label}</span>
                <span className="stat-value">{val}</span>
              </div>
            ))}
          </GlassCard>
        </section>

        {/* ── Settings (working toggles) ── */}
        <section className="fade-up">
          <h3 className="section-title">Settings</h3>
          <GlassCard className="settings-card">
            {[
              { key:'notifications', label:'Notifications', icon:'🔔' },
              { key:'dailyReminders', label:'Daily Reminders', icon:'⏰' },
              { key:'soundEffects', label:'Sound Effects', icon:'🔊' },
            ].map(r => (
              <div key={r.key} className="setting-row">
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span>{r.icon}</span>
                  <span className="stat-label">{r.label}</span>
                </div>
                <button className={`toggle-btn ${settings[r.key] ? 'on' : 'off'}`}
                  onClick={() => setSettings(p => ({...p, [r.key]: !p[r.key]}))}>
                  <span className="toggle-knob" />
                </button>
              </div>
            ))}
          </GlassCard>
        </section>

        {/* ── Quick Actions ── */}
        <section className="fade-up">
          <div className="quick-actions-grid">
            {[
              { icon:'🛍️', label:'Shop', action:'shop' },
              { icon:'👑', label:'Premium', action:'premium' },
              { icon:'🤝', label:'Refer', action:'refer' },
              { icon:'⚙️', label:'Settings', action:'settings' },
            ].map(btn => (
              <button key={btn.action} className="quick-action-btn" onClick={() => setModal(btn.action)}>
                <span className="qa-icon">{btn.icon}</span>
                <span className="qa-label">{btn.label}</span>
              </button>
            ))}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:12}}>
            <Button variant="secondary" fullWidth onClick={() => setModal('edit')}>Edit Profile</Button>
            <div style={{display:'flex', gap:10}}>
              <Button variant="ghost" style={{flex:1}} onClick={() => { 
                if(window.confirm('Reset all progress? Cannot be undone.')) { 
                  dispatch({type:'RESET_APP'}); 
                  window.location.reload(); 
                }
              }}>Reset Progress</Button>
              <Button variant="outline" style={{flex:1, borderColor:'#ef4444', color:'#ef4444'}} onClick={() => {
                if(window.confirm('Logout from Aacharyaa?')) {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('userId');
                  dispatch({type:'RESET_APP'});
                  window.location.href = '/';
                }
              }}>Logout 🚪</Button>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />

      {/* ── Modals ── */}
      {modal === 'avatar'    && <AvatarPickerModal current={avatarId} onSave={saveAvatar} onClose={() => setModal(null)} />}
      {modal === 'edit'      && <EditProfileModal user={user} onSave={saveProfile} onClose={() => setModal(null)} />}
      {modal === 'refer'     && <ReferModal userName={user.name} onClose={() => setModal(null)} />}
      {modal === 'settings'  && <SettingsModal settings={settings} onUpdate={setSettings} onClose={() => setModal(null)} />}
      {modal === 'shop'      && <ShopModal onClose={() => setModal(null)} />}
      {modal === 'premium'   && <PremiumModal onClose={() => setModal(null)} />}
    </div>
  );
};

export default Profile;
