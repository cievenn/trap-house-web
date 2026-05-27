import { ArrowUpRight } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Reseaux() {
  return (
    <section id="reseaux" className="min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden">
      {/* Background text filigrane (MARQUEE) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
        <div className="animate-marquee flex gap-16">
          <h1 className="font-display font-bold text-[15vw] leading-none text-white whitespace-nowrap">TRAP HOUSE</h1>
          <h1 className="font-display font-bold text-[15vw] leading-none text-white whitespace-nowrap">TRAP HOUSE</h1>
          <h1 className="font-display font-bold text-[15vw] leading-none text-white whitespace-nowrap">TRAP HOUSE</h1>
          <h1 className="font-display font-bold text-[15vw] leading-none text-white whitespace-nowrap">TRAP HOUSE</h1>
        </div>
      </div>

      <div className="reveal max-w-5xl w-full flex flex-col items-center relative z-10">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-8 h-px bg-cyan-400/50"></div>
          <h4 className="text-cyan-400 text-xs md:text-sm tracking-widest font-display">CONNECTIVITÉ</h4>
          <div className="w-8 h-px bg-cyan-400/50"></div>
        </div>

        <h2 className="font-display font-bold text-3xl md:text-6xl lg:text-7xl leading-tight tracking-wider mb-16 flex flex-wrap justify-center gap-x-4">
          <span className="text-white">REJOIGNEZ LE</span>
          <span className="glow-text-cyan">CERCLE</span>
        </h2>

        {/* Bouton Instagram */}
        <a href="#" className="group relative flex items-center justify-between w-full max-w-md bg-[#050a10]/80 backdrop-blur-sm border border-gray-800 rounded-[2rem] p-4 pr-6 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300">
          <div className="flex items-center space-x-6">
            <div className="w-14 h-14 rounded-full bg-[#0a1118] border border-gray-800 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors duration-300">
              <InstagramIcon className="w-6 h-6 text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300" />
            </div>
            <div className="text-left">
              <span className="block font-display font-bold text-white group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] tracking-widest text-lg md:text-xl transition-all duration-300">INSTAGRAM</span>
              <span className="block font-display text-gray-500 tracking-widest text-[8px] mt-1 group-hover:text-cyan-400/70 transition-colors duration-300">LE VISUEL</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </a>
      </div>
    </section>
  );
}
