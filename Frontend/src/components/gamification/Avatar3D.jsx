import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useGLTF, useAnimations, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useGamificationStore } from '../../hooks/useGamificationStore';

const MODEL_PATHS = [
  '/models/model (2).glb',  // Rank E
  '/models/model (1).glb',  // Rank D
  '/models/model (3).glb',  // Rank C
  '/models/model (4).glb',  // Rank B
  '/models/model (5).glb',  // Rank A
  '/models/model (6).glb',  // Rank S
  '/models/model (7).glb',  // Rank SS
  '/models/model.glb',      // Rank SSS & ∞
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

export default function Avatar3D() {
  const { rank } = useGamificationStore();
  const rankIndex = Math.min(rank.index, MODEL_PATHS.length - 1);
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
          <Model path={MODEL_PATHS[rankIndex]} isLevelUp={transitioning} />
        </Suspense>
      </Float>
    </group>
  );
}

// Preload all models
MODEL_PATHS.forEach(path => useGLTF.preload(path));
