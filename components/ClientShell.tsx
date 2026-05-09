"use client";

import dynamic from "next/dynamic";
import { LenisInit } from "@/components/LenisInit";
import { ScrollOverlays } from "@/components/ScrollOverlays";

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
  return (
    <>
      <LenisInit />
      <CustomCursor />
      <ScrollOverlays />
      <GlobalCanvas />
    </>
  );
}
