"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Vision", id: "vision" },
  { name: "Vitrine", id: "vitrine" },
  { name: "Réseaux", id: "reseaux" },
  { name: "VIP", id: "vip" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-[100] flex justify-center py-4 md:py-8 px-4 pointer-events-none"
    >
      {/* OPTIMISATION: backdrop-blur-md sur mobile (rapide), 2xl sur bureau */}
      <div className="pointer-events-auto flex items-center justify-center gap-2 sm:gap-6 md:gap-12 px-4 sm:px-8 md:px-12 py-3 sm:py-4 rounded-full border border-white/5 bg-[#020202]/70 backdrop-blur-md md:backdrop-blur-2xl shadow-2xl">
        {NAV_LINKS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            // OPTIMISATION UX : px-3 py-2 élargit la zone tactile sans changer l'apparence visuelle
            className="interactive-element relative px-3 py-2 text-[10px] sm:text-[11px] md:text-xs font-syne font-bold tracking-[0.2em] md:tracking-[0.3em] text-white/50 hover:text-[#00F2FF] active:text-[#00F2FF] active:scale-95 transition-all uppercase"
          >
            {item.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}