// lib/scrollStore.ts
// Module-level scroll store — zero dependency, zero re-render.
// Written to by LenisInit, read by R3F shaders via getScroll().

let _scroll = 0;

export function setScroll(value: number) {
  _scroll = value;
}

export function getScroll(): number {
  return _scroll;
}
