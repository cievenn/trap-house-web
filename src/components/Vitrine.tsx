export default function Vitrine() {
  return (
    <section id="vitrine" className="min-h-screen flex items-center justify-center py-20 px-4 md:px-16 lg:px-32">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">
        {/* Côté Gauche */}
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

        {/* Côté Droit (Carte Archive) */}
        <div className="reveal flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-gray-800/60 bg-dark-lighter p-8 flex flex-col justify-end group cursor-pointer hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all duration-500">
            {/* Image de fond (Unsplash placeholder) */}
            <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#03070b] via-[#03070b]/80 to-transparent"></div>

            <div className="relative z-10 w-full">
              <div className="flex justify-between items-end border-b border-gray-700 pb-4 mb-4">
                <div>
                  <h4 className="text-cyan-400 text-[8px] md:text-[10px] tracking-widest font-display mb-2">ARCHIVE</h4>
                  <h3 className="font-display font-bold text-3xl md:text-4xl text-white tracking-wider">VOL. 01</h3>
                </div>
                <div className="text-right">
                  <span className="block text-gray-500 text-[8px] font-display tracking-widest mb-1">STATUS</span>
                  <span className="block text-cyan-400 text-[10px] font-display tracking-widest">CLASSIFIED</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs font-body leading-relaxed">
                L'apogée de l'énergie underground. Une nuit classée secret défense où les règles ont été réécrites dans l'obscurité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
