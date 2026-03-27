"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisInit() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Stockage global de la progression du scroll pour éviter de requérir window.scrollY
    // (prévient le layout thrashing dans les boucles WebGL).
    lenis.on("scroll", (e: any) => {
      (window as any).lenisScroll = e.animatedScroll;
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
