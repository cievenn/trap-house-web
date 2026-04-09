"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setScroll } from "@/lib/scrollStore";

export function LenisInit() {
  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    if (isTouch) {
      let lastTime = 0;

      const onNativeScroll = () => {
        const now = performance.now();
        if (now - lastTime > 60) {
          lastTime = now;
          window.requestAnimationFrame(() => {
            setScroll(window.scrollY);
          });
        }
      };
      
      window.addEventListener("scroll", onNativeScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onNativeScroll);
      };
    }

    // Desktop: smooth scroll via Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", (e: { animatedScroll: number }) => {
      setScroll(e.animatedScroll);
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
