// Progress Page - STRICT IMPLEMENTATION
import { useApp } from '../context/AppContext';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import RankBanner from '../components/features/RankBanner';
import TrendChart from '../components/features/TrendChart';
import GlassCard from '../components/ui/GlassCard';
import Badge from '../components/ui/Badge';
import './Progress.css';

const Progress = () => {
  const { state } = useApp();
  const { xp, rank, badges, stats, streak } = state;

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  // Mock weekly XP data
  const weeklyXP = [
    { label: 'Mon', value: 120 },
    { label: 'Tue', value: 150 },
    { label: 'Wed', value: 90 },
    { label: 'Thu', value: 180 },
    { label: 'Fri', value: 200 },
    { label: 'Sat', value: 160 },
    { label: 'Sun', value: 140 }
  ];

  return (
    <div className="progress-page">
      <TopBar title="Progress" />
      
      <div className="progress-content">
        <section className="rank-section fade-up">
          <RankBanner rank={rank} xp={xp} />
        </section>

        <section className="stats-section fade-up">
          <h2 className="section-title">Statistics</h2>
          <div className="stats-grid">
            <GlassCard className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-value number">{stats.totalMissionsCompleted}</div>
              <div className="stat-label">Missions</div>
            </GlassCard>
            
            <GlassCard className="stat-card">
              <div className="stat-icon">📸</div>
              <div className="stat-value number">{stats.totalScans}</div>
              <div className="stat-label">Scans</div>
            </GlassCard>
            
            <GlassCard className="stat-card">
              <div className="stat-icon">💬</div>
              <div className="stat-value number">{stats.totalChatMessages}</div>
              <div className="stat-label">Messages</div>
            </GlassCard>
            
            <GlassCard className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-value number">{streak}</div>
              <div className="stat-label">Day Streak</div>
            </GlassCard>
          </div>
        </section>

        <section className="chart-section fade-up">
          <GlassCard>
            <TrendChart 
              data={weeklyXP}
              label="Weekly XP Progress"
              color="var(--neon-purple)"
            />
          </GlassCard>
        </section>

        <section className="badges-section fade-up">
          <h2 className="section-title">Badges</h2>
          
          {unlockedBadges.length > 0 && (
            <div className="badges-subsection">
              <h3 className="subsection-title">Unlocked ({unlockedBadges.length})</h3>
              <div className="badges-grid">
                {unlockedBadges.map((badge) => (
                  <Badge key={badge.id} badge={badge} size="md" showLock={false} />
                ))}
              </div>
            </div>
          )}
          
          {lockedBadges.length > 0 && (
            <div className="badges-subsection">
              <h3 className="subsection-title">Locked ({lockedBadges.length})</h3>
              <div className="badges-grid">
                {lockedBadges.map((badge) => (
                  <Badge key={badge.id} badge={badge} size="sm" showLock={true} />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Progress;
