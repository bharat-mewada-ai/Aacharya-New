// Home Dashboard - COMPLETELY REDESIGNED
import Avatar from "../components/Avatar"; 
import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useMissions } from '../hooks/useMissions';
import { useStreak } from '../hooks/useStreak';
import { useNavigate } from 'react-router-dom';
import AvatarDisplay from '../components/features/AvatarDisplay';
import ProgressRing from '../components/ui/ProgressRing';
import GlassCard from '../components/ui/GlassCard';
import BottomNav from '../components/layout/BottomNav';
import ConfettiCanvas from '../components/canvas/ConfettiCanvas';
import RankUpCinematic from '../components/canvas/RankUpCinematic';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const { getDailyMissions, completeMission, showConfetti, hideConfetti } = useMissions();
  const { streak } = useStreak();
  const { user, rank, xp, showRankUpCinematic } = state;

  const dailyMissions = getDailyMissions();
  const completedCount = dailyMissions.filter(m => m.completed).length;
  const totalTasks = dailyMissions.length;
  const completionPercentage = (completedCount / totalTasks) * 100;

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Calculate health score (mock data)
  const healthScore = Math.min(100, Math.round((completedCount / totalTasks) * 100 + streak * 2));

  // Mock stats
  const stats = {
    calories: 1847,
    caloriesGoal: 2000,
    steps: 8234,
    stepsGoal: 10000,
    water: 6,
    waterGoal: 8
  };

  return (
    <div className="home-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="greeting-section">
            <h1 className="greeting">{getGreeting()}</h1>
            <h2 className="user-name">{user.name || 'Champion'}</h2>
            <div className="streak-badge">
              <span className="streak-icon">🔥</span>
              <span className="streak-count">{streak}d</span>
            </div>
          </div>
          <div className="avatar-section" onClick={() => navigate('/avatar')}>
            <AvatarDisplay avatar={user.avatar} size="lg" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Stats Cards Row */}
        <section className="stats-row">
          {/* Health Score */}
          <GlassCard className="stat-card health-card">
            <div className="card-header">
              <h3 className="card-title">Health Score</h3>
            </div>
            <div className="health-score-container">
              <ProgressRing 
                progress={healthScore} 
                size={120} 
                strokeWidth={10}
                color="var(--neon-purple)"
              >
                <div className="score-content">
                  <span className="score-value">{healthScore}</span>
                  <span className="score-label">Score</span>
                </div>
              </ProgressRing>
            </div>
          </GlassCard>

          {/* Quick Stats */}
          <div className="quick-stats">
            <GlassCard className="stat-card mini-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <span className="stat-value">{stats.calories}</span>
                <span className="stat-label">Calories</span>
              </div>
              <div className="stat-progress">
                <div 
                  className="stat-bar" 
                  style={{ width: `${(stats.calories / stats.caloriesGoal) * 100}%` }}
                />
              </div>
            </GlassCard>

            <GlassCard className="stat-card mini-card">
              <div className="stat-icon">👟</div>
              <div className="stat-info">
                <span className="stat-value">{stats.steps.toLocaleString()}</span>
                <span className="stat-label">Steps</span>
              </div>
              <div className="stat-progress">
                <div 
                  className="stat-bar" 
                  style={{ width: `${(stats.steps / stats.stepsGoal) * 100}%` }}
                />
              </div>
            </GlassCard>

            <GlassCard className="stat-card mini-card">
              <div className="stat-icon">💧</div>
              <div className="stat-info">
                <span className="stat-value">{stats.water}/{stats.waterGoal}</span>
                <span className="stat-label">Water</span>
              </div>
              <div className="stat-progress">
                <div 
                  className="stat-bar" 
                  style={{ width: `${(stats.water / stats.waterGoal) * 100}%` }}
                />
              </div>
            </GlassCard>
          </div>
        </section>

        {/* XP Progress Section */}
        <section className="xp-section">
          <GlassCard className="xp-card">
            <div className="xp-header">
              <div className="rank-info">
                <span className="current-rank" style={{ color: rank.color }}>
                  {rank.icon} Rank {rank.id}
                </span>
                <span className="rank-name">{rank.name}</span>
              </div>
              <span className="xp-value">{xp} XP</span>
            </div>
            <div className="xp-progress-bar">
              <div 
                className="xp-fill" 
                style={{ 
                  width: `${(xp % 500) / 5}%`,
                  background: `linear-gradient(90deg, ${rank.color}, var(--neon-cyan))`
                }}
              />
            </div>
            <div className="xp-labels">
              <span className="xp-label">C</span>
              <span className="xp-label">B</span>
              <span className="xp-label">A</span>
              <span className="xp-label">S</span>
            </div>
          </GlassCard>
        </section>

        {/* Daily Tasks Section */}
        <section className="tasks-section">
          <div className="section-header">
            <h3 className="section-title">Daily Tasks</h3>
            <span className="task-count">{completedCount}/{totalTasks}</span>
          </div>
          
          <div className="tasks-list">
            {dailyMissions.map((task) => (
              <GlassCard 
                key={task.id} 
                className={`task-card ${task.completed ? 'completed' : ''}`}
                onClick={() => !task.completed && completeMission(task.id)}
              >
                <div className="task-icon">{task.icon}</div>
                <div className="task-info">
                  <h4 className={`task-title ${task.completed ? 'strike' : ''}`}>
                    {task.title}
                  </h4>
                  <p className="task-description">{task.description}</p>
                </div>
                <div className="task-reward">
                  <span className="xp-badge">+{task.xp} XP</span>
                  {task.completed && (
                    <div className="check-icon">✓</div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>

          <button 
            className="view-all-btn"
            onClick={() => navigate('/missions')}
          >
            View All Missions →
          </button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Effects */}
      {showConfetti && <ConfettiCanvas active={true} onComplete={hideConfetti} />}
      {showRankUpCinematic && <RankUpCinematic rank={rank} onComplete={() => dispatch({ type: 'HIDE_RANK_UP_CINEMATIC' })} />}
    </div>
  );
};

export default Home;
