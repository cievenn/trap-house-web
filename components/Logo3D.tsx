"use client";

import React, { useEffect } from "react";
import { useGLTF, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

export function Logo3D() {
  const { scene } = useGLTF("/assets/logo.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // On force un matériau 100% OPAQUE et SOLIDE (fini l'effet verre/transparent)
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#111111"), // Un noir/gris très profond
          metalness: 0.8,                    // Aspect métal forgé
          roughness: 0.25,                   // Juste assez rugueux pour bien accrocher les néons sans faire miroir
          transparent: false,                // INTERDIT la transparence
          opacity: 1,                        // Opacité maximale
          depthWrite: true,                  // Force l'affichage des ombres et profondeurs
          envMapIntensity: 1,                // Baisse l'intensité des reflets virtuels pour garder l'aspect solide
        });
      }
    });
  }, [scene]);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      
      {/* Lumière d'ambiance légèrement rehaussée pour déboucher les noirs */}
      <ambientLight intensity={0.2} />
      
      {/* Les Néons du Club qui viennent taper sur le métal solide */}
      <directionalLight position={[5, 5, 5]} intensity={4} color="#00F2FF" />
      <directionalLight position={[-5, -5, -5]} intensity={2} color="#8A2BE2" />
      
      {/* Lumière frontale pour bien éclairer la face du logo */}
      <pointLight position={[0, 0, 5]} intensity={3} color="#ffffff" />

      {/* Le Modèle 3D */}
      <primitive object={scene} scale={5} position={[0, -2, 0]} />
      
      <Environment preset="city" />
    </Float>
  );
}

useGLTF.preload("/assets/logo.glb");