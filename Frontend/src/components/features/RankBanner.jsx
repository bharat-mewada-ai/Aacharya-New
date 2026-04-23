// Rank Banner - STRICT IMPLEMENTATION
import { getProgressToNextRank, getNextRank } from '../../data/ranks';
import GlassCard from '../ui/GlassCard';
import ProgressBar from '../ui/ProgressBar';
import './RankBanner.css';

const RankBanner = ({ rank, xp }) => {
  const nextRank = getNextRank(rank);
  const progress = getProgressToNextRank(xp, rank);

  return (
    <GlassCard className="rank-banner">
      <div className="rank-banner-content">
        <div className="current-rank" style={{ borderColor: rank.color }}>
          <div className="rank-icon-large">{rank.icon}</div>
          <div className="rank-details">
            <span className="rank-label">Current Rank</span>
            <h3 className="rank-name" style={{ color: rank.color }}>
              {rank.name}
            </h3>
            <span className="rank-letter" style={{ color: rank.color }}>
              Rank {rank.id}
            </span>
          </div>
        </div>
        
        {nextRank && (
          <>
            <div className="rank-arrow">→</div>
            
            <div className="next-rank" style={{ borderColor: nextRank.color }}>
              <div className="rank-icon-large">{nextRank.icon}</div>
              <div className="rank-details">
                <span className="rank-label">Next Rank</span>
                <h3 className="rank-name" style={{ color: nextRank.color }}>
                  {nextRank.name}
                </h3>
                <span className="rank-letter" style={{ color: nextRank.color }}>
                  Rank {nextRank.id}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      
      {nextRank && (
        <div className="rank-progress-section">
          <ProgressBar 
            progress={progress}
            color={`linear-gradient(90deg, ${rank.color}, ${nextRank.color})`}
            height={10}
          />
          <div className="rank-progress-info">
            <span className="number">{xp} XP</span>
            <span className="text-secondary">
              {nextRank.minXP - xp} XP to {nextRank.name}
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default RankBanner;
