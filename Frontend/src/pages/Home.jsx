// Home Dashboard - COMPLETELY REDESIGNED
import Avatar from "../components/Avatar"; 
import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useMissions } from '../hooks/useMissions';
import { useStreak } from '../hooks/useStreak';
import { usePedometer } from '../hooks/usePedometer';
import { useNavigate } from 'react-router-dom';
import { SHOP_PRODUCTS, SHOP_CATS, PRESET_AVATARS } from '../data/shopData';
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
  const { getDailyMissions, completeMission, addMission, removeMission, showConfetti, hideConfetti } = useMissions();
  const { streak } = useStreak();
  const { user, rank, xp, showRankUpCinematic } = state;
  const { isTracking, toggleTracking, currentSpeed, error } = usePedometer();

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // 'calories', 'steps', 'water'
  const [inputValue, setInputValue] = useState('');
  const [speedValue, setSpeedValue] = useState('');

  const handleUpdateStat = () => {
    if (activeInput === 'calories' && inputValue) {
      dispatch({ type: 'LOG_CALORIES', payload: parseInt(inputValue, 10) });
    } else if (activeInput === 'water' && inputValue) {
      dispatch({ type: 'LOG_WATER', payload: parseInt(inputValue, 10) });
    }
    setActiveInput(null);
    setInputValue('');
  };

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

  // Calculate dynamic goals based on age, weight, and user goal
  const weightVal = parseFloat(user.weight) || 70;
  let caloriesGoal = weightVal * 24; // Simple BMR approx
  if (user.goal?.id === 'weight-loss') caloriesGoal -= 500;
  else if (user.goal?.id === 'muscle-gain') caloriesGoal += 500;
  
  // Daily tracking data from state
  const stats = {
    calories: state.dailyTracking?.calories || 0,
    caloriesGoal: Math.round(caloriesGoal),
    steps: state.dailyTracking?.steps || 0,
    stepsGoal: 10000,
    speed: state.dailyTracking?.speed || 0,
    water: state.dailyTracking?.water || 0,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              className="shop-header-btn" 
              onClick={() => dispatch({ type: 'TOGGLE_SHOP' })} 
              style={{ 
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', width: '45px', height: '45px', fontSize: '20px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              🛍️
            </button>

            <div 
              className="avatar-section" 
              onClick={() => navigate('/profile')}
              style={{ 
                cursor: 'pointer',
                width: '45px', 
                height: '45px', 
                borderRadius: '50%',
                background: PRESET_AVATARS.find(a => a.id === user.avatarId)?.bg || 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                border: '2px solid rgba(255,255,255,0.2)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
              }}
            >
              {PRESET_AVATARS.find(a => a.id === user.avatarId)?.emoji || '👤'}
            </div>

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
            <GlassCard className="stat-card mini-card" onClick={() => setActiveInput('calories')} style={{cursor: 'pointer'}}>
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <span className="stat-value">{stats.calories}/{stats.caloriesGoal}</span>
                <span className="stat-label">Calories</span>
              </div>
              <div className="stat-progress">
                <div 
                  className="stat-bar" 
                  style={{ width: `${Math.min(100, (stats.calories / stats.caloriesGoal) * 100)}%` }}
                />
              </div>
            </GlassCard>

            <GlassCard 
              className={`stat-card mini-card ${isTracking ? 'tracking-active' : ''}`} 
              onClick={toggleTracking} 
              style={{cursor: 'pointer', position: 'relative', border: isTracking ? '1px solid var(--neon-green)' : 'none'}}
            >
              <div className="stat-icon">{isTracking ? '🏃' : '👟'}</div>
              <div className="stat-info">
                <span className="stat-value">
                  {stats.steps.toLocaleString()} 
                </span>
                <span className="stat-label">
                  {isTracking ? `${currentSpeed} km/h` : 'Tap to Track'}
                </span>
              </div>
              <div className="stat-progress">
                <div 
                  className="stat-bar" 
                  style={{ width: `${Math.min(100, (stats.steps / stats.stepsGoal) * 100)}%`, background: isTracking ? 'var(--neon-green)' : '' }}
                />
              </div>
              {isTracking && (
                <div style={{position: 'absolute', top: '5px', right: '5px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-green)', boxShadow: '0 0 8px var(--neon-green)', animation: 'pulse 1.5s infinite'}}></div>
              )}
            </GlassCard>

            <GlassCard className="stat-card mini-card" onClick={() => setActiveInput('water')} style={{cursor: 'pointer'}}>
              <div className="stat-icon">💧</div>
              <div className="stat-info">
                <span className="stat-value">{stats.water}/{stats.waterGoal}</span>
                <span className="stat-label">Water</span>
              </div>
              <div className="stat-progress">
                <div 
                  className="stat-bar" 
                  style={{ width: `${Math.min(100, (stats.water / stats.waterGoal) * 100)}%` }}
                />
              </div>
            </GlassCard>
          </div>

          {activeInput && (
            <GlassCard className="stat-input-card" style={{ marginTop: '10px', padding: '15px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input 
                  type="number" 
                  className="glass"
                  placeholder={`Add ${activeInput}...`} 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                  style={{ flex: 1, padding: '10px', minWidth: '100px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button 
                    onClick={handleUpdateStat}
                    style={{ background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setActiveInput(null)}
                    style={{ background: 'rgba(255,50,50,0.2)', color: '#ff6b6b', border: 'none', borderRadius: '8px', padding: '10px 15px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </GlassCard>
          )}
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
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span className="task-count">{completedCount}/{totalTasks}</span>
              <button 
                className="add-task-btn" 
                onClick={() => setShowAddTask(!showAddTask)}
                style={{
                  background: 'var(--primary-color)', color: 'white', 
                  border: 'none', borderRadius: '50%', width: '30px', height: '30px', 
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px'
                }}
              >
                {showAddTask ? '×' : '+'}
              </button>
            </div>
          </div>

          {showAddTask && (
            <div className="add-task-container" style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
              <input 
                type="text" 
                className="glass"
                placeholder="What do you want to achieve?" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && newTaskTitle.trim() && (() => {
                  addMission({
                    id: Date.now(),
                    title: newTaskTitle,
                    description: 'Custom daily task',
                    xp: 50,
                    icon: '📌',
                    completed: false,
                    type: 'daily'
                  });
                  setNewTaskTitle('');
                  setShowAddTask(false);
                })()}
                style={{flex: 1, padding: '10px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white'}}
              />
              <button 
                onClick={() => {
                  if (newTaskTitle.trim()) {
                    addMission({
                      id: Date.now(),
                      title: newTaskTitle,
                      description: 'Custom daily task',
                      xp: 50,
                      icon: '📌',
                      completed: false,
                      type: 'daily'
                    });
                    setNewTaskTitle('');
                    setShowAddTask(false);
                  }
                }}
                style={{
                  background: 'var(--primary-color)', color: 'white',
                  border: 'none', borderRadius: '12px', padding: '0 20px', cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
          )}
          
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
                <div className="task-reward" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span className="xp-badge">+{task.xp} XP</span>
                  {task.completed && (
                    <div className="check-icon">✓</div>
                  )}
                  <button 
                    className="delete-task-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMission(task.id);
                    }}
                    style={{
                      background: 'rgba(255,50,50,0.2)', border: 'none', color: '#ff6b6b',
                      borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'
                    }}
                  >
                    ✕
                  </button>
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
