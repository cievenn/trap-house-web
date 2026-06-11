import { lazy, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';

// Lazy loading du Canvas Three.js pour ne pas bloquer le Main Thread
const Hero3D = lazy(() => import('./Hero3D'));

export default function Hero() {
  return (
    <header className="relative w-full h-screen flex flex-col justify-end items-center pb-12 overflow-hidden">
      {/* Conteneur Three.js via R3F */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </div>
      
      {/* Indicateur de scroll */}
      <a href="#vision" className="relative z-20 flex flex-col items-center opacity-50 animate-pulse cursor-pointer group scroll-down-btn">
        <span className="text-[10px] tracking-widest text-cyan-400 font-syne mb-2">SWIPE DOWN</span>
        <ChevronDown className="w-4 h-4 text-cyan-400" />
      </a>
    </header>
  );
}
