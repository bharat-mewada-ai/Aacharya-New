// Streak Card - STRICT IMPLEMENTATION
import GlassCard from '../ui/GlassCard';
import './StreakCard.css';

const StreakCard = ({ streak }) => {
  const milestones = [7, 14, 30, 60, 100];
  const nextMilestone = milestones.find(m => m > streak) || milestones[milestones.length - 1];
  const progress = (streak / nextMilestone) * 100;

  return (
    <GlassCard className="streak-card">
      <div className="streak-header">
        <div className="streak-icon-large pulse">🔥</div>
        <div className="streak-info">
          <h3 className="streak-title">Daily Streak</h3>
          <p className="streak-count number">{streak} Days</p>
        </div>
      </div>
      
      <div className="streak-progress">
        <div className="streak-bar">
          <div 
            className="streak-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="streak-milestone">
          Next milestone: <span className="number">{nextMilestone}</span> days
        </p>
      </div>
      
      <div className="streak-milestones">
        {milestones.map((milestone) => (
          <div 
            key={milestone}
            className={`milestone ${streak >= milestone ? 'achieved' : ''}`}
          >
            <div className="milestone-icon">
              {streak >= milestone ? '✓' : milestone}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default StreakCard;
