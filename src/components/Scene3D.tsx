import { useGLTF, Center, Float } from '@react-three/drei';

export default function Scene3D() {
  // Load the GLTF model (using the one available in public folder)
  const { scene } = useGLTF('/logo1.glb');

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#00f0ff" />
      <directionalLight position={[-5, -5, 5]} intensity={1} color="#ffffff" />
      
      <Center>
        <Float
          speed={2} // Animation speed
          rotationIntensity={0} // No rotation, just floating
          floatIntensity={1.5} // Up/down float intensity
          floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within
        >
          {/* Increased scale for a bigger 3D logo */}
          <primitive object={scene} scale={1.8} />
        </Float>
      </Center>
    </>
  );
}

// Preload the model
useGLTF.preload('/logo1.glb');

