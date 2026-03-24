"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
//  Logo3D V2 — "Chrome Abyss"
//
//  Matériau : MeshPhysicalMaterial chrome-acier brossé
//    • metalness = 1.0         → réflectivité maximum
//    • roughness = 0.12        → acier très poli, presque miroir
//    • envMapIntensity = 3.5   → reflets de l'environnement très présents
//    • color = #B0B8C8         → teinte argent-acier
//
//  Éclairage dramatique (3 actes) :
//    • SpotLight directionnelle frontale blanc froid — la pièce maîtresse
//    • PointLight cyan (#00F2FF) orbitante → reflets néon en mouvement réel
//    • PointLight acier chaud (#C0D0E0) orbitante à l'opposé
//    • RectAreaLight douce bas → remonte les noirs du dessous
//    • AmbientLight très faible → laisse les noirs exister
//
//  Float : vitesse ultra-lente, rotation et flottaison réduites
// ─────────────────────────────────────────────────────────────────────────────

// Lumière Point animée — orbite autour du logo
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
  const groupRef = useRef<THREE.Group>(null);

  // ── Material chrome acier poli ────────────────────────────────────────────
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Chrome poli haute-fidélité
        const mat = new THREE.MeshPhysicalMaterial({
          color:             new THREE.Color("#A8B4C8"),  // argent-acier froid
          metalness:         1.0,                          // métal parfait
          roughness:         0.10,                         // presque miroir
          envMapIntensity:   3.0,                          // reflets forts
          reflectivity:      1.0,
          clearcoat:         0.40,                         // vernis — donne le rendu "forgé"
          clearcoatRoughness: 0.08,
          transparent:       false,
          opacity:           1.0,
          depthWrite:        true,
        });

        // Dispose de l'ancien material pour éviter les leaks
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          (mesh.material as THREE.Material).dispose?.();
        }

        mesh.material = mat;
        mesh.castShadow    = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  // ── Légère rotation auto (respiration du logo) ────────────────────────────
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Oscillation lente en Y — comme si le logo "scintillait"
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.4}   // très faible — le logo reste stable
      floatIntensity={0.8}      // flottaison douce
    >
      {/* ── Rig d'éclairage ──────────────────────────────────────────────── */}

      {/* Ambiance ultra-faible — les noirs restent noirs */}
      <ambientLight intensity={0.08} />

      {/* Spot frontal froid — source principale de la silhouette */}
      <spotLight
        position={[0, 8, 7]}
        angle={0.35}
        penumbra={0.8}
        intensity={80}
        color="#D0E0FF"          // blanc légèrement bleuté (acier froid)
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Lumière de remplissage légère venant du bas — debouche les noirs */}
      <pointLight position={[0, -5, 4]} intensity={8} color="#304060" distance={15} />

      {/* Rim light arrière — découpe le logo sur le fond */}
      <spotLight
        position={[0, 3, -8]}
        angle={0.5}
        penumbra={1.0}
        intensity={30}
        color="#00A8C8"          // cyan froid pour le rim
      />

      {/* Lumière orbitante Cyan — la signature néon */}
      <OrbitLight
        color="#00F2FF"
        intensity={35}
        radius={7}
        speed={0.3}
        yOffset={2}
        phase={0}
      />

      {/* Lumière orbitante Acier chaud — contre-balance le cyan */}
      <OrbitLight
        color="#C8D8F0"
        intensity={20}
        radius={6}
        speed={0.2}
        yOffset={-1}
        phase={Math.PI}          // phase opposée → lumières jamais au même endroit
      />

      {/* Lumière basse rapide — clignotement très doux (stroboscope ralenti) */}
      <OrbitLight
        color="#00F2FF"
        intensity={15}
        radius={4}
        speed={0.55}
        yOffset={-3}
        phase={Math.PI * 0.5}
      />

      {/* ── Modèle 3D ────────────────────────────────────────────────────── */}
      <group ref={groupRef}>
        <primitive object={scene} scale={5} position={[0, -2, 0]} />
      </group>

      {/* ── Env map studio premium ────────────────────────────────────────── */}
      {/* "studio" = environnement de studio photo → reflets prononcés sur le chrome */}
      <Environment preset="studio" />
    </Float>
  );
}

useGLTF.preload("/assets/logo.glb");