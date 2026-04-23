// Rank Up Cinematic - FIXED: auto-dismiss with proper animation
import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import './RankUpCinematic.css';

const RankUpCinematic = ({ rank, onComplete }) => {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'exit'

  useEffect(() => {
    // After 2.8s show it, then after 0.5s exit animation starts
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 2800);

    // After exit animation (0.5s), call onComplete to remove from DOM
    const doneTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3300);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`rank-up-cinematic-wrapper ${phase}`}>
      <div className="cinematic-overlay" />
      <div className="cinematic-content">
        <div className="rank-icon-massive float">{rank.icon}</div>
        <h1 className="rank-title fade-up" style={{ color: rank.color }}>
          RANK UP!
        </h1>
        <h2 className="rank-name-large fade-up" style={{ color: rank.color, animationDelay: '0.2s' }}>
          {rank.name}
        </h2>
        <p className="rank-letter-large fade-up" style={{ color: rank.color, animationDelay: '0.4s' }}>
          Rank {rank.id}
        </p>
        <div className="rank-glow" style={{ boxShadow: `0 0 100px ${rank.color}` }} />
        <p className="rank-tap-hint fade-up" style={{ animationDelay: '0.8s' }}>
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
};

export default RankUpCinematic;
