import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '../../hooks/useGamificationStore';
import confetti from 'canvas-confetti';

export default function RankUpOverlay() {
  const { showRankUp, rank, closeRankUp } = useGamificationStore();

  useEffect(() => {
    if (showRankUp) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showRankUp]);

  return (
    <AnimatePresence>
      {showRankUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(7, 7, 15, 0.9)', zIndex: 1000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontFamily: "'Orbitron', sans-serif"
          }}
        >
          <motion.div
            initial={{ scale: 0.5, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '100px', marginBottom: '20px' }}>⚔️</div>
            <h2 style={{ fontSize: '24px', letterSpacing: '4px', margin: 0, opacity: 0.8 }}>RANK UP!</h2>
            <h1 style={{ 
              fontSize: '64px', margin: '10px 0', color: rank.auraColor,
              textShadow: `0 0 30px ${rank.auraColor}`
            }}>
              {rank.id} RANK
            </h1>
            <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '20px', maxWidth: '400px', opacity: 0.7 }}>
              You have ascended to {rank.name}. Your power grows stronger!
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeRankUp}
              style={{
                marginTop: '40px', background: 'transparent', border: `2px solid ${rank.auraColor}`,
                color: rank.auraColor, padding: '12px 32px', borderRadius: '30px',
                fontSize: '18px', fontWeight: 900, cursor: 'pointer',
                boxShadow: `0 0 15px ${rank.auraColor}44`
              }}
            >
              ASCEND →
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
