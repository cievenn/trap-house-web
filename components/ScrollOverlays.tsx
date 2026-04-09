"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useDeviceCapabilities } from "@/lib/useDeviceCapabilities";

export function ScrollOverlays() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  
  const { isMobile } = useDeviceCapabilities();

  // ASTUCE : Sur mobile, on utilise la valeur de scroll brute. Sur PC, on utilise le ressort.
  const activeScroll = isMobile ? scrollYProgress : smoothScroll;

  const overlayOpacity = useTransform(activeScroll, [0, 1], [0, 0.8]);

  const mobileOverlay = useTransform(overlayOpacity, (v: number) => v * 0.85);
  const desktopOverlay = useTransform(overlayOpacity, (v: number) => v * 0.35);

  return (
    <>
      {/* On peut même désactiver la barre de progression sur mobile pour gagner encore plus de perfs */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 h-[2px] bg-[#00F2FF] z-[999] origin-left shadow-[0_0_20px_#00F2FF]"
          style={{ scaleX: activeScroll, width: "100%" }}
        />
      )}

      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none bg-[#010101]"
        style={{ opacity: isMobile ? mobileOverlay : desktopOverlay }}
      />
    </>
  );
}