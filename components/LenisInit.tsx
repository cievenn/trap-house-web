"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisInit() {
  useEffect(() => {
    // Si l'utilisateur est sur un écran tactile, le JS scroll-jacking (même optimisé)
    // est désastreux sur certains Androids. On force le scroll natif.
    const isTouch = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

    if (isTouch) {
      // Fallback: on alimente quand même la variable globale pour les autres composants
      const onNativeScroll = () => {
        (window as any).lenisScroll = window.scrollY;
      };
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      
      return () => {
        window.removeEventListener("scroll", onNativeScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
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
