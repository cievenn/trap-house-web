"use client";

import dynamic from "next/dynamic";
import { LenisInit } from "@/components/LenisInit";
import { ScrollOverlays } from "@/components/ScrollOverlays";
import { useDeviceCapabilities } from "@/lib/useDeviceCapabilities";

// Lazy-load GPU-heavy components — ssr: false
const CustomCursor = dynamic(
  () =>
    import("@/components/CustomCursor").then((m) => ({
      default: m.CustomCursor,
    })),
  { ssr: false }
);
const GlobalCanvas = dynamic(
  () =>
    import("@/components/GlobalCanvas").then((m) => ({
      default: m.GlobalCanvas,
    })),
  { ssr: false }
);

/**
 * ClientShell — Infrastructure-only wrapper.
 * Contains scroll, cursor, and WebGL canvas. Does NOT wrap page content.
 * This allows children sections to benefit from streaming SSR / selective hydration.
 */
export function ClientShell() {
  const { isMobile } = useDeviceCapabilities();
  
  return (
    <>
      <LenisInit />
      {!isMobile && <CustomCursor />}
      <ScrollOverlays />
      <GlobalCanvas />
    </>
  );
}
