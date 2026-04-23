// Avatar Page - STRICT IMPLEMENTATION
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { avatarParts } from '../data/avatars';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import AvatarDisplay from '../components/features/AvatarDisplay';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import './Avatar.css';

const Avatar = () => {
  const { state, dispatch } = useApp();
  const [activeCategory, setActiveCategory] = useState('skin');

  const categories = [
    { id: 'skin', label: 'Skin', icon: '🎨' },
    { id: 'hair', label: 'Hair', icon: '💇' },
    { id: 'outfit', label: 'Outfit', icon: '👔' },
    { id: 'accessory', label: 'Accessory', icon: '👓' }
  ];

  const handlePartSelect = (partId) => {
    dispatch({
      type: 'UPDATE_AVATAR',
      payload: { [activeCategory]: partId }
    });
  };

  const currentParts = avatarParts[activeCategory];

  return (
    <div className="avatar-page">
      <TopBar title="Customize Avatar" showProgress={false} />
      
      <div className="avatar-content">
        <section className="avatar-preview-section fade-up">
          <GlassCard className="avatar-preview">
            <AvatarDisplay avatar={state.user.avatar} size="xl" />
          </GlassCard>
        </section>

        <section className="avatar-categories fade-up">
          <div className="categories-tabs glass">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="avatar-parts-section fade-up">
          <div className="parts-grid">
            {currentParts.map((part) => (
              <GlassCard
                key={part.id}
                className={`part-card ${state.user.avatar[activeCategory] === part.id ? 'selected' : ''} ${!part.unlocked ? 'locked' : ''}`}
                onClick={() => part.unlocked && handlePartSelect(part.id)}
                hover={part.unlocked}
              >
                <div className="part-preview" style={{ background: part.color || 'transparent' }}>
                  {!part.unlocked && <div className="lock-icon">🔒</div>}
                </div>
                <div className="part-info">
                  <h4 className="part-name">{part.name}</h4>
                  {!part.unlocked && part.requiredRank && (
                    <p className="part-requirement">Rank {part.requiredRank}</p>
                  )}
                </div>
                {state.user.avatar[activeCategory] === part.id && (
                  <div className="part-check">✓</div>
                )}
              </GlassCard>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Avatar;
