// TODO: Ce composant n'est importé nulle part — à intégrer dans une future section News ou à supprimer.
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { NewsType } from "@/lib/data";

export const TiltCard = ({ data, onClick }: { data: NewsType; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    const rect = rectRef.current;
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => { 
    x.set(0); 
    y.set(0); 
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={ref} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[320px] mx-auto h-[550px] cursor-pointer group perspective-1000"
    >
      {/* Lanyard Clip (Le trou d'attache en haut du pass) */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-black border border-white/20 rounded-full z-20" />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl rounded-xl overflow-hidden border border-white/20 group-hover:border-[#00F2FF] transition-all duration-500 z-10 shadow-2xl group-hover:shadow-[0_0_50px_rgba(0,242,255,0.3)]">
        
        {/* Holographic effect */}
        <div className="holographic-overlay absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image du Pass */}
        <div className="absolute top-0 left-0 w-full h-[60%] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${data.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
        
        {/* Mentions VIP */}
        <div className="absolute top-6 left-6 px-3 py-1 rounded bg-[#00F2FF]/20 border border-[#00F2FF]/50 text-[9px] font-syne tracking-[0.3em] text-[#00F2FF] font-bold z-20">
          VIP ACCESS
        </div>

        <div className="absolute top-6 right-6 text-[9px] font-syne tracking-widest text-white/50 z-20">
          N° {data.id.toString().padStart(4, '0')}
        </div>
        
        {/* Infos textuelles (bas du pass) */}
        <div className="absolute bottom-0 left-0 p-6 w-full h-[40%] flex flex-col justify-end z-20 bg-black">
          <p className="text-[#00F2FF] text-[10px] tracking-[0.3em] mb-2 font-syne uppercase">{data.date}</p>
          <h3 className="text-2xl font-black text-white uppercase tracking-widest font-syne leading-tight drop-shadow-md mb-6 group-hover:text-glow transition-all">
            {data.title}
          </h3>
          
          {/* Faux Code Barre qui s'anime */}
          <div className="w-full flex flex-col items-center opacity-30 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-full h-8 barcode mb-2" />
             <span className="text-[8px] font-syne tracking-[0.4em] text-white/70">SCAN TO ENTER</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};