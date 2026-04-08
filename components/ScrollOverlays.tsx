"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useDeviceCapabilities } from "@/lib/useDeviceCapabilities";

export function ScrollOverlays() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  const overlayOpacity = useTransform(smoothScroll, [0, 1], [0, 0.8]);

  const { isMobile } = useDeviceCapabilities();

  // Pre-compute the final opacity transform (hooks must be at top level)
  const mobileOverlay = useTransform(overlayOpacity, (v: number) => v * 0.85);
  const desktopOverlay = useTransform(overlayOpacity, (v: number) => v * 0.35);

  return (
    <>
      {/* PROGRESS SCROLL INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-[#00F2FF] z-[999] origin-left shadow-[0_0_20px_#00F2FF]"
        style={{ scaleX: smoothScroll, width: "100%" }}
      />

      {/*
        OVERLAY — replaces the expensive `backdrop-blur-[60px]`.
        Same visual darkening effect, ~0 GPU cost.
        Mobile gets a stronger opacity (no blur fallback needed).
      */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none bg-[#010101]"
        style={{ opacity: isMobile ? mobileOverlay : desktopOverlay }}
      />
    </>
  );
}
