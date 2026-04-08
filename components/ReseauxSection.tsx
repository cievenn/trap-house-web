"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export function ReseauxSection() {
  return (
    <section id="reseaux" className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-transparent py-32 z-20">
      {/* Lueur d'ambiance globale */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#00F2FF]/[0.02] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* TEXTES DÉFILANTS — CSS pur (remplace les animations JS Framer Motion) */}
      <div className="absolute top-1/3 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-30 -rotate-3 scale-110 z-0">
        <div className="marquee-left flex gap-12">
          {Array(6).fill("TRAP HOUSE EVENT — ").map((text, i) => (
            <span key={`t1-${i}`} className="text-[3rem] sm:text-[6rem] md:text-[10rem] font-black font-syne uppercase text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>{text}</span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-1/3 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-30 -rotate-3 scale-110 z-0">
        <div className="marquee-right flex gap-12">
          {Array(6).fill("REJOIGNEZ LE CERCLE — ").map((text, i) => (
            <span key={`t2-${i}`} className="text-[3rem] sm:text-[6rem] md:text-[10rem] font-black font-syne uppercase text-transparent" style={{ WebkitTextStroke: '1px rgba(0,242,255,0.4)' }}>{text}</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="flex flex-col items-center mb-20 text-center">
          <span className="font-syne text-[#00F2FF] text-[10px] md:text-xs tracking-[0.5em] font-bold mb-6 uppercase drop-shadow-[0_0_15px_rgba(0,242,255,0.8)] flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#00F2FF]" />
            Connectivité
            <span className="w-8 h-[1px] bg-[#00F2FF]" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black font-syne uppercase tracking-widest text-white drop-shadow-2xl">
            Rejoignez le <span className="text-[#00F2FF] text-glow italic">Cercle</span>
          </h2>
        </motion.div>

        {/* RÉSEAU (UNIQUEMENT INSTAGRAM) */}
        <div className="flex justify-center w-full max-w-2xl mx-auto">
          <motion.a
            href="https://www.instagram.com/bigtraphouse.events/" target="_blank"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="group relative w-full h-32 sm:h-40 flex items-center justify-between px-6 md:px-10 rounded-[2rem] border border-white/10 bg-[#020202]/80 backdrop-blur-2xl overflow-hidden interactive-element transition-all duration-500 hover:border-[#00F2FF]/60 hover:shadow-[0_0_50px_rgba(0,242,255,0.15)] hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00F2FF]/0 via-[#00F2FF]/5 to-[#00F2FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="relative flex items-center gap-6 z-10">
              <div className="p-5 rounded-full bg-white/5 border border-white/5 group-hover:bg-[#00F2FF]/10 group-hover:border-[#00F2FF]/30 transition-all duration-500 group-hover:scale-110">
                <Instagram className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-[#00F2FF] transition-colors duration-500 drop-shadow-lg" />
              </div>
              <div className="flex flex-col">
                <span className="font-syne font-black text-xl sm:text-2xl md:text-3xl tracking-[0.2em] text-white group-hover:text-[#00F2FF] transition-colors duration-500 uppercase">Instagram</span>
                <span className="font-manrope text-white/40 text-[10px] sm:text-xs tracking-widest uppercase mt-1 group-hover:text-white/70 transition-colors">Le Visuel</span>
              </div>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00F2FF]/50 group-hover:bg-[#00F2FF]/10 transition-all duration-500 -rotate-45 group-hover:rotate-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-[#00F2FF] transition-colors">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
