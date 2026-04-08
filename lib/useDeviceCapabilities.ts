// lib/useDeviceCapabilities.ts
// Centralized device detection hook — single source of truth.
// Replaces duplicated `window.matchMedia` checks scattered across components.

"use client";

import { useSyncExternalStore } from "react";

interface DeviceCapabilities {
  /** Touch-primary device (phone, tablet) */
  isTouch: boolean;
  /** Low CPU core count (≤4) — likely mobile or entry-level */
  isLowEnd: boolean;
  /** Combined: isTouch OR isLowEnd */
  isMobile: boolean;
}

// SSR-safe defaults (assume desktop until hydrated)
const SSR_DEFAULTS: DeviceCapabilities = {
  isTouch: false,
  isLowEnd: false,
  isMobile: false,
};

// Client-side singleton — computed once
let clientCaps: DeviceCapabilities | null = null;

function getClientCaps(): DeviceCapabilities {
  if (clientCaps) return clientCaps;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const isLowEnd = navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency <= 4
    : false;
  clientCaps = { isTouch, isLowEnd, isMobile: isTouch || isLowEnd };
  return clientCaps;
}

// Static store — device capabilities don't change during session
const subscribe = () => () => {}; // No-op: value never changes
const getSnapshot = () => getClientCaps();
const getServerSnapshot = () => SSR_DEFAULTS;

/**
 * SSR-safe device detection hook.
 * Uses useSyncExternalStore to avoid hydration mismatches and
 * the problematic setState-in-useEffect pattern.
 */
export function useDeviceCapabilities(): DeviceCapabilities {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
