"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NewsType } from "@/lib/data";

export const NewsModal = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: NewsType | null }) => {
  return (
    <AnimatePresence>
      {isOpen && data && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020202]/80 cursor-pointer"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="interactive-element relative w-full max-w-6xl h-[90vh] md:h-[80vh] bg-[#050505] border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row z-10 shadow-[0_0_100px_rgba(0,242,255,0.1)]"
          >
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#00F2FF]/30 z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#00F2FF]/30 z-20 pointer-events-none" />

            <button 
              onClick={onClose}
              className="interactive-element absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 bg-black/60 backdrop-blur-xl rounded-sm border border-white/10 text-white/50 hover:text-[#00F2FF] hover:border-[#00F2FF]/50 transition-all group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="w-full md:w-1/2 h-[45%] md:h-full relative overflow-hidden bg-black">
              <motion.div 
                initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 bg-cover bg-center opacity-80" 
                style={{ backgroundImage: `url(${data.image})` }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
              <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay pointer-events-none" />
            </div>

            <div className="w-full md:w-1/2 h-[55%] md:h-full p-8 md:p-16 flex flex-col justify-center overflow-y-auto custom-scrollbar relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <span className="font-syne text-8xl font-black">{data.id.toString().padStart(2, '0')}</span>
              </div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="px-3 py-1 bg-[#00F2FF]/10 border border-[#00F2FF]/30 text-[#00F2FF] text-xs font-syne font-bold tracking-widest">
                  VIP ACCESS
                </div>
                <p className="text-white/40 tracking-[0.2em] text-xs font-syne font-bold">{data.date}</p>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-wider mb-8 font-syne leading-[1.1] text-glow relative z-10">
                {data.title}
              </h2>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-16 bg-[#00F2FF] shadow-[0_0_10px_#00F2FF]" />
                <span className="text-[10px] font-syne text-[#00F2FF] tracking-[0.3em] uppercase">Decrypting Info...</span>
              </div>
              
              <p className="text-white/60 leading-relaxed text-sm md:text-base font-manrope font-light mb-12 relative z-10">
                {data.description}
              </p>
              
              <button className="interactive-element group relative w-fit overflow-hidden rounded-sm bg-[#050505] border border-[#00F2FF]/40 px-10 py-5 transition-all hover:border-[#00F2FF] hover:shadow-[0_0_40px_rgba(0,242,255,0.2)]">
                <span className="relative z-10 font-syne text-xs tracking-[0.3em] text-[#00F2FF] group-hover:text-black font-extrabold transition-colors duration-300">
                  RÉSERVER MA PLACE
                </span>
                <div className="absolute inset-0 h-full w-0 bg-[#00F2FF] transition-all duration-500 ease-out group-hover:w-full" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};