"use client";

import React, { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { VITRINE_DATA, VitrineCardType } from "@/lib/data";

const VITRINE_BUFFER = 0.10;

const StackedCard = ({ src, supertitle, volume, status, description, index, total, progress }: VitrineCardType & { index: number; total: number; progress: any }) => {
  const getDepth = useCallback((p: number) => {
    const effective = Math.max(0, p - VITRINE_BUFFER) / (1 - VITRINE_BUFFER);
    return index - effective * total;
  }, [index, total]);

  const x = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth < 0) return `${depth * 80}%`;
    return "0%";
  });

  const y = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth < 0) return `${depth * 250}px`;
    return `${depth * 40}px`;
  });

  const scale = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth < 0) return 1 + Math.abs(depth) * 0.3;
    return Math.max(1 - depth * 0.06, 0.8);
  });

  const rotateZ = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth < 0) return `${depth * 15}deg`;
    return `${(index % 2 === 0 ? 1 : -1) * depth * 2}deg`;
  });

  const opacity = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth < 0) return Math.max(1 - Math.abs(depth) * 1.5, 0);
    return 1;
  });

  const filter = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth < 0) {
      const blurValue = Math.min(Math.pow(Math.abs(depth) * 6, 2), 40);
      return `blur(${blurValue}px) grayscale(${Math.min(Math.abs(depth) * 100, 100)}%)`;
    }
    return "blur(0px) grayscale(0%)";
  });

  const depthShadow = useTransform(progress, (p: number) => {
    const depth = getDepth(p);
    if (depth <= 0) return 0;
    return Math.min(depth * 0.5, 0.85);
  });

  return (
    <motion.div
      style={{ x, y, scale, rotateZ, opacity, filter, zIndex: total - index }}
      className="absolute inset-0 origin-center w-full h-full will-change-transform"
    >
      <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[#020202] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col justify-end group">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={src}
            alt={`Trap House Archive ${index}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 35vw"
            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out opacity-80"
            loading="lazy"
          />
        </div>

        <motion.div style={{ opacity: depthShadow }} className="absolute inset-0 bg-[#020202] pointer-events-none z-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-[#010101]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,153,255,0.05)_0%,transparent_30%)] z-10" />

        <div className="relative z-20 p-8 md:p-12 w-full">
          <div className="flex justify-between items-end w-full border-b border-white/10 pb-6 mb-6">
            <div>
              <p className="font-syne font-bold tracking-[0.4em] text-[#0099FF] text-[10px] uppercase mb-2 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099FF] animate-pulse shadow-[0_0_10px_#0099FF]" />
                {supertitle}
              </p>
              <h3 className="font-syne font-black text-white text-5xl md:text-6xl tracking-[0.1em] uppercase leading-none drop-shadow-2xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">{volume}</span>
              </h3>
            </div>
            <div className="text-right hidden md:block">
              <p className="font-syne text-white/30 text-[9px] tracking-[0.3em] uppercase mb-1">Status</p>
              <p className="font-syne text-[#0099FF] text-[10px] font-bold tracking-[0.2em] uppercase">{status}</p>
            </div>
          </div>
          <p className="font-manrope text-white/50 text-sm max-w-[90%] md:max-w-[80%] leading-relaxed">{description}</p>
        </div>

        <div className="absolute inset-0 border border-white/5 rounded-[2rem] pointer-events-none z-40" />
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#0099FF]/60 to-transparent z-40 opacity-50" />
      </div>
    </motion.div>
  );
};

export function VitrineSection() {
  const vitrineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: vitrineScroll } = useScroll({
    target: vitrineRef,
    offset: ["start start", "end end"],
  });

  const smoothVitrineScroll = useSpring(vitrineScroll, { stiffness: 70, damping: 25, mass: 0.8, restDelta: 0.0001 });
  const vitrineOpacity = useTransform(smoothVitrineScroll, [0.9, 1], [1, 0]);
  const vitrineScale = useTransform(smoothVitrineScroll, [0.9, 1], [1, 0.95]);

  return (
    <section
      id="vitrine"
      ref={vitrineRef}
      className="relative w-full bg-transparent z-20"
      style={{ height: `${VITRINE_DATA.length * 120}vh` }}
    >
      <motion.div
        style={{ opacity: vitrineOpacity, scale: vitrineScale }}
        className="sticky top-0 w-full h-[100dvh] flex flex-col xl:flex-row items-center justify-center xl:justify-between px-6 md:px-[10vw] overflow-hidden"
      >
        <div className="w-full xl:w-1/3 flex flex-col justify-center mb-16 xl:mb-0 z-30 pointer-events-none text-center xl:text-left mt-20 xl:mt-0">
          <span className="font-syne text-[#00F2FF] text-[10px] tracking-[0.4em] font-bold mb-4 uppercase drop-shadow-[0_0_10px_#00F2FF]">Exploration</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-syne uppercase tracking-widest text-white leading-none mb-6">
            La <br className="hidden xl:block" /><span className="text-[#00F2FF] text-glow">Vitrine</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#00F2FF] mb-6 shadow-[0_0_10px_#00F2FF] mx-auto xl:mx-0" />
          <p className="font-manrope text-white/50 text-base md:text-lg max-w-md mx-auto xl:mx-0 drop-shadow-md">
            {"Glissez à travers l'obscurité pour découvrir les archives classées de nos événements légendaires. Seuls les initiés savent."}
          </p>
        </div>
        <div className="w-full md:w-[60vw] xl:w-[35vw] h-[60vh] xl:h-[75vh] relative perspective-1000 z-10 pointer-events-none">
          {VITRINE_DATA.map((card, i) => (
            <StackedCard key={i} {...card} index={i} total={VITRINE_DATA.length} progress={smoothVitrineScroll} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
