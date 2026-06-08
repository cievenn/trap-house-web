import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function Vitrine() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -450, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 450, behavior: 'smooth' });
    }
  };

  return (
    <section id="vitrine" className="min-h-screen py-20 relative overflow-hidden flex flex-col justify-center pl-4 md:pl-16 lg:pl-32">
      
      <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-8 w-full">
        
        {/* Colonne de Gauche : Texte et Contrôles */}
        <div className="w-full xl:w-1/3 flex-shrink-0 pr-4 md:pr-16 xl:pr-0">
          <div className="reveal flex flex-col items-start text-left">
            <h4 className="text-cyan-400 text-[10px] md:text-xs tracking-widest font-display mb-6">EXPLORATION</h4>
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-8">
              <span className="text-white block">LA</span>
              <span className="glow-text-cyan block">VITRINE</span>
            </h2>
            <div className="w-12 h-0.5 bg-cyan-400 mb-6 glow-icon-cyan"></div>
            <p className="text-gray-400 text-sm md:text-base font-body leading-relaxed max-w-md">
              Glissez à travers l'obscurité pour découvrir les archives classées de nos événements légendaires. Seuls les initiés savent.
            </p>
          </div>
        </div>

        {/* Colonne de Droite : Carousel qui déborde sur la droite */}
        <div className="w-full xl:w-2/3 min-w-0 relative">
          {/* Bouton Gauche */}
          <button 
            onClick={scrollLeft} 
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-800 bg-[#0a1118]/80 backdrop-blur-md text-gray-400 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Bouton Droite */}
          <button 
            onClick={scrollRight} 
            className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-800 bg-[#0a1118]/80 backdrop-blur-md text-gray-400 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 pt-4 pr-4 md:pr-16 lg:pr-32 reveal w-full"
          >
            {archives.map((archive) => (
              <div 
                key={archive.id} 
                className="relative w-[320px] md:w-[420px] aspect-[4/5] snap-center shrink-0 rounded-3xl overflow-hidden border border-gray-800/60 bg-dark-lighter p-8 flex flex-col justify-end group cursor-pointer hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-500"
              >
                {/* Image de fond */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" 
                  style={{ backgroundImage: `url('${archive.img}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/60 to-transparent"></div>

                {/* Contenu de la carte */}
                <div className="relative z-10 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex justify-between items-end border-b border-gray-700 pb-4 mb-4 group-hover:border-cyan-400/50 transition-colors duration-500">
                    <div>
                      <h4 className="text-cyan-400 text-[10px] tracking-widest font-display mb-2">ARCHIVE</h4>
                      <h3 className="font-display font-bold text-3xl md:text-4xl text-white tracking-wider group-hover:text-cyan-400 transition-colors duration-300">{archive.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="block text-gray-500 text-[8px] font-display tracking-widest mb-1">STATUS</span>
                      <span className="block text-cyan-400 text-[10px] font-display tracking-widest">{archive.status}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm font-body leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {archive.desc}
                  </p>
                </div>
              </div>
            ))}
            {/* Spacer de fin */}
            <div className="min-w-[1px] shrink-0"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
