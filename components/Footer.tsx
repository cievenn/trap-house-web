"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative w-full py-5 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 bg-[#020202]/30 backdrop-blur-2xl z-20">
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] shadow-[0_0_8px_#00F2FF]" />
        <span className="font-syne font-bold tracking-[0.4em] text-[10px] text-white/80 uppercase">Trap House</span>
      </div>

      <p className="font-syne text-white/30 text-[9px] tracking-[0.3em] uppercase mb-4 md:mb-0">
        © {CURRENT_YEAR} Tous droits réservés.
      </p>

      <div className="flex items-center gap-6">
        <a href="#" className="font-syne text-white/30 hover:text-[#00F2FF] text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 interactive-element">Instagram</a>
        <a href="#" className="font-syne text-white/30 hover:text-[#00F2FF] text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 interactive-element">Légal</a>
        <div className="w-[1px] h-3 bg-white/10" />
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 font-syne text-white/30 hover:text-[#00F2FF] text-[9px] tracking-[0.2em] uppercase transition-colors duration-300 interactive-element border-none bg-transparent cursor-pointer outline-none"
        >
          Top <ArrowUp size={10} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </footer>
  );
}
