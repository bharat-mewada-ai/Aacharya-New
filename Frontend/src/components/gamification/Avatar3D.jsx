import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useGLTF, useAnimations, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';
import { useGamificationStore } from '../../hooks/useGamificationStore';

const BOY_MODELS = [
  '/models/model (1).glb', // Rank E (Novice)
  '/models/model (2).glb', // Rank D (Apprentice)
  '/models/model.glb',     // Rank C (Adept)
  '/models/model.glb',     // Rank B
  '/models/model.glb',     // Rank A
  '/models/model.glb',     // Rank S
  '/models/model.glb',     // Rank SS
  '/models/model.glb',     // Rank SSS & ∞
];

const GIRL_MODELS = [
  '/models/model (3).glb', // Rank E (Novice)
  '/models/model (4).glb', // Rank D (Apprentice)
  '/models/model (5).glb', // Rank C (Adept)
  '/models/model (5).glb', // Rank B
  '/models/model (5).glb', // Rank A
  '/models/model (5).glb', // Rank S
  '/models/model (5).glb', // Rank SS
  '/models/model (5).glb', // Rank SSS & ∞
];

function Model({ path, isLevelUp }) {
  const group = useRef();
  const { scene, animations } = useGLTF(path);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    // Reset and stop everything
    Object.values(actions).forEach(a => a.fadeOut(0.2));

    const idle = actions['IDLE'] || actions['idle'] || actions[Object.keys(actions)[0]];
    const victory = actions['VICTORY'] || actions['victory'] || actions['POWER_UP'] || actions['power_up'];

    if (isLevelUp && victory) {
      victory.reset().fadeIn(0.2).setLoop(THREE.LoopOnce, 1).play();
      victory.clampWhenFinished = true;
      const t = setTimeout(() => idle?.reset().fadeIn(0.5).play(), victory.getClip().duration * 1000);
      return () => clearTimeout(t);
    } else {
      idle?.reset().fadeIn(0.5).play();
    }
  }, [path, actions, isLevelUp]);

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

export default function Avatar3D({ gender: overrideGender }) {
  const { state } = useApp();
  const { user } = state;
  const { rank } = useGamificationStore();
  
  const currentGender = overrideGender || user.gender;
  const modelPaths = currentGender === 'girl' ? GIRL_MODELS : BOY_MODELS;
  const rankIndex = Math.min(rank.index, modelPaths.length - 1);
  const [transitioning, setTransitioning] = useState(false);
  const prevRank = useRef(rankIndex);

  useEffect(() => {
    if (rankIndex !== prevRank.current) {
      setTransitioning(true);
      const timer = setTimeout(() => {
        setTransitioning(false);
        prevRank.current = rankIndex;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [rankIndex]);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Visual Burst Effect during transition */}
      {transitioning && (
        <group position={[0, 1, 0]}>
          <Sparkles count={100} scale={2} size={6} speed={2} color={rank.auraColor} />
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color={rank.auraColor} transparent opacity={0.5} />
          </mesh>
        </group>
      )}

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Suspense fallback={<mesh><boxGeometry args={[0.5, 1, 0.5]} /><meshStandardMaterial wireframe color={rank.auraColor} /></mesh>}>
          <Model path={modelPaths[rankIndex]} isLevelUp={transitioning} />
        </Suspense>
      </Float>
    </group>
  );
}

// Preload all models
BOY_MODELS.forEach(path => useGLTF.preload(path));
GIRL_MODELS.forEach(path => useGLTF.preload(path));
