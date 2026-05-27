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
import { useReveal } from './hooks/useReveal';

function App() {
  // Initialize Reveal Animations
  useReveal();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // smoothWheel: true, (default is true in latest versions)
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Gérer les liens de navigation avec Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        lenis.scrollTo(href);
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as unknown as EventListener);
    });

    return () => {
      lenis.destroy();
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as unknown as EventListener);
      });
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
