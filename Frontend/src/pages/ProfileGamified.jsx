import React from 'react';
import GamifiedScene from '../components/gamification/GamifiedScene';
import GamifiedUI from '../components/gamification/GamifiedUI';
import RankUpOverlay from '../components/gamification/RankUpOverlay';
import BottomNav from '../components/layout/BottomNav';
import { useApp } from '../context/AppContext';
import { useGamificationStore } from '../hooks/useGamificationStore';
import './ProfileGamified.css';

export default function ProfileGamified() {
  const { state } = useApp();
  const { totalXP, addXP, stats } = useGamificationStore();

  // Sync XP and Stats from AppContext to GamificationStore
  React.useEffect(() => {
    // Sync XP
    if (state.xp > totalXP) {
      addXP(state.xp - totalXP);
    }

    // Sync Stats directly to store if they differ significantly (simplified)
    // In a real app, you'd have a specific action for this, but for now we'll let addXP handle derivation
    // or manually override if needed. 
  }, [state.xp, totalXP, addXP]);

  return (
    <div className="profile-gamified-page" style={{ 
      width: '100vw', height: '100vh', background: '#07070f', overflow: 'hidden',
      position: 'relative'
    }}>
      {/* 3D Scene Background */}
      <GamifiedScene />

      {/* UI Overlay */}
      <GamifiedUI />

      {/* Cinematic Rank Up */}
      <RankUpOverlay />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

