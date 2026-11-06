"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/scroll";

// Weighted, slightly slower scrolling. Turns itself off for prefers-reduced-motion.
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.9,
      anchors: { offset: -16 },
      stopInertiaOnNavigate: true,
      autoRaf: true,
    });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
