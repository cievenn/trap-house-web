import Reveal from './Reveal';

export default function Chapter2() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-16 py-20 relative overflow-hidden">
      {/* Vagues d'énergie SVG en arrière-plan */}
      <svg className="bg-energy" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#00f0ff" strokeWidth="0.2" className="glow-icon-cyan" />
        <path d="M0,60 Q35,80 70,60 T100,70" fill="none" stroke="#00f0ff" strokeWidth="0.1" />
      </svg>

      <Reveal className="w-full max-w-4xl relative z-10">
        <h4 className="text-cyan-400 text-xs md:text-sm tracking-widest font-syne font-bold mb-8">CHAPITRE II</h4>
        <h2 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight tracking-normal sm:tracking-wide">
          <span className="text-white block mb-3">UNE ÉNERGIE</span>
          <span className="text-white block mb-3">PLUS BRUTE</span>
          <span className="glow-text-cyan block mb-1">UNE MOMENT</span>
          <span className="glow-text-cyan block">PLUS PROPRE.</span>
        </h2>
      </Reveal>
    </section>
  );
}
