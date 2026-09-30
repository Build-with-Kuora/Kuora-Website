"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
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
    >
      <SectionSnap />
    </ReactLenis>
  );
}

// Clear the sticky header plus the same 2rem breathing room as scroll-mt-24.
const GAP = 32;

/*
 * Page-by-page scrolling on desktop: when a scroll comes to rest near the top
 * of a section, it settles there, just under the header. Sections keep their
 * natural height; "proximity" only snaps within reach of a section top, so a
 * section taller than the screen can still be read in the middle. Phones and
 * touch screens keep native scrolling.
 */
function SectionSnap() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let snap: Snap | null = null;
    let points: (() => void)[] = [];
    let frame = 0;

    const clear = () => {
      points.forEach((remove) => remove());
      points = [];
    };

    // Snap values are absolute scroll offsets, so re-measure whenever the layout moves.
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        clear();
        if (!snap) return;
        const header = document.querySelector<HTMLElement>("body > header")?.offsetHeight ?? 0;
        const targets = document.querySelectorAll<HTMLElement>(
          "main section:not(section section), main [data-snap], body > footer",
        );
        for (const target of targets) {
          const top = target.getBoundingClientRect().top + window.scrollY - header - GAP;
          points.push(snap.add(Math.max(0, Math.round(top))));
        }
      });
    };

    const toggle = () => {
      clear();
      snap?.destroy();
      snap = null;
      if (desktop.matches && !reduced.matches) {
        snap = new Snap(lenis, { type: "proximity", distanceThreshold: "40%", duration: 0.9, debounce: 200 });
        measure();
      }
    };

    toggle();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    desktop.addEventListener("change", toggle);
    reduced.addEventListener("change", toggle);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      desktop.removeEventListener("change", toggle);
      reduced.removeEventListener("change", toggle);
      clear();
      snap?.destroy();
    };
  }, [lenis, pathname]);

  return null;
}
