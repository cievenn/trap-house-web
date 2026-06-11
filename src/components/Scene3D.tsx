import { useEffect, useMemo } from 'react';
import { useGLTF, Center, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene3D() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const { scene } = useGLTF('/logo1.glb');

  // Clone pour ne jamais muter la scène en cache — safe en multi-instance
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    // Créer le matériau à chaque montage — safe en Strict Mode
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      metalness: 1,
      roughness: 0.1,
      envMapIntensity: 2,
    });

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Ne SURTOUT PAS dispose l'ancien matériau car il vient du cache useGLTF
        child.material = chromeMaterial;
      }
    });

    return () => {
      // Chaque cycle de montage nettoie sa propre instance — pas de matériau fantôme
      chromeMaterial.dispose();
    };
  }, [clonedScene]);

  return (
    <>
      <ambientLight intensity={0.2} />

      {/* Une seule lumière directionnelle suffit pour la touche de couleur */}
      <directionalLight position={[5, 5, 5]} intensity={3} color="#00f0ff" />

      {!isMobile && <Environment preset="studio" />}

      <Center>
        <Float
          speed={4}
          rotationIntensity={0.5}
          floatIntensity={1}
          floatingRange={[-0.1, 0.1]}
        >
          <primitive object={clonedScene} scale={2.2} />
        </Float>
      </Center>
    </>
  );
}

useGLTF.preload('/logo1opti.glb');

