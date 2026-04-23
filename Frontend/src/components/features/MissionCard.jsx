// Mission Card - STRICT IMPLEMENTATION
import { useMissions } from '../../hooks/useMissions';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import './MissionCard.css';

const MissionCard = ({ mission }) => {
  const { completeMission } = useMissions();
  const { id, title, description, xp, icon, completed, category } = mission;

  const handleComplete = () => {
    if (!completed) {
      completeMission(id);
    }
  };

  return (
    <GlassCard className={`mission-card ${completed ? 'mission-completed' : ''}`}>
      <div className="mission-header">
        <div className="mission-icon">{icon}</div>
        <div className="mission-info">
          <h4 className="mission-title">{title}</h4>
          <p className="mission-category">{category}</p>
        </div>
        <div className="mission-xp">
          <span className="xp-value number">+{xp}</span>
          <span className="xp-label">XP</span>
        </div>
      </div>
      
      <p className="mission-description">{description}</p>
      
      <Button
        variant={completed ? 'secondary' : 'primary'}
        size="sm"
        fullWidth
        onClick={handleComplete}
        disabled={completed}
        icon={completed ? '✓' : null}
      >
        {completed ? 'Completed' : 'Complete Mission'}
      </Button>
      
      {completed && (
        <div className="mission-check-overlay">
          <svg className="check-icon" viewBox="0 0 50 50">
            <circle
              className="check-circle"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="var(--neon-green)"
              strokeWidth="3"
            />
            <path
              className="check-path check-animation"
              d="M15 25 L22 32 L35 18"
              fill="none"
              stroke="var(--neon-green)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </GlassCard>
  );
};

export default MissionCard;
