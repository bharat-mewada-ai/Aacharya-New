import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import Avatar3D from './Avatar3D';
import ParticleAura from './ParticleAura';
import Platform3D from './Platform3D';
import { useGamificationStore } from '../../hooks/useGamificationStore';

export default function GamifiedScene({ gender }) {
  const { rank } = useGamificationStore();

  return (
    <div className="gamified-scene-container" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={50} />
        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={7} 
          maxPolarAngle={Math.PI / 1.8} 
          minPolarAngle={Math.PI / 3}
        />

        {/* Lighting */}
        <ambientLight intensity={1.5} color="#222244" />
        <directionalLight 
          position={[3, 6, 4]} 
          intensity={2} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[0, 0.2, 0]} color={rank.auraColor} intensity={0.8} distance={5} />
        <spotLight position={[-3, 3, -2]} color="#4444ff" intensity={2} angle={0.3} penumbra={1} />

        <Avatar3D gender={gender} />
        <ParticleAura />
        <Platform3D />
        <ContactShadows 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
          resolution={256} 
          color="#000000" 
        />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
