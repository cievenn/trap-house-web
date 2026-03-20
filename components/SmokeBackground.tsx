"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function SmokeParticles() {
  // Charge ton image de fumée
  const texture = useTexture("/assets/smoke.png");
  const groupRef = useRef<THREE.Group>(null);

  // Génère 60 particules avec des tailles, positions et vitesses aléatoires
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 60; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 30, // Dispersion horizontale
        y: (Math.random() - 0.5) * 30, // Dispersion verticale
        z: (Math.random() - 0.5) * 10 - 5, // Profondeur (z)
        rotZ: Math.random() * Math.PI * 2, // Rotation de départ
        scale: Math.random() * 8 + 6, // Taille aléatoire (assez grosse pour faire des nuages)
        speed: Math.random() * 0.002 + 0.001, // Vitesse de rotation lente
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    // 1. Fait tourner chaque particule sur elle-même continuellement
    groupRef.current.children.forEach((child, i) => {
      child.rotation.z += particles[i].speed;
    });

    // 2. Parallaxe de Scroll : La fumée monte doucement quand on scrolle vers le bas
    const scrollY = window.scrollY;
    const targetY = scrollY * 0.003;
    // On utilise un "lerp" (interpolation linéaire) pour que le mouvement soit ultra-doux (inertie)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} rotation={[0, 0, p.rotZ]} scale={p.scale}>
          <planeGeometry args={[1, 1]} />
          {/* meshLambertMaterial capte la lumière. depthWrite={false} empêche les bugs de superposition */}
          <meshLambertMaterial 
            map={texture} 
            transparent 
            opacity={0.15} // Assez léger pour ne pas masquer le reste du site
            depthWrite={false} 
            blending={THREE.NormalBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export function SmokeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        
        {/* L'ÉCLAIRAGE DE LA FUMÉE (L'ADN TRAP HOUSE) */}
        {/* Un Cyan agressif en haut à droite */}
        <directionalLight position={[10, 10, 5]} intensity={4} color="#00F2FF" />
        
        {/* Un Violet/Rose profond en bas à gauche */}
        <directionalLight position={[-10, -10, 2]} intensity={3} color="#8A2BE2" />
        
        {/* Une lumière d'ambiance très faible pour ne pas que ce soit tout noir */}
        <ambientLight intensity={0.2} color="#ffffff" />
        
        <SmokeParticles />
      </Canvas>
    </div>
  );
}

// Précharge la texture pour éviter qu'elle n'apparaisse (pop) après le chargement
useTexture.preload("/assets/smoke.png");