"use client";

import React, { useRef, useEffect } from "react";
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
  const groupRef = useRef<THREE.Group>(null);
  const createdMaterials = useRef<THREE.MeshPhysicalMaterial[]>([]);

  useEffect(() => {
    const mats: THREE.MeshPhysicalMaterial[] = [];

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        const mat = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#A8B4C8"),
          metalness: 1.0,
          roughness: 0.10,
          envMapIntensity: 3.0,
          reflectivity: 1.0,
          clearcoat: 0.40,
          clearcoatRoughness: 0.08,
        });

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          (mesh.material as THREE.Material).dispose?.();
        }

        mesh.material = mat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mats.push(mat);
      }
    });

    createdMaterials.current = mats;

    return () => {
      mats.forEach((m) => m.dispose());
    };
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <Float speed={6} rotationIntensity={0.4} floatIntensity={1}>
      <ambientLight intensity={0.08} />
      <spotLight
        position={[0, 8, 7]}
        angle={0.35}
        penumbra={0.8}
        intensity={80}
        color="#D0E0FF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[0, -5, 4]} intensity={8} color="#304060" distance={15} />
      <spotLight
        position={[0, 3, -8]}
        angle={0.5}
        penumbra={1.0}
        intensity={30}
        color="#00A8C8"
      />
      <OrbitLight color="#00F2FF" intensity={35} radius={7} speed={0.3} yOffset={2} phase={0} />
      <OrbitLight color="#C8D8F0" intensity={20} radius={6} speed={0.2} yOffset={-1} phase={Math.PI} />
      <OrbitLight color="#00F2FF" intensity={15} radius={4} speed={0.55} yOffset={-3} phase={Math.PI * 0.5} />
      <group ref={groupRef}>
        <primitive object={scene} scale={5} position={[0, -2, 0]} />
      </group>
      <Environment preset="studio" />
    </Float>
  );
}