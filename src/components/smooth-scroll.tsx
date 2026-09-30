"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/*
 * Site-wide smooth scrolling. Lenis eases wheel input and same-page anchor
 * jumps (honouring each target's scroll-margin), leaves touch scrolling
 * native, and switches itself off for visitors who prefer reduced motion.
 */
export function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{ autoRaf: true, lerp: 0.09, anchors: true, stopInertiaOnNavigate: true }}
    />
  );
}
