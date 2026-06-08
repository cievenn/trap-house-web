import { useEffect, useMemo } from 'react';
import { useGLTF, Center, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene3D() {
  const { scene } = useGLTF('/logo1.glb');

  // 1. On crée un SEUL matériau optimisé, mémorisé pour éviter les re-calculs
  const chromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ffffff',
      metalness: 1,
      roughness: 0.1, // Légèrement monté pour éviter l'aliasing (bruit) sur téléphone
      envMapIntensity: 2,
    });
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // 2. IMPORTANT : On nettoie la mémoire en supprimant l'ancien matériau du modèle
        if (child.material) {
          child.material.dispose();
        }
        // 3. On assigne notre matériau unique partagé
        child.material = chromeMaterial;
      }
    });

    // Optionnel mais recommandé : nettoyer notre matériau custom quand le composant est détruit
    return () => {
      chromeMaterial.dispose();
    };
  }, [scene, chromeMaterial]);

  return (
    <>
      <ambientLight intensity={0.2} />

      {/* 4. Une seule lumière directionnelle suffit pour la touche de couleur */}
      <directionalLight position={[5, 5, 5]} intensity={3} color="#00f0ff" />

      <Environment preset="studio" />

      <Center>
        <Float
          speed={4}
          rotationIntensity={0.5} // Réduit un peu pour que ça fasse plus "lourd/massif"
          floatIntensity={1}
          floatingRange={[-0.1, 0.1]}
        >
          <primitive object={scene} scale={2.2} />
        </Float>
      </Center>
    </>
  );
}

useGLTF.preload('/logo1.glb');
