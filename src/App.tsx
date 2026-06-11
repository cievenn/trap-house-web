import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import EnergyBackground from './components/EnergyBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

// Composants différés (Lazy Load) pour alléger le JS initial
const Chapter1 = lazy(() => import('./components/Chapter1'));
const Chapter2 = lazy(() => import('./components/Chapter2'));
const Vitrine = lazy(() => import('./components/Vitrine'));
const Reseaux = lazy(() => import('./components/Reseaux'));
const VIP = lazy(() => import('./components/VIP'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  // Initialize Lenis Smooth Scroll + anchor link delegation
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Délégation d'événement : intercepte TOUS les clics sur des ancres #,
    // y compris celles ajoutées dynamiquement après le montage.
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href) {
        e.preventDefault();
        lenis.scrollTo(href);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="antialiased selection:bg-cyan-500 selection:text-white">
      <ScrollProgress />
      <CustomCursor />
      <EnergyBackground />

      {/* Ambient Lights */}
      <div className="ambient-light"></div>
      <div className="ambient-light-2"></div>

      <Navigation />
      <Hero />
      <Suspense fallback={null}>
        <Chapter1 />
        <Chapter2 />
        <Vitrine />
        <Reseaux />
        <VIP />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
