export default function Navigation() {
  return (
    <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
      <ul className="flex space-x-4 sm:space-x-6 md:space-x-10 bg-black/60 border border-gray-800/50 rounded-full px-5 sm:px-8 py-3 backdrop-blur-md text-[9px] sm:text-[10px] md:text-xs tracking-[0.2em] text-gray-400 font-syne font-bold">
        <li>
          <a href="#vision" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300">
            VISION
          </a>
        </li>
        <li>
          <a href="#vitrine" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300">
            VITRINE
          </a>
        </li>
        <li>
          <a href="#reseaux" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300">
            RÉSEAUX
          </a>
        </li>
        <li>
          <a href="#vip" className="hover:text-cyan-400 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300">
            VIP
          </a>
        </li>
      </ul>
    </nav>
  );
}
