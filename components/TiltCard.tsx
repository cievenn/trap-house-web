"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NewsType } from "@/lib/data";

export const TiltCard = ({ data, onClick }: { data: NewsType; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="interactive-element relative w-full h-[500px] rounded-sm cursor-pointer group perspective-1000"
    >
      <div className="absolute inset-0 z-0 rounded-sm transition-all duration-500 opacity-0 group-hover:opacity-100 shadow-[0_0_80px_rgba(0,242,255,0.3)] bg-[#00F2FF]/5" />
      
      <div className="absolute inset-0 bg-[#020202] rounded-sm overflow-hidden border border-white/5 group-hover:border-[#00F2FF]/40 transition-colors duration-500 z-10">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00F2FF] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00F2FF] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 z-20" />

        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal"
          style={{ backgroundImage: `url(${data.image})` }}
        />
        
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity mix-blend-overlay pointer-events-none noise-bg" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent" />
        
        <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-xs font-syne tracking-widest text-white/70">
          {data.status}
        </div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full" style={{ transform: "translateZ(50px)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 bg-[#00F2FF] shadow-[0_0_8px_#00F2FF] rounded-full group-hover:animate-ping" />
            <p className="text-[#00F2FF] text-xs tracking-[0.3em] font-bold font-syne">{data.date}</p>
          </div>
          <h3 className="text-3xl font-extrabold text-white uppercase tracking-wider font-syne leading-tight group-hover:text-glow transition-all">
            {data.title}
          </h3>
          
          <div className="mt-8 flex items-center gap-3 text-white/40 group-hover:text-[#00F2FF] transition-colors overflow-hidden">
            <span className="text-xs font-syne tracking-[0.2em] font-bold transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">ACCÉDER AU DOSSIER</span>
            <ArrowRight size={16} className="transform -translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};