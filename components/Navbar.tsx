"use client";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 pointer-events-none"
    >
      <div className="pointer-events-auto flex gap-8 px-8 py-4 rounded-full glass-panel border border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_0_15px_rgba(0,242,255,0.1)]">
        {["Accueil", "Actualités", "Vitrine", "VIP"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-sm font-medium tracking-widest text-white/70 hover:text-[#00F2FF] transition-colors uppercase"
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}