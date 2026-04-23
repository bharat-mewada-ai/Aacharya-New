// Badge Component - STRICT IMPLEMENTATION
import './Badge.css';

const Badge = ({ badge, size = 'md', showLock = true }) => {
  const { icon, name, rarity, unlocked } = badge;

  return (
    <div className={`badge badge-${size} badge-${rarity} ${!unlocked ? 'badge-locked' : ''}`}>
      <div className="badge-icon">
        {unlocked ? icon : (showLock ? '🔒' : icon)}
      </div>
      <div className="badge-name">{name}</div>
      {!unlocked && showLock && <div className="badge-overlay" />}
    </div>
  );
};

export default Badge;
