import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { useGamificationStore } from '../../hooks/useGamificationStore';

import { XP_SOURCES } from '../../data/gamificationData';
import { PREMIUM_PLANS } from '../../data/shopData';
import { Flame, Droplets, CheckCircle, Trophy, RefreshCw, PlusCircle, LogOut, Crown } from 'lucide-react';

const PremiumModal = ({ onClose }) => {
  const [selectedPlan, setSelectedPlan] = React.useState('yearly');
  const [isActivated, setIsActivated] = React.useState(false);

  const handleActivate = () => {
    setIsActivated(true);
    setTimeout(() => {
      alert('Premium Activated! Welcome to the elite club. 🎉');
      onClose();
    }, 1500);
  };

  return (
    <div className="prof-modal-overlay" onClick={onClose} style={{ pointerEvents: 'auto' }}>
      <div className="prof-modal premium-modal-theme" onClick={e => e.stopPropagation()}>
        <button className="prof-modal-close premium-close-btn" onClick={onClose}>✕</button>
        
        <div className="premium-hero-section">
          <div className="premium-crown-big">👑</div>
          <h2 className="premium-title-big">
            Aacharyaa <span className="gold-text">Premium</span>
          </h2>
          <p className="premium-sub">Unlock your full health potential</p>
        </div>

        <div className="premium-plans-row">
          {PREMIUM_PLANS.map(plan => (
            <div 
              key={plan.id} 
              className={`prem-plan ${selectedPlan === plan.id ? 'active' : ''} plan-${plan.id}`}
              onClick={() => setSelectedPlan(plan.id)}
              style={{ borderColor: selectedPlan === plan.id ? plan.color : 'rgba(255,255,255,0.05)' }}
            >
              {plan.popular && <div className="prem-popular" style={{ background: plan.color }}>⭐ Most Popular</div>}
              <div className="prem-name">{plan.name}</div>
              <div className="prem-price-row">
                <span className="prem-price">₹{plan.price}</span>
                <span className="prem-period">{plan.period}</span>
              </div>
              {plan.savings && <div className="prem-savings">{plan.savings}</div>}
              <ul className="prem-features">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button className="prof-save-btn premium-activate-btn" onClick={handleActivate}>
          {isActivated ? 'Processing... 🚀' : `Activate ${selectedPlan === 'yearly' ? 'Yearly' : 'Monthly'} Plan`}
        </button>
        
        <p className="prem-disclaimer">Demo mode - No real payment charged</p>
      </div>
    </div>
  );
};

export default function GamifiedUI() {
  const { dispatch } = useApp();
  const { 
    totalXP, rank, level, stats, setAnimation, addXP, resetXP, currentAnimation 
  } = useGamificationStore();
  const [modal, setModal] = React.useState(null);


  const handleLogout = () => {
    if(window.confirm('Logout from Aacharyaa?')) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const nextRank = rank.index < 8 ? rank : null; // simplified logic for progress
  const progress = (totalXP % 100); // 100 XP per level for progress bar

  return (
    <div className="gamified-ui-overlay" style={{ 
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
      zIndex: 10, pointerEvents: 'none', color: 'white', fontFamily: "'Rajdhani', sans-serif" 
    }}>
      
      {/* Top Bar */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', padding: '20px', 
        pointerEvents: 'auto' 
      }}>
        <div style={{ 
          fontSize: '24px', fontWeight: 900, fontFamily: "'Orbitron', sans-serif",
          textShadow: `0 0 10px ${rank.auraColor}88`
        }}>
          AACHARYA
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            onClick={() => setModal('premium')}
            style={{ 
              background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', 
              border: '1px solid rgba(251, 191, 36, 0.4)', borderRadius: '50%', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              fontSize: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 0 15px rgba(251, 191, 36, 0.3)'
            }}
          >
            <Crown size={20} />
          </button>

          <button 
            onClick={() => dispatch({ type: 'TOGGLE_SHOP' })}
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)', color: 'white', 
              border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              fontSize: '20px', backdropFilter: 'blur(10px)'
            }}
          >
            🛍️
          </button>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
            padding: '4px 16px', borderRadius: '20px', border: `1px solid ${rank.auraColor}`,
            boxShadow: `0 0 15px ${rank.auraColor}44`, fontWeight: 700
          }}>
            {rank.id} RANK
          </div>

          
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'rgba(239, 68, 68, 0.2)', color: '#ff6b6b', 
              border: '1px solid #ff6b6b', borderRadius: '50%', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Left HUD: Stats (Removed slide animations) */}
      <div style={{ 
          position: 'absolute', left: '20px', top: '100px', width: '160px',
          display: 'flex', flexDirection: 'column', gap: '12px', pointerEvents: 'auto'
        }}
      >
        <StatCard icon={<Flame size={16} />} label="Calories" value={stats.calories} color={rank.auraColor} />
        <StatCard icon={<Droplets size={16} />} label="Water" value={stats.waterIntake} color="#3b82f6" />
        <StatCard icon={<CheckCircle size={16} />} label="Tasks" value={stats.tasksCompleted} color="#10b981" />
      </div>

      {/* Right HUD: XP & Level (Removed slide animations) */}
      <div style={{ 
          position: 'absolute', right: '20px', top: '100px', width: '200px',
          display: 'flex', flexDirection: 'column', gap: '12px', pointerEvents: 'auto'
        }}
      >
        <div className="glass-card" style={{ 
          padding: '12px', borderRadius: '12px', background: 'rgba(13,13,26,0.7)',
          border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', opacity: 0.7 }}>LEVEL</span>
            <span style={{ fontWeight: 900 }}>{level}</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <motion.div 
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: rank.auraColor, boxShadow: `0 0 10px ${rank.auraColor}` }}
            />
          </div>
          <div style={{ textAlign: 'right', fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>
            {totalXP.toLocaleString()} XP
          </div>
        </div>
      </div>

      {/* Bottom Section: Rank Info & Controls */}
      <div style={{ 
        position: 'absolute', bottom: '100px', width: '100%', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'
      }}>
        <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
          <h1 
            style={{ 
              fontFamily: "'Orbitron', sans-serif", fontSize: '42px', margin: 0,
              color: rank.auraColor, textShadow: `0 0 20px ${rank.auraColor}`
            }}
          >
            {rank.name.toUpperCase()}
          </h1>
          <p style={{ margin: '5px 0', opacity: 0.8, fontStyle: 'italic' }}>"{rank.quote}"</p>
        </div>

        {/* Debug/XP Buttons (Simplified) */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '12px' }}>
          <XPButton label="+100" amount={100} onClick={addXP} color={rank.auraColor} />
          <XPButton label="+500" amount={500} onClick={addXP} color={rank.auraColor} />
          <XPButton label="+2K" amount={2000} onClick={addXP} color={rank.auraColor} />
          <XPButton label="+10K" amount={10000} onClick={addXP} color={rank.auraColor} />
          <button onClick={resetXP} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {modal === 'premium' && <PremiumModal onClose={() => setModal(null)} />}

    </div>
  );
}


function StatCard({ icon, label, value, color }) {
  return (
    <div className="glass-card" style={{ 
      padding: '10px', borderRadius: '12px', background: 'rgba(13,13,26,0.7)',
      border: `1px solid ${color}33`, backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', gap: '10px'
    }}>
      <div style={{ color }}>{icon}</div>
      <div>
        <div style={{ fontSize: '10px', opacity: 0.6, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontWeight: 700, fontSize: '14px' }}>{value.toLocaleString()}</div>
      </div>
    </div>
  );
}

function XPButton({ label, amount, onClick, color }) {
  return (
    <button 
      onClick={() => onClick(amount)}
      style={{ 
        background: 'rgba(255,255,255,0.05)', border: `1px solid ${color}44`,
        color: 'white', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer',
        fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px'
      }}
    >
      <PlusCircle size={12} /> {label}
    </button>
  );
}
