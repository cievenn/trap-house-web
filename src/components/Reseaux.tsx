import { ArrowRight } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Reseaux() {
  return (
    <section id="reseaux" className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-32 relative overflow-hidden">
      
      {/* Background text filigrane (MARQUEE DIAGONALE AVEC STROKE) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {/* Container avec rotation diagonale */}
        <div className="absolute w-[200%] -rotate-6 flex flex-col opacity-40">
          
          {/* Ligne 1 (Top) */}
          <div className="animate-marquee flex gap-12">
            {[...Array(6)].map((_, i) => (
              <h1 key={`m1-${i}`} className="font-display font-bold text-[18vw] leading-none text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.05)' }}>
                TRAP HOUSE
              </h1>
            ))}
          </div>
          
          {/* Ligne 2 (Bottom) - Marge négative pour le coller au premier */}
          <div className="animate-marquee flex gap-12 -mt-[2vw]" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
            {[...Array(6)].map((_, i) => (
              <h1 key={`m2-${i}`} className="font-display font-bold text-[18vw] leading-none text-transparent whitespace-nowrap" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.05)' }}>
                LE CERCLE
              </h1>
            ))}
          </div>

        </div>
      </div>

      <div className="reveal w-full max-w-7xl flex flex-col items-center relative z-10">
        
        {/* Titre et Connectivité */}
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-12 h-[1px] bg-cyan-400"></div>
          <h4 className="text-cyan-400 text-xs md:text-sm tracking-extra-wide font-display font-bold">CONNECTIVITÉ</h4>
          <div className="w-12 h-[1px] bg-cyan-400"></div>
        </div>

        {/* Titre réduit pour rester sur une seule ligne */}
        <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-widest mb-24 flex flex-nowrap justify-center gap-x-3 md:gap-x-6 w-full whitespace-nowrap">
          <span className="text-white">REJOIGNEZ LE</span>
          <span className="glow-text-cyan">CERCLE</span>
        </h2>

        {/* Bouton Instagram (Allongé) */}
        <a href="#" className="group relative flex items-center justify-between w-[95%] max-w-[600px] bg-[#05090e]/95 backdrop-blur-md border border-gray-800/80 rounded-[2.5rem] p-4 pr-6 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.15)] transition-all duration-500 overflow-hidden">
          
          {/* Lueur de fond au survol */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="flex items-center space-x-6 relative z-10">
            {/* Icône */}
            <div className="w-16 h-16 rounded-full bg-[#0a1118] border border-gray-700/50 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-500">
              <InstagramIcon className="w-7 h-7 text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300" />
            </div>
            
            {/* Textes */}
            <div className="text-left flex flex-col justify-center">
              <span className="block font-display font-bold text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] tracking-widest text-xl md:text-2xl transition-all duration-300">
                INSTAGRAM
              </span>
              <span className="block font-display text-gray-500 tracking-widest text-[9px] mt-1 group-hover:text-cyan-400/70 transition-colors duration-300">
                LE VISUEL
              </span>
            </div>
          </div>
          
          {/* Flèche - Position droite par défaut, se lève à -45deg au survol */}
          <div className="w-10 h-10 rounded-full border border-gray-700/50 flex items-center justify-center relative z-10 group-hover:border-cyan-400/50 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-500">
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transform group-hover:-rotate-45 transition-all duration-500" />
          </div>
        </a>
      </div>
    </section>
  );
}
