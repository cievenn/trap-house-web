import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene3D() {
  // Load the GLTF model (using the one available in public folder)
  const { scene } = useGLTF('/logo1.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotation douce
      groupRef.current.rotation.y += 0.3 * delta;
      
      // Petit flottement vertical
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      
      // Interaction souris subtile (Parallax)
      const targetX = (state.pointer.x * window.innerWidth * 0.001) * 0.5;
      const targetY = -(state.pointer.y * window.innerHeight * 0.001) * 0.5;
      
      groupRef.current.rotation.x += 0.05 * (targetY - groupRef.current.rotation.x);
      groupRef.current.rotation.z += 0.05 * (targetX - groupRef.current.rotation.z);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#00f0ff" />
      <directionalLight position={[-5, -5, 5]} intensity={1} color="#ffffff" />
      
      <Center>
        <group ref={groupRef}>
          <primitive object={scene} />
        </group>
      </Center>
    </>
  );
}

// Preload the model
useGLTF.preload('/logo1.glb');
