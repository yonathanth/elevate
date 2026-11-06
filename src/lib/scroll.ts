import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

// Freeze page scrolling (smooth scroll included) while an overlay is open.
export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}
