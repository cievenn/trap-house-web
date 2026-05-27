import { Lock, ShoppingBag, Crown } from 'lucide-react';

export default function VIP() {
  return (
    <section id="vip" className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-16 lg:px-32">
      <div className="reveal flex flex-col items-center text-center mb-16">
        <div className="w-16 h-16 rounded-full border border-cyan-400/30 flex items-center justify-center mb-8 glow-icon-cyan relative">
          <Lock className="w-6 h-6 text-cyan-400" />
        </div>

        <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wider mb-6 flex flex-wrap justify-center gap-x-4">
          <span className="text-white">ZONE</span>
          <span className="text-[#333333]">PRIVILÈGE</span>
        </h2>
        <p className="text-gray-400 font-display text-[10px] md:text-xs tracking-widest">
          L'ACCÈS EST RESTREINT. LE CONTENU EST EXCLUSIF.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Carte Shop */}
        <div className="group reveal tech-corners bg-gradient-to-b from-[#0a1118] to-[#03070b] border border-gray-800/80 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center text-center transition-all duration-500">
          <ShoppingBag className="w-10 h-10 text-gray-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300 mb-8" />
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-widest mb-2">TRAP HOUSE</h3>
          <h4 className="font-display font-bold text-2xl md:text-3xl text-[#333333] group-hover:text-cyan-400/50 transition-colors duration-300 tracking-widest mb-8">SHOP</h4>
          <p className="text-gray-400 text-sm font-body leading-relaxed mb-12 max-w-sm">
            Merchandising exclusif. Des pièces limitées forgées dans l'esthétique de la nuit. Réservé à l'élite.
          </p>
          <button className="mt-auto px-8 py-3 rounded-full border border-gray-800 bg-[#050a10] font-display text-[10px] tracking-widest text-gray-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] hover:font-bold transition-all duration-300 cursor-pointer">
            COMING SOON
          </button>
        </div>

        {/* Carte VIP */}
        <div className="group reveal tech-corners bg-gradient-to-b from-[#0a1118] to-[#03070b] border border-gray-800/80 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)] rounded-[2.5rem] p-10 md:p-14 flex flex-col items-center text-center transition-all duration-500">
          <Crown className="w-10 h-10 text-gray-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-300 mb-8" />
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-widest mb-2">RÉSERVATIONS</h3>
          <h4 className="font-display font-bold text-2xl md:text-3xl glow-text-cyan tracking-widest mb-8">VIP</h4>
          <p className="text-gray-400 text-sm font-body leading-relaxed mb-12 max-w-sm">
            Garantissez votre table, accédez aux zones privées et profitez d'un service premium. Le confort dans le chaos.
          </p>
          <button className="mt-auto px-8 py-3 rounded-full border border-gray-800 bg-[#050a10] font-display text-[10px] tracking-widest text-gray-400 hover:bg-cyan-400 hover:text-black hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] hover:font-bold transition-all duration-300 cursor-pointer">
            COMING SOON
          </button>
        </div>
      </div>
    </section>
  );
}
