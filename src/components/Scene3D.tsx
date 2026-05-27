import { useGLTF, Center, Float } from '@react-three/drei';

export default function Scene3D() {
  // Load the GLTF model (using the one available in public folder)
  const { scene } = useGLTF('/logo1.glb');

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={16} color="#00f0ff" />
      <directionalLight position={[-5, -5, 5]} intensity={10} color="#ffffff" />

      <Center>
        <Float
          speed={5} // Animation speed
          rotationIntensity={1} // No rotation, just floating
          floatIntensity={1.5} // Up/down float intensity
          floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within
        >
          {/* Increased scale for a bigger 3D logo */}
          <primitive object={scene} scale={2.2} />
        </Float>
      </Center>
    </>
  );
}

// Preload the model
useGLTF.preload('/logo1.glb');