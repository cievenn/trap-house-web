"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, ShoppingBag, Crown } from "lucide-react";

export function VIPSection() {
  return (
    <section id="vip" className="relative w-full min-h-screen py-32 md:py-48 px-6 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24 text-center flex flex-col items-center">
          <div className="relative w-20 h-20 flex items-center justify-center mb-8">
            <div className="absolute inset-0 border-2 border-[#00F2FF] rounded-full animate-ping opacity-20" />
            <div className="absolute inset-2 border border-[#00F2FF]/50 rounded-full animate-[spin_4s_linear_infinite]" />
            <Lock className="w-8 h-8 text-[#00F2FF] drop-shadow-[0_0_15px_#00F2FF]" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-syne uppercase tracking-widest text-white mb-6 drop-shadow-2xl">
            Zone <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white/10">Privilège</span>
          </h2>
          <p className="font-manrope text-white/40 text-sm md:text-base max-w-lg mx-auto uppercase tracking-widest">
            {"L'accès est restreint. Le contenu est exclusif."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* CARTE SHOP */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, type: "spring", bounce: 0.3 }}
            className="interactive-element relative h-[550px] flex flex-col items-center justify-center rounded-[2.5rem] border border-white/5 overflow-hidden group bg-[#020202] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/10 transition-colors duration-500"
          >
            <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise-shop">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise-shop)" />
            </svg>
            <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[#00F2FF]/[0.04] blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-white/[0.02] blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute inset-[1px] rounded-[2.4rem] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.12)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00F2FF]/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-20 flex flex-col items-center p-6 md:p-10 text-center w-full">
              <ShoppingBag className="w-12 h-12 text-white/20 mb-8 group-hover:text-[#00F2FF] group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_20px_rgba(0,242,255,0)] group-hover:drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
              <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black font-syne text-white tracking-wider md:tracking-widest mb-6 leading-tight w-full break-words">
                TRAP HOUSE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/10 group-hover:text-[#00F2FF] transition-colors duration-500">SHOP</span>
              </h3>
              <p className="font-manrope text-white/40 text-sm mb-12 max-w-sm leading-relaxed group-hover:text-white/60 transition-colors">
                {"Merchandising exclusif. Des pièces limitées forgées dans l'esthétique de la nuit. Réservé à l'élite."}
              </p>
              <div className="relative px-10 py-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#00F2FF]/80 overflow-hidden transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-[#00F2FF] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <p className="relative z-10 text-white/50 group-hover:text-black font-syne text-[11px] tracking-[0.4em] font-black uppercase transition-colors duration-500">Coming Soon</p>
              </div>
            </div>
            <div className="absolute top-8 left-8 w-4 h-[1px] bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
            <div className="absolute top-8 left-8 w-[1px] h-4 bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
            <div className="absolute bottom-8 right-8 w-4 h-[1px] bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
            <div className="absolute bottom-8 right-8 w-[1px] h-4 bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
          </motion.div>

          {/* CARTE VIP RÉSERVATIONS */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.3 }}
            className="interactive-element relative h-[550px] flex flex-col items-center justify-center rounded-[2.5rem] border border-white/5 overflow-hidden group bg-[#020202] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/10 transition-colors duration-500"
          >
            <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise-vip">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise-vip)" />
            </svg>
            <div className="absolute -top-1/4 right-1/4 w-[50%] h-[50%] bg-[#00F2FF]/[0.05] blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[45%] h-[40%] bg-white/[0.02] blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute inset-[1px] rounded-[2.4rem] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.12)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00F2FF]/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-20 flex flex-col items-center p-6 md:p-10 text-center w-full">
              <Crown className="w-12 h-12 text-white/20 mb-8 group-hover:text-[#00F2FF] group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_20px_rgba(0,242,255,0)] group-hover:drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black font-syne text-white tracking-wider mb-6 leading-tight">
                RÉSERVATIONS <span className="text-[#00F2FF] text-glow group-hover:text-white transition-colors duration-500">VIP</span>
              </h3>
              <p className="font-manrope text-white/40 text-sm mb-12 max-w-sm leading-relaxed group-hover:text-white/60 transition-colors">
                {"Garantissez votre table, accédez aux zones privées et profitez d'un service premium. Le confort dans le chaos."}
              </p>
              <div className="relative px-10 py-4 rounded-full bg-white/5 border border-white/10 group-hover:border-[#00F2FF]/80 overflow-hidden transition-all duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-[#00F2FF] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <p className="relative z-10 text-white/50 group-hover:text-black font-syne text-[11px] tracking-[0.4em] font-black uppercase transition-colors duration-500">Coming Soon</p>
              </div>
            </div>
            <div className="absolute top-8 right-8 w-4 h-[1px] bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
            <div className="absolute top-8 right-8 w-[1px] h-4 bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
            <div className="absolute bottom-8 left-8 w-4 h-[1px] bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
            <div className="absolute bottom-8 left-8 w-[1px] h-4 bg-white/20 group-hover:bg-[#00F2FF] transition-colors duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
