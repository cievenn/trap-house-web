"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, Float, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbitLight({
  color,
  intensity,
  radius,
  speed,
  yOffset = 0,
  phase = 0,
}: {
  color: string;
  intensity: number;
  radius: number;
  speed: number;
  yOffset?: number;
  phase?: number;
}) {
  const ref = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.set(
      Math.cos(t) * radius,
      yOffset + Math.sin(t * 0.4) * 1.5,
      Math.sin(t) * radius
    );
  });

  return <pointLight ref={ref} color={color} intensity={intensity} distance={20} decay={2} />;
}

export function Logo3D() {
  const { scene } = useGLTF("/assets/logo.glb");
  const clone = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);
  const createdMaterials = useRef<THREE.MeshPhysicalMaterial[]>([]);

  // Détection GPU/Mobile pour la dégradation gracieuse
  const isMobileOrLowEnd = useMemo(() => {
    if (typeof window === "undefined") return false;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isLowCore = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    return isTouch || isLowCore;
  }, []);

  useEffect(() => {
    const mats: THREE.MeshPhysicalMaterial[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Simplification des matériaux sur mobile pour sauver le fill-rate GPU
        const mat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#A8B4C8"),
          metalness: isMobileOrLowEnd ? 0.8 : 1.0,
          roughness: isMobileOrLowEnd ? 0.3 : 0.10,
          envMapIntensity: isMobileOrLowEnd ? 1.5 : 3.0,
          reflectivity: isMobileOrLowEnd ? 0.5 : 1.0,
          clearcoat: isMobileOrLowEnd ? 0 : 0.40,
          clearcoatRoughness: 0.08,
        });

        mesh.material = mat;
        mesh.castShadow = !isMobileOrLowEnd;
        mesh.receiveShadow = !isMobileOrLowEnd;
        mats.push(mat);
      }
    });

    createdMaterials.current = mats;

    return () => {
      mats.forEach((m) => m.dispose());
    };
  }, [clone, isMobileOrLowEnd]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Animation simple, même sur mobile ça coûte très peu
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <Float 
      speed={isMobileOrLowEnd ? 2 : 6} 
      rotationIntensity={isMobileOrLowEnd ? 0 : 0.4} 
      floatIntensity={isMobileOrLowEnd ? 0.5 : 1}
    >
      <ambientLight intensity={isMobileOrLowEnd ? 0.2 : 0.08} />
      <spotLight
        position={[0, 8, 7]}
        angle={0.35}
        penumbra={0.8}
        intensity={80}
        color="#D0E0FF"
        castShadow={!isMobileOrLowEnd}
        shadow-mapSize={isMobileOrLowEnd ? [512, 512] : [1024, 1024]}
      />
      <pointLight position={[0, -5, 4]} intensity={8} color="#304060" distance={15} />
      
      {!isMobileOrLowEnd && (
        <spotLight
          position={[0, 3, -8]}
          angle={0.5}
          penumbra={1.0}
          intensity={30}
          color="#00A8C8"
        />
      )}

      {/* Lumière principale d'orbite gardée, les autres sont coupées sur mobile */}
      <OrbitLight color="#00F2FF" intensity={35} radius={7} speed={0.3} yOffset={2} phase={0} />
      
      {!isMobileOrLowEnd && (
        <>
          <OrbitLight color="#C8D8F0" intensity={20} radius={6} speed={0.2} yOffset={-1} phase={Math.PI} />
          <OrbitLight color="#00F2FF" intensity={15} radius={4} speed={0.55} yOffset={-3} phase={Math.PI * 0.5} />
        </>
      )}

      <group ref={groupRef}>
        <primitive object={clone} scale={5} position={[0, -2, 0]} />
      </group>
      
      {/* On enlève l'environment map studio sur bas de gamme si ça rame, mais on va le garder réduit avec le material envMapIntensity */}
      <Environment preset="studio" />
    </Float>
  );
}

useGLTF.preload("/assets/logo.glb");