import Reveal from './Reveal';

export default function Chapter1() {
  return (
    <section id="vision" className="min-h-screen flex flex-col justify-center items-center text-center px-6 sm:px-10 md:px-16 py-20 relative overflow-hidden">
      <Reveal className="w-full max-w-3xl">
        <h4 className="text-cyan-400 text-xs md:text-sm tracking-widest font-syne font-bold mb-8">CHAPITRE I</h4>
        <h2 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight tracking-normal sm:tracking-wide">
          <span className="text-white block mb-2">OUBLIEZ LES</span>
          <span className="text-white block mb-2">STANDARDS</span>
          <span className="text-gray-500 block">DE LA NUIT.</span>
        </h2>
      </Reveal>
    </section>
  );
}
