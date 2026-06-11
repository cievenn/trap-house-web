import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene3D from './Scene3D';

export default function Hero3D() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </Canvas>
  );
}
