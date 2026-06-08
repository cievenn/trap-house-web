import { Lock, ShoppingBag, Crown } from 'lucide-react';

export default function VIP() {
  return (
    <section id="vip" className="min-h-screen flex flex-col items-center justify-center py-20 px-6 sm:px-8 md:px-12 lg:px-16">
      <div className="reveal flex flex-col items-center text-center mb-14 w-full">
        <div className="w-14 h-14 rounded-full border border-cyan-400/30 flex items-center justify-center mb-8 glow-icon-cyan">
          <Lock className="w-6 h-6 text-cyan-400" />
        </div>

        <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-wide mb-6 flex flex-wrap justify-center gap-x-4">
          <span className="text-white">ZONE</span>
          <span className="text-[#333333]">PRIVILÈGE</span>
        </h2>
        <p className="text-gray-400 font-manrope text-xs tracking-widest">
          L'ACCÈS EST RESTREINT. LE CONTENU EST EXCLUSIF.
        </p>
      </div>

      {/* Grille : 1 colonne sur mobile, 2 colonnes sur md+. Cartes larges et aérées. */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

        {/* Carte Shop */}
        <div className="group reveal tech-corners bg-gradient-to-b from-[#0a1118] to-[#03070b] border border-gray-800/80 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] rounded-[2.5rem] p-10 sm:p-12 lg:p-14 flex flex-col items-center text-center transition-all duration-500">
          <ShoppingBag className="w-10 h-10 text-gray-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300 mb-8" />
          <h3 className="font-syne font-extrabold text-2xl md:text-3xl text-white tracking-wide mb-2">TRAP HOUSE</h3>
          <h4 className="font-syne font-extrabold text-2xl md:text-3xl text-[#333333] group-hover:text-cyan-400/50 transition-colors duration-300 tracking-wide mb-8">SHOP</h4>
          <p className="text-gray-400 text-sm md:text-base font-manrope leading-relaxed mb-12 max-w-sm">
            Merchandising exclusif. Des pièces limitées forgées dans l'esthétique de la nuit. Réservé à l'élite.
          </p>
          <button className="mt-auto px-10 py-3.5 rounded-full border border-gray-800 bg-[#050a10] font-syne font-bold text-[10px] tracking-widest text-gray-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-300 cursor-pointer">
            COMING SOON
          </button>
        </div>

        {/* Carte VIP */}
        <div className="group reveal tech-corners bg-gradient-to-b from-[#0a1118] to-[#03070b] border border-gray-800/80 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] rounded-[2.5rem] p-10 sm:p-12 lg:p-14 flex flex-col items-center text-center transition-all duration-500">
          <Crown className="w-10 h-10 text-gray-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300 mb-8" />
          <h3 className="font-syne font-extrabold text-2xl md:text-3xl text-white tracking-wide mb-2">RÉSERVATIONS</h3>
          <h4 className="font-syne font-extrabold text-2xl md:text-3xl glow-text-cyan tracking-wide mb-8">VIP</h4>
          <p className="text-gray-400 text-sm md:text-base font-manrope leading-relaxed mb-12 max-w-sm">
            Garantissez votre table, accédez aux zones privées et profitez d'un service premium. Le confort dans le chaos.
          </p>
          <button className="mt-auto px-10 py-3.5 rounded-full border border-gray-800 bg-[#050a10] font-syne font-bold text-[10px] tracking-widest text-gray-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all duration-300 cursor-pointer">
            COMING SOON
          </button>
        </div>

      </div>
    </section>
  );
}
