"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, ShoppingBag, Crown } from "lucide-react";

export function VIPSection() {
  return (
    <section id="vip" className="relative w-full min-h-screen py-20 md:py-32 lg:py-48 px-4 sm:px-6 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 md:mb-24 text-center flex flex-col items-center">
          <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-6 md:mb-8">
            <div className="absolute inset-0 border-2 border-[#00F2FF] rounded-full animate-ping opacity-20" />
            <div className="absolute inset-2 border border-[#00F2FF]/50 rounded-full animate-[spin_4s_linear_infinite]" />
            <Lock className="w-6 h-6 md:w-8 md:h-8 text-[#00F2FF] drop-shadow-[0_0_15px_#00F2FF]" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-syne uppercase tracking-widest text-white mb-4 md:mb-6 drop-shadow-2xl">
            Zone <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white/10">Privilège</span>
          </h2>
          <p className="font-manrope text-white/70 md:text-white/60 text-xs sm:text-sm md:text-base max-w-lg mx-auto uppercase tracking-[0.2em] md:tracking-widest">
            {"L'accès est restreint. Le contenu est exclusif."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* CARTE SHOP */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}
            role="button" tabIndex={0}
            className="interactive-element relative h-auto min-h-[350px] sm:min-h-[400px] md:h-[550px] flex flex-col items-center justify-center rounded-[2rem] md:rounded-[2.5rem] border border-white/10 md:border-white/5 overflow-hidden group bg-[#020202] shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:hover:border-white/10 transition-all duration-300 active:scale-[0.98] outline-none"
          >
            <div className="hidden md:block absolute inset-0 opacity-[0.04] pointer-events-none noise-overlay" />

            <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,242,255,0.12),transparent_60%)] md:bg-[#00F2FF]/[0.04] md:blur-[80px] rounded-full pointer-events-none" />
            
            {/* Sur mobile, on affiche les effets visuels par défaut (opacity-100), sur desktop on les cache jusqu'au survol */}
            <div className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.12)_0%,transparent_65%)]" />

            <div className="relative z-20 flex flex-col items-center p-6 md:p-10 text-center w-full">
              <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-[#00F2FF] md:text-white/20 mb-6 md:mb-8 md:group-hover:text-[#00F2FF] md:group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] md:drop-shadow-none md:group-hover:drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
              <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black font-syne text-white tracking-wider md:tracking-widest mb-4 md:mb-6 leading-tight w-full break-words">
                TRAP HOUSE <br />
                <span className="text-[#00F2FF] md:text-transparent md:bg-clip-text md:bg-gradient-to-b md:from-white/40 md:to-white/10 md:group-hover:text-[#00F2FF] transition-colors duration-500">SHOP</span>
              </h3>
              <p className="font-manrope text-white/80 md:text-white/60 text-xs sm:text-sm mb-8 md:mb-12 max-w-[280px] sm:max-w-sm leading-relaxed md:group-hover:text-white/70 transition-colors">
                {"Merchandising exclusif. Des pièces limitées forgées dans l'esthétique de la nuit. Réservé à l'élite."}
              </p>
              
              <div className="relative px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-[#00F2FF]/10 md:bg-white/5 border border-[#00F2FF]/50 md:border-white/10 md:group-hover:border-[#00F2FF]/80 overflow-hidden transition-all duration-500">
                <div className="absolute inset-0 bg-[#00F2FF] translate-y-0 md:translate-y-[100%] md:group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <p className="relative z-10 text-black md:text-white/60 md:group-hover:text-black font-syne text-[10px] sm:text-[11px] tracking-[0.4em] font-black uppercase transition-colors duration-500">Coming Soon</p>
              </div>
            </div>
            
            {/* Coins stylisés */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-4 h-[1px] bg-[#00F2FF] md:bg-white/20 md:group-hover:bg-[#00F2FF] transition-colors" />
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-[1px] h-4 bg-[#00F2FF] md:bg-white/20 md:group-hover:bg-[#00F2FF] transition-colors" />
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-4 h-[1px] bg-[#00F2FF] md:bg-white/20 md:group-hover:bg-[#00F2FF] transition-colors" />
            <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-[1px] h-4 bg-[#00F2FF] md:bg-white/20 md:group-hover:bg-[#00F2FF] transition-colors" />
          </motion.div>

          {/* CARTE VIP RÉSERVATIONS */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
            role="button" tabIndex={0}
            className="interactive-element relative h-auto min-h-[350px] sm:min-h-[400px] md:h-[550px] flex flex-col items-center justify-center rounded-[2rem] md:rounded-[2.5rem] border border-white/10 md:border-white/5 overflow-hidden group bg-[#020202] shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:hover:border-white/10 transition-all duration-300 active:scale-[0.98] outline-none"
          >
            <div className="hidden md:block absolute inset-0 opacity-[0.04] pointer-events-none noise-overlay" />

            <div className="absolute -top-1/4 right-1/4 w-[70%] h-[50%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,242,255,0.12),transparent_60%)] md:bg-[#00F2FF]/[0.05] md:blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_0%,rgba(0,242,255,0.12)_0%,transparent_65%)]" />

            <div className="relative z-20 flex flex-col items-center p-6 md:p-10 text-center w-full">
              <Crown className="w-10 h-10 md:w-12 md:h-12 text-[#00F2FF] md:text-white/20 mb-6 md:mb-8 md:group-hover:text-[#00F2FF] md:group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] md:drop-shadow-none md:group-hover:drop-shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black font-syne text-white tracking-wider md:tracking-widest mb-4 md:mb-6 leading-tight">
                RÉSERVATIONS <span className="text-[#00F2FF] text-glow md:group-hover:text-white transition-colors duration-500">VIP</span>
              </h3>
              <p className="font-manrope text-white/80 md:text-white/60 text-xs sm:text-sm mb-8 md:mb-12 max-w-[280px] sm:max-w-sm leading-relaxed md:group-hover:text-white/70 transition-colors">
                {"Garantissez votre table, accédez aux zones privées et profitez d'un service premium. Le confort dans le chaos."}
              </p>
              
              <div className="relative px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-[#00F2FF]/10 md:bg-white/5 border border-[#00F2FF]/50 md:border-white/10 md:group-hover:border-[#00F2FF]/80 overflow-hidden transition-all duration-500">
                <div className="absolute inset-0 bg-[#00F2FF] translate-y-0 md:translate-y-[100%] md:group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <p className="relative z-10 text-black md:text-white/60 md:group-hover:text-black font-syne text-[10px] sm:text-[11px] tracking-[0.4em] font-black uppercase transition-colors duration-500">Coming Soon</p>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-4 h-[1px] bg-[#00F2FF] md:bg-white/20 md:group-hover:bg-[#00F2FF] transition-colors" />
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-[1px] h-4 bg-[#00F2FF] md:bg-white/20 md:group-hover:bg-[#00F2FF] transition-colors" />
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-4 h-[1px] bg-[#00F2FF] md:bg-white/20 md:group-hover:bg-[#00F2FF] transition-colors" />
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-[1px] h-4 bg-[#00F2FF] md:bg-white/20 md:group-hover:bg-[#00F2FF] transition-colors" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}