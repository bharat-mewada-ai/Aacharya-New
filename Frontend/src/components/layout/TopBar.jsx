// Top Bar - STRICT IMPLEMENTATION
import { useApp } from '../../context/AppContext';
import { getProgressToNextRank, getNextRank } from '../../data/ranks';
import './TopBar.css';

const TopBar = ({ title, showProgress = true }) => {
  const { state } = useApp();
  const { xp, rank, streak } = state;
  const nextRank = getNextRank(rank);
  const progress = getProgressToNextRank(xp, rank);

  return (
    <div className="top-bar glass">
      <div className="top-bar-content">
        <div className="top-bar-left">
          <h2 className="top-bar-title">{title}</h2>
        </div>
        
        {showProgress && (
          <div className="top-bar-right">
            <div className="streak-badge">
              <span className="streak-icon">🔥</span>
              <span className="streak-count number">{streak}</span>
            </div>
            
            <div className="rank-info">
              <div className="rank-badge" style={{ color: rank.color }}>
                <span className="rank-icon">{rank.icon}</span>
                <span className="rank-letter">{rank.id}</span>
              </div>
              
              {nextRank && (
                <div className="xp-progress">
                  <div className="xp-bar">
                    <div 
                      className="xp-fill" 
                      style={{ 
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${rank.color}, ${nextRank.color})`
                      }}
                    />
                  </div>
                  <span className="xp-text number">{xp} XP</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
