import { useRef, useCallback, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from './Reveal';

const archives = [
  { 
    id: '01', 
    title: 'AMERICAN DREAM', 
    status: '13-06-26', 
    archives: 'ARCHIVE',
    desc: 'Le Smart à Dijon accueille la première édition de Trap House. Une nuit rythmée par le meilleur du RNB, du Rap, de la Trap et de la Pop Urbaine US, dans une ambiance inspirée de la culture hip-hop américaine. Dress code optionnel, mais les meilleurs outfits sont attendus.', 
    img: '/AMERICAN_DREAM.webp'
  },
  { 
    id: '02', 
    title: 'WHITE PARTY', 
    status: '01-08-26', 
    archives: 'PROCHAINEMENT',
    desc: 'Le Beverly à Dijon (11 avenue du Drapeau) vous attend le samedi 01 août 2026 dès 23h00 pour une nuit 100% urbaine ! Vibrez sur le meilleur du Rap, de la Trap, RNB et Pop Urbaine US. Préparez vos plus belles tenues, le dress code 100% blanc est exigé pour briller sur la piste !', 
    img: '/WHITE_PARTY.webp' 
  },
  { 
    id: '03', 
    title: 'VOL. 03', 
    status: 'COMING SOON', 
    archives: '???',
    desc: 'La suite de Trap House est en cours de développement.', 
    img: '/image-attente.webp' 
  },
  { 
    id: '04', 
    title: 'VOL. 04', 
    status: 'COMING SOON', 
    archives: '???',
    desc: 'De nouvelles dates arrivent prochainement.', 
    img: '/image-attente.webp' 
  },
  { 
    id: '05', 
    title: 'VOL. 05', 
    status: 'COMING SOON', 
    archives: '???',
    desc: 'Le projet Trap House continue d’évoluer. Restez connectés.', 
    img: '/image-attente.webp' 
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

      {/* Status in top right corner */}
      <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20 text-right">
        <span className="block text-gray-500 text-[8px] font-syne font-bold tracking-widest mb-1 shadow-black drop-shadow-md">STATUS</span>
        <span className="block text-cyan-400 text-[9px] lg:text-[10px] font-syne font-bold tracking-widest shadow-black drop-shadow-md">{archive.status}</span>
      </div>

      <div className="relative z-10 w-full lg:transform lg:group-hover:-translate-y-2 transition-transform duration-500">
        <div className="border-b border-gray-700 pb-3 lg:pb-4 mb-3 lg:mb-4 group-hover:border-cyan-400/50 transition-colors duration-500">
          <h4 className="text-cyan-400 text-[10px] tracking-widest font-syne font-bold mb-1 lg:mb-2">{archive.archives}</h4>
          <h3 className="font-syne font-extrabold text-2xl lg:text-3xl xl:text-4xl text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-300">{archive.status}</h3>
        </div>
        <p className="text-gray-400 text-xs lg:text-sm font-manrope leading-relaxed opacity-80 lg:group-hover:opacity-100 transition-opacity duration-300">{archive.desc}</p>
      </div>
    </div>
  );
}

export default function Vitrine() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 5); // Une petite marge de sécurité
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const targetScrollRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getScrollAmount = () => {
    if (!carouselRef.current) return 0;
    const firstChild = carouselRef.current.firstElementChild as HTMLElement;
    // On calcule la largeur d'une carte + l'espacement (gap-4 = 16px sur mobile, gap-5 = 20px sur lg)
    const gap = window.innerWidth < 1024 ? 16 : 20;
    return firstChild ? firstChild.offsetWidth + gap : 400;
  };

  const handleScrollClick = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const amount = getScrollAmount();
    
    // On part du scroll actuel ou du scroll cible si une animation est déjà en cours
    const currentTarget = targetScrollRef.current !== null ? targetScrollRef.current : scrollLeft;
    
    let newScroll = direction === 'left' ? currentTarget - amount : currentTarget + amount;
    
    // Limitation absolue pour empêcher de scroller dans le vide (overscroll)
    const maxScroll = scrollWidth - clientWidth;
    newScroll = Math.max(0, Math.min(newScroll, maxScroll));
    
    targetScrollRef.current = newScroll;
    carouselRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
    
    // On réinitialise la cible après la fin de l'animation
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      targetScrollRef.current = null;
    }, 600);
  }, []);

  const scrollLeft = useCallback(() => handleScrollClick('left'), [handleScrollClick]);
  const scrollRight = useCallback(() => handleScrollClick('right'), [handleScrollClick]);

  return (
    <section id="vitrine" className="min-h-screen py-20 relative flex flex-col justify-center overflow-x-clip">

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
        <div className="relative overflow-hidden w-full group/carousel">
          {/* Bouton Gauche */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-4 sm:left-6 lg:left-8 xl:left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border border-gray-800 bg-[#0a1118]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
              canScrollLeft 
                ? 'text-gray-400 hover:border-cyan-400 hover:text-cyan-400 lg:hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer' 
                : 'text-gray-700 opacity-0 cursor-default pointer-events-none'
            }`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>

          {/* Bouton Droite */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 lg:right-8 xl:right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full border border-gray-800 bg-[#0a1118]/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
              canScrollRight 
                ? 'text-gray-400 hover:border-cyan-400 hover:text-cyan-400 lg:hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] cursor-pointer' 
                : 'text-gray-700 opacity-0 cursor-default pointer-events-none'
            }`}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6" />
          </button>

          {/* Conteneur scrollable unique */}
          <div
            ref={carouselRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar overscroll-x-contain gap-4 lg:gap-5 px-12 lg:pl-14 lg:pr-8 xl:pr-24 pb-6 lg:pb-8 pt-2 lg:pt-4"
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
