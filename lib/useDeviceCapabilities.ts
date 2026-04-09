// lib/useDeviceCapabilities.ts
// Centralized device detection hook — single source of truth.
// Replaces duplicated `window.matchMedia` checks scattered across components.

"use client";

import { useSyncExternalStore } from "react";

interface DeviceCapabilities {
  /** Touch-primary device (phone, tablet) */
  isTouch: boolean;
  /** Combined: isMobile is identical to isTouch */
  isMobile: boolean;
}

// SSR-safe defaults (assume desktop until hydrated)
const SSR_DEFAULTS: DeviceCapabilities = {
  isTouch: false,
  isMobile: false,
};

// Client-side singleton — computed once
let clientCaps: DeviceCapabilities | null = null;

function getClientCaps(): DeviceCapabilities {
  if (clientCaps) return clientCaps;
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  clientCaps = { isTouch, isMobile: isTouch };
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
