"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { VITRINE_DATA, VitrineCardType } from "@/lib/data";

const VITRINE_BUFFER = 0.10;

const StackedCard = ({ src, supertitle, volume, status, description, index, total, progress }: VitrineCardType & { index: number; total: number; progress: any; }) => {
  const INTERP_STEPS = 20;
  
  const { input, xOut, yOut, scaleOut, rotateZOut, opacityOut, overlayOut, shadowOut } = React.useMemo(() => {
    const inp: number[] = [];
    const xO: string[] = [];
    const yO: string[] = [];
    const sO: number[] = [];
    const rO: string[] = [];
    const oO: number[] = [];
    const ovO: number[] = [];
    const shO: number[] = [];

    for (let i = 0; i <= INTERP_STEPS; i++) {
      const p = i / INTERP_STEPS;
      const effective = Math.max(0, p - VITRINE_BUFFER) / (1 - VITRINE_BUFFER);
      const depth = index - effective * total;

      inp.push(p);
      xO.push(depth < 0 ? `${depth * 50}%` : "0%");
      yO.push(depth < 0 ? `${depth * 250}px` : `${depth * 40}px`);
      sO.push(depth < 0 ? 1 + Math.abs(depth) * 0.3 : Math.max(1 - depth * 0.06, 0.8));
      rO.push(depth < 0 ? `${depth * 15}deg` : `${(index % 2 === 0 ? 1 : -1) * depth * 2}deg`);
      oO.push(depth < 0 ? Math.max(1 - Math.abs(depth) * 1.5, 0) : 1);
      ovO.push(depth < 0 ? 1 - Math.max(1 - Math.abs(depth) * 0.4, 0.3) : 0);
      shO.push(depth <= 0 ? 0 : Math.min(depth * 0.5, 0.85));
    }

    return { input: inp, xOut: xO, yOut: yO, scaleOut: sO, rotateZOut: rO, opacityOut: oO, overlayOut: ovO, shadowOut: shO };
  }, [index, total, INTERP_STEPS]);

  const x = useTransform(progress, input, xOut);
  const y = useTransform(progress, input, yOut);
  const scale = useTransform(progress, input, scaleOut);
  const rotateZ = useTransform(progress, input, rotateZOut);
  const opacity = useTransform(progress, input, opacityOut);
  const overlayOpacity = useTransform(progress, input, overlayOut);
  const depthShadow = useTransform(progress, input, shadowOut);

  return (
    <motion.div
      style={{ x, y, scale, rotateZ, opacity, zIndex: total - index }}
      className={`absolute inset-0 origin-center w-full h-full will-change-transform`}
    >
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#020202] border border-white/10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.9)] md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col justify-end group">
        <div className="absolute inset-0 w-full h-full">
          <Image src={src} alt={`Trap House Archive ${volume}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 35vw" className="object-cover scale-110 md:group-hover:scale-100 transition-transform duration-1000 ease-out opacity-80" loading="lazy" />
        </div>

        <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black pointer-events-none z-20 will-change-transform" />
        <motion.div style={{ opacity: depthShadow }} className="absolute inset-0 bg-[#020202] pointer-events-none z-30 will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/80 md:via-[#010101]/60 to-transparent z-10" />

        <div className="relative z-20 p-6 sm:p-8 md:p-12 w-full">
          <div className="flex justify-between items-end w-full border-b border-white/10 pb-4 md:pb-6 mb-4 md:mb-6">
            <div>
              <p className="font-syne font-bold tracking-[0.3em] md:tracking-[0.4em] text-[#0099FF] text-[10px] uppercase mb-2 flex items-center gap-2 md:gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-pulse shadow-[0_0_10px_#0099FF]" />
                {supertitle}
              </p>
              <h3 className="font-syne font-black text-white text-4xl sm:text-5xl md:text-6xl tracking-[0.1em] uppercase leading-none drop-shadow-2xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">{volume}</span>
              </h3>
            </div>
            <div className="text-right">
              <p className="font-syne text-white/60 text-[8px] md:text-[9px] tracking-[0.3em] uppercase mb-1">Status</p>
              <p className="font-syne text-[#0099FF] text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">{status}</p>
            </div>
          </div>
          <p className="font-manrope text-white/70 md:text-white/60 text-xs sm:text-sm max-w-full md:max-w-[80%] leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function VitrineSection() {
  const vitrineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: vitrineScroll } = useScroll({ target: vitrineRef, offset: ["start start", "end end"] });
  const smoothVitrineScroll = useSpring(vitrineScroll, { stiffness: 70, damping: 25, mass: 0.8, restDelta: 0.0001 });
  const activeScroll = smoothVitrineScroll;

  const vitrineOpacity = useTransform(activeScroll, [0.9, 1], [1, 0]);
  const vitrineScale = useTransform(activeScroll, [0.9, 1], [1, 0.95]);

  return (
    <section id="vitrine" ref={vitrineRef} className="relative w-full bg-transparent z-20" style={{ height: `${VITRINE_DATA.length * 120}vh` }}>
      <motion.div style={{ opacity: vitrineOpacity, scale: vitrineScale }} className="sticky top-0 w-full h-[100dvh] flex flex-col xl:flex-row items-center justify-center xl:justify-between px-4 sm:px-6 md:px-[10vw] 2xl:px-[12vw] overflow-hidden will-change-transform">
        
        <div className="w-full xl:w-1/3 flex flex-col justify-center mb-8 sm:mb-12 xl:mb-0 z-30 pointer-events-none text-center xl:text-left mt-24 sm:mt-20 xl:mt-0">
          <span className="font-syne text-[#00F2FF] text-[10px] tracking-[0.4em] font-bold mb-3 md:mb-4 uppercase drop-shadow-[0_0_10px_#00F2FF]">Exploration</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-syne uppercase tracking-widest text-white leading-none mb-4 md:mb-6">
            La <br className="hidden xl:block" /><span className="text-[#00F2FF] text-glow">Vitrine</span>
          </h2>
          <div className="w-8 md:w-12 h-[2px] bg-[#00F2FF] mb-4 md:mb-6 shadow-[0_0_10px_#00F2FF] mx-auto xl:mx-0" />
          <p className="font-manrope text-white/70 md:text-white/60 text-sm md:text-base max-w-xs sm:max-w-md mx-auto xl:mx-0 drop-shadow-md">
            {"Glissez à travers l'obscurité pour découvrir les archives classées de nos événements légendaires. Seuls les initiés savent."}
          </p>
        </div>

        <div className="w-[85vw] sm:w-[70vw] md:w-[60vw] xl:w-[35vw] h-[55vh] sm:h-[60vh] xl:h-[75vh] relative perspective-1000 z-10 pointer-events-none">
          {VITRINE_DATA.map((card, i) => (
            <StackedCard key={i} {...card} index={i} total={VITRINE_DATA.length} progress={activeScroll} />
          ))}
        </div>

      </motion.div>
    </section>
  );
}