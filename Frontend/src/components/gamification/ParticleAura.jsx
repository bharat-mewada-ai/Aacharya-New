import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGamificationStore } from '../../hooks/useGamificationStore';

export default function ParticleAura() {
  const points = useRef();
  const { rank } = useGamificationStore();
  const rankIndex = rank.index;

  const count = 100 + rankIndex * 20; // Reduced count
  
  const [positions, initialY, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const yInitial = new Float32Array(count);
    const spd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 0.7; // Tighter radius
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.random() * 3;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      yInitial[i] = pos[i * 3 + 1];
      spd[i] = 0.005 + Math.random() * 0.015; // Slower speed
    }
    return [pos, yInitial, spd];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const posAttr = points.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      // Rise upward
      posAttr.array[i * 3 + 1] += speeds[i] * (1 + rankIndex * 0.1);
      
      // Subtle Wobble
      posAttr.array[i * 3] += Math.sin(t + i) * 0.003;
      posAttr.array[i * 3 + 2] += Math.cos(t + i) * 0.003;

      // Reset
      if (posAttr.array[i * 3 + 1] > 2.5) {
        posAttr.array[i * 3 + 1] = 0;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03 + rankIndex * 0.005} // Smaller size
        color={rank.auraColor}
        transparent
        opacity={0.3} // More transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
