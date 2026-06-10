import { useEffect } from 'react';
import Lenis from 'lenis';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import EnergyBackground from './components/EnergyBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Chapter1 from './components/Chapter1';
import Chapter2 from './components/Chapter2';
import Vitrine from './components/Vitrine';
import Reseaux from './components/Reseaux';
import VIP from './components/VIP';
import Footer from './components/Footer';

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
      <Chapter1 />
      <Chapter2 />
      <Vitrine />
      <Reseaux />
      <VIP />
      <Footer />
    </div>
  );
}

export default App;
