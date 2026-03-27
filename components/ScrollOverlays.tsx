"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ScrollOverlays() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  const blurOpacity = useTransform(smoothScroll, [0, 1], [0, 0.8]);

  return (
    <>
      {/* PROGRESS SCROLL INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-[#00F2FF] z-[999] origin-left shadow-[0_0_20px_#00F2FF]"
        style={{ scaleX: smoothScroll, width: "100%" }}
      />
      {/* CALQUE DE FLOU DYNAMIQUE */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none backdrop-blur-[60px] bg-[#010101]/20"
        style={{ opacity: blurOpacity }}
      />
    </>
  );
}
