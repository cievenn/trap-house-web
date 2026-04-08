"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 60, damping: 20, mass: 0.5 };
  const smoothHeroScroll = useSpring(heroScroll, springConfig);

  const logoOpacity = useTransform(smoothHeroScroll, [0, 0.2], [1, 0]);
  const text1Opacity = useTransform(smoothHeroScroll, [0.15, 0.35, 0.5], [0, 1, 0]);
  const text1Y = useTransform(smoothHeroScroll, [0.15, 0.35, 0.5], [40, 0, -40]);
  const text2Opacity = useTransform(smoothHeroScroll, [0.45, 0.65, 0.8], [0, 1, 0]);
  const text2Y = useTransform(smoothHeroScroll, [0.45, 0.65, 0.8], [40, 0, -40]);
  const text3Opacity = useTransform(smoothHeroScroll, [0.75, 0.95], [0, 1]);
  const text3Y = useTransform(smoothHeroScroll, [0.75, 0.95], [40, 0]);

  return (
    <section id="vision" ref={heroRef} className="relative w-full h-[350vh]">
      <div className="sticky top-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6">

        {/* Logo 3D is now rendered in GlobalCanvas — this div just handles the scroll indicator */}
        <motion.div style={{ opacity: logoOpacity }} className="absolute inset-0 z-20 pointer-events-none">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 opacity-50 flex flex-col items-center pointer-events-none"
          >
            <span className="font-syne text-[8px] tracking-[0.4em] mb-2 uppercase text-[#00F2FF]">Swipe Down</span>
            <ChevronDown className="text-[#00F2FF]" size={16} />
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute max-w-3xl text-center pointer-events-none z-30">
          <p className="font-syne text-[#00F2FF] text-xs tracking-[0.4em] font-bold uppercase mb-4">Chapitre I</p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black font-syne uppercase tracking-widest text-white leading-tight drop-shadow-md">
            Oubliez les standards <br /> <span className="text-white/60">de la nuit.</span>
          </h2>
        </motion.div>

        <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute max-w-4xl text-center pointer-events-none z-30">
          <p className="font-syne text-[#00F2FF] text-xs tracking-[0.4em] font-bold uppercase mb-4">Chapitre II</p>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black font-syne uppercase tracking-widest text-white leading-tight drop-shadow-md">
            {"L'énergie de l'underground."} <br /> <span className="text-[#00F2FF] text-glow">{"L'exigence du premium."}</span>
          </h2>
        </motion.div>

        <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute max-w-3xl text-center flex flex-col items-center pointer-events-none z-30">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#00F2FF] to-transparent mb-8" />
          <p className="font-manrope text-white/70 text-base md:text-xl leading-relaxed font-light drop-shadow-xl bg-black/40 backdrop-blur-xl p-5 md:p-8 rounded-[2rem] border border-white/5">
            {"Nous créons plus que des soirées : nous concevons des moments d'exclusivité où la lumière fend l'obscurité, et où l'accès est un privilège absolu."}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
