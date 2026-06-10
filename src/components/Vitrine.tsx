import { useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const archives = [
  { 
    id: '01', 
    title: 'VOL. 01', 
    status: 'CLASSIFIED', 
    desc: 'L\'apogée de l\'énergie underground. Une nuit classée secret défense où les règles ont été réécrites.', 
    img: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '02', 
    title: 'VOL. 02', 
    status: 'ARCHIVED', 
    desc: 'Résonance industrielle. Les murs tremblent encore de cette session brutale et sans concession.', 
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '03', 
    title: 'VOL. 03', 
    status: 'LEAKED', 
    desc: 'Des fréquences inexplorées. Le point de bascule de notre mouvement vers l\'avant-garde.', 
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '04', 
    title: 'VOL. 04', 
    status: 'REDACTED', 
    desc: 'Un chaos organisé. La fusion parfaite entre l\'ombre, la lumière et l\'énergie pure.', 
    img: 'https://images.unsplash.com/photo-1545128485-c400e7702796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: '05', 
    title: 'VOL. 05', 
    status: 'UPCOMING', 
    desc: 'Préparez-vous. Le prochain chapitre s\'écrira dans le sang, les basses et les néons.', 
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' 
  },
];

/**
 * Carte d'archive — un seul composant utilisé à la fois mobile et desktop.
 * Les tailles sont contrôlées via les classes Tailwind responsives.
 */
function ArchiveCard({ archive }: { archive: typeof archives[number] }) {
  return (
    <div
      className="relative w-[260px] sm:w-[300px] lg:w-[340px] xl:w-[380px] aspect-[4/5] snap-center shrink-0 rounded-3xl overflow-hidden border border-gray-800/60 bg-dark-lighter p-6 lg:p-8 flex flex-col justify-end group cursor-pointer hover:border-cyan-400/50 lg:hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
        style={{ backgroundImage: `url('${archive.img}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/60 to-transparent"></div>
      <div className="relative z-10 w-full lg:transform lg:group-hover:-translate-y-2 transition-transform duration-500">
        <div className="flex justify-between items-end border-b border-gray-700 pb-3 lg:pb-4 mb-3 lg:mb-4 group-hover:border-cyan-400/50 transition-colors duration-500">
          <div>
            <h4 className="text-cyan-400 text-[10px] tracking-widest font-syne font-bold mb-1 lg:mb-2">ARCHIVE</h4>
            <h3 className="font-syne font-extrabold text-2xl lg:text-3xl xl:text-4xl text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-300">{archive.title}</h3>
          </div>
          <div className="text-right">
            <span className="block text-gray-500 text-[8px] font-syne font-bold tracking-widest mb-1">STATUS</span>
            <span className="block text-cyan-400 text-[9px] lg:text-[10px] font-syne font-bold tracking-widest">{archive.status}</span>
          </div>
        </div>
        <p className="text-gray-400 text-xs lg:text-sm font-manrope leading-relaxed opacity-80 lg:group-hover:opacity-100 transition-opacity duration-300">{archive.desc}</p>
      </div>
    </div>
  );
}

export default function Vitrine() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = useCallback(() => {
    carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  }, []);

  const scrollRight = useCallback(() => {
    carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
  }, []);

  return (
    <section id="vitrine" className="min-h-screen py-20 relative flex flex-col justify-center overflow-x-clip" style={{ touchAction: 'pan-y' }}>

      {/* ── Layout unifié : CSS Grid responsive ──
           Mobile  → 1 colonne (titre empilé au-dessus du carrousel)
           Desktop → 2 colonnes côte-à-côte (titre fixe à gauche, carrousel à droite)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(420px,520px)_1fr] xl:grid-cols-[560px_1fr] items-center gap-10 lg:gap-0 w-full">

        {/* ── TITRE (unique, responsive via Tailwind) ── */}
        <div className="px-6 sm:px-8 lg:pl-12 xl:pl-20 lg:pr-8 relative z-10">
          <Reveal className="flex flex-col items-start text-left">
            <h4 className="text-cyan-400 text-[10px] sm:text-xs tracking-widest font-syne font-bold mb-4 lg:mb-5">EXPLORATION</h4>
            <h2 className="font-syne font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-none tracking-wide mb-6 lg:mb-7">
              <span className="text-white block">LA</span>
              <span className="glow-text-cyan block">VITRINE</span>
            </h2>
            <div className="w-12 h-0.5 bg-cyan-400 mb-5 glow-icon-cyan"></div>
            <p className="text-gray-400 text-sm font-manrope leading-relaxed max-w-sm lg:max-w-xs">
              Glissez à travers l'obscurité pour découvrir les archives classées de nos événements légendaires. Seuls les initiés savent.
            </p>
          </Reveal>
        </div>

        {/* ── CARROUSEL (unique, responsive) ── */}
        <div className="relative overflow-hidden w-full">
          {/* Bouton Gauche */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 lg:left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border border-gray-800 bg-[#0a1118]/80 backdrop-blur-md text-gray-400 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 lg:hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>

          {/* Bouton Droite */}
          <button
            onClick={scrollRight}
            className="absolute right-0 lg:right-8 xl:right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border border-gray-800 bg-[#0a1118]/80 backdrop-blur-md text-gray-400 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 lg:hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>

          {/* Conteneur scrollable unique */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 lg:gap-5 px-12 lg:pl-14 lg:pr-8 xl:pr-24 pb-6 lg:pb-8 pt-2 lg:pt-4"
            style={{ touchAction: 'pan-x' }}
          >
            {archives.map((archive) => (
              <ArchiveCard key={archive.id} archive={archive} />
            ))}
            {/* Spacer pour que la dernière carte ne colle pas au bord */}
            <div className="min-w-[1px] shrink-0"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
