import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ChevronDown } from 'lucide-react';
import Scene3D from './Scene3D';

export default function Hero() {
  return (
    <header className="relative w-full h-screen flex flex-col justify-end items-center pb-12 overflow-hidden">
      {/* Conteneur Three.js via R3F */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Indicateur de scroll */}
      <div className="relative z-20 flex flex-col items-center opacity-50 animate-pulse cursor-pointer group scroll-down-btn" onClick={() => {
        const element = document.getElementById('vision');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }}>
        <span className="text-[10px] tracking-widest text-cyan-400 font-syne mb-2">SWIPE DOWN</span>
        <ChevronDown className="w-4 h-4 text-cyan-400" />
      </div>
    </header>
  );
}
