export default function Chapter2() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden">
      {/* Vagues d'énergie SVG en arrière-plan */}
      <svg className="bg-energy" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#00f0ff" strokeWidth="0.2" className="glow-icon-cyan" />
        <path d="M0,60 Q35,80 70,60 T100,70" fill="none" stroke="#00f0ff" strokeWidth="0.1" />
      </svg>

      <div className="reveal max-w-5xl relative z-10">
        <h4 className="text-cyan-400 text-xs md:text-sm tracking-widest font-display mb-8">CHAPITRE II</h4>
        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl leading-tight tracking-wider">
          <span className="text-white block mb-4">L'ÉNERGIE DE</span>
          <span className="text-white block mb-4">L'UNDERGROUND.</span>
          <span className="glow-text-cyan block">L'EXIGENCE DU</span>
          <span className="glow-text-cyan block">PREMIUM.</span>
        </h2>
      </div>
    </section>
  );
}
