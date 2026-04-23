// Missions Page - STRICT IMPLEMENTATION
import { useState } from 'react';
import { useMissions } from '../hooks/useMissions';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import MissionCard from '../components/features/MissionCard';
import ConfettiCanvas from '../components/canvas/ConfettiCanvas';
import './Missions.css';

const Missions = () => {
  const { getDailyMissions, getWeeklyMissions, getChallengeMissions, showConfetti, hideConfetti } = useMissions();
  const [activeTab, setActiveTab] = useState('daily');

  const tabs = [
    { id: 'daily', label: 'Daily', icon: '☀️' },
    { id: 'weekly', label: 'Weekly', icon: '📅' },
    { id: 'challenge', label: 'Challenges', icon: '🏆' }
  ];

  const getMissions = () => {
    switch (activeTab) {
      case 'daily':
        return getDailyMissions();
      case 'weekly':
        return getWeeklyMissions();
      case 'challenge':
        return getChallengeMissions();
      default:
        return [];
    }
  };

  const missions = getMissions();
  const completedCount = missions.filter(m => m.completed).length;

  return (
    <div className="missions-page">
      <TopBar title="Missions" />
      
      <div className="missions-content">
        <div className="missions-tabs glass">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="missions-stats glass">
          <div className="stat-item">
            <span className="stat-value number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value number">{missions.length - completedCount}</span>
            <span className="stat-label">Remaining</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value number">
              {missions.reduce((sum, m) => m.completed ? sum + m.xp : sum, 0)}
            </span>
            <span className="stat-label">XP Earned</span>
          </div>
        </div>

        <div className="missions-list">
          {missions.length > 0 ? (
            missions.map((mission) => (
              <div key={mission.id} className="mission-item fade-up">
                <MissionCard mission={mission} />
              </div>
            ))
          ) : (
            <div className="empty-state glass">
              <div className="empty-icon">🎯</div>
              <h3 className="empty-title">No missions available</h3>
              <p className="empty-description">Check back later for new challenges!</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
      
      {showConfetti && <ConfettiCanvas active={true} onComplete={hideConfetti} />}
    </div>
  );
};

export default Missions;
