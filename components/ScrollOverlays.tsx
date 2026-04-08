"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function ScrollOverlays() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  const blurOpacity = useTransform(smoothScroll, [0, 1], [0, 0.8]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Si l'utilisateur est sur tactile ou a un petit GPU, on désactive le flou de fond (backdrop-blur)
    if (typeof window !== "undefined") {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;
      setIsMobile(isTouch || isLowEnd);
    }
  }, []);

  return (
    <>
      {/* PROGRESS SCROLL INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-[#00F2FF] z-[999] origin-left shadow-[0_0_20px_#00F2FF]"
        style={{ scaleX: smoothScroll, width: "100%" }}
      />
      {/* CALQUE DE LUMINOSITÉ (Sans flou si mobile) */}
      {!isMobile && (
        <motion.div
          className="fixed inset-0 z-[1] pointer-events-none backdrop-blur-[60px] bg-[#010101]/20"
          style={{ opacity: blurOpacity }}
        />
      )}
      {isMobile && (
        <motion.div
          className="fixed inset-0 z-[1] pointer-events-none bg-[#010101]/60"
          style={{ opacity: blurOpacity }}
        />
      )}
    </>
  );
}
