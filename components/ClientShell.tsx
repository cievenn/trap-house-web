"use client";

import dynamic from "next/dynamic";
import { LenisInit } from "@/components/LenisInit";
import { ScrollOverlays } from "@/components/ScrollOverlays";

// Lazy-load GPU-heavy components (Three.js / WebGL) — ssr: false
const CustomCursor = dynamic(
  () => import("@/components/CustomCursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);
const SmokeBackground = dynamic(
  () => import("@/components/SmokeBackground").then((m) => ({ default: m.SmokeBackground })),
  { ssr: false }
);

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full relative bg-[#010101]">
      <LenisInit />
      <CustomCursor />
      <ScrollOverlays />
      <SmokeBackground />
      {children}
    </div>
  );
}
