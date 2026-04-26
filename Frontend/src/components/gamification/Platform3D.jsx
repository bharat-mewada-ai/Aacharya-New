import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGamificationStore } from '../../hooks/useGamificationStore';

export default function Platform3D() {
  const ring1 = useRef();
  const ring2 = useRef();
  const { rank } = useGamificationStore();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z += 0.01;
    if (ring2.current) ring2.current.rotation.z -= 0.015;
  });

  return (
    <group position={[0, -1.4, 0]}>
      {/* Small Circular Disc Platform (Like in inspiration image) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1.1, 0.1, 64]} />
        <meshStandardMaterial color="#111122" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Glowing Inner Ring */}
      <mesh ref={ring1} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[0.9, 0.95, 64]} />
        <meshBasicMaterial color={rank.auraColor} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer Subtle Ring */}
      <mesh ref={ring2} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <ringGeometry args={[1.05, 1.1, 64]} />
        <meshBasicMaterial color={rank.auraColor} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Subtle Bottom Glow - Reduced intensity */}
      <pointLight position={[0, 0.5, 0]} color={rank.auraColor} intensity={0.8} distance={3} />
    </group>
  );
}
