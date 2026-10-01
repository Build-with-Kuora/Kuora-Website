"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
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
      options={{ autoRaf: true, lerp: 0.1, anchors: true, stopInertiaOnNavigate: true }}
    >
      <SectionSnap />
    </ReactLenis>
  );
}

// Clear the floating nav plus 2rem of breathing room, close to scroll-mt-24.
const GAP = 32;
// How long the scroll must be still before settling, and how far it may reach.
const IDLE = 180;
const REACH = 0.25;
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/*
 * Page-by-page settling on desktop. When a scroll comes to rest a short way
 * before the next section's top, it glides on to it, just under the nav.
 *
 * It only ever moves forward, in the direction you were already scrolling,
 * never back to a section you have left, so it can't drag against you. It
 * waits until the scroll has been still for a moment, stays out of the way
 * while you hold the scrollbar, and lets go the instant you scroll again.
 * Sections keep their natural height, and anything farther than a quarter
 * of the screen from a section top is left exactly where you stopped. A
 * section marked data-snap="flush" fills the screen, so it settles with its
 * top at the top of the screen instead and clears the nav with its own
 * padding.
 * Touch screens and reduced motion keep plain scrolling.
 */
function SectionSnap() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let points: number[] = [];
    let frame = 0;
    let timer = 0;
    let direction = 0;
    let snapping = false;
    let release = 0;
    let held = false;
    let movedWhileHeld = false;

    // Snap values are absolute scroll offsets, so re-measure whenever the layout moves.
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // The nav floats, so clear its bottom edge. offsetTop ignores the reveal's translate.
        const nav = document.querySelector<HTMLElement>("body > header");
        const header = nav ? nav.offsetTop + nav.offsetHeight : 0;
        const targets = document.querySelectorAll<HTMLElement>(
          "main section:not(section section), main [data-snap], body > footer",
        );
        points = [...targets]
          .map((target) => {
            const offset = target.dataset.snap === "flush" ? 0 : header + GAP;
            return Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - offset));
          })
          .sort((a, b) => a - b);
      });
    };

    const stopSnapping = () => {
      snapping = false;
      clearTimeout(release);
    };

    const settle = () => {
      timer = 0;
      if (snapping || held || !desktop.matches || reduced.matches) return;
      const scroll = lenis.scroll;
      const reach = window.innerHeight * REACH;
      const ahead =
        direction > 0
          ? points.find((point) => point > scroll + 2 && point - scroll <= reach)
          : direction < 0
            ? points.findLast((point) => point < scroll - 2 && scroll - point <= reach)
            : undefined;
      if (ahead === undefined) return;

      const duration = 0.7;
      snapping = true;
      // If the glide is interrupted and never completes, don't stay locked out.
      release = window.setTimeout(stopSnapping, duration * 1000 + 200);
      lenis.scrollTo(Math.min(ahead, lenis.limit), { duration, easing: easeOut, onComplete: stopSnapping });
    };

    const schedule = () => {
      clearTimeout(timer);
      timer = window.setTimeout(settle, IDLE);
    };

    const offScroll = lenis.on("scroll", (instance) => {
      if (snapping) return;
      if (instance.direction !== 0) direction = instance.direction;
      if (held) movedWhileHeld = true;
      else schedule();
    });
    // Any new wheel or touch input cancels a glide in progress.
    const offInput = lenis.on("virtual-scroll", () => {
      if (snapping) stopSnapping();
    });

    // Holding the scrollbar pauses settling until release; a plain click never settles.
    const press = () => {
      held = true;
      movedWhileHeld = false;
      clearTimeout(timer);
    };
    const lift = () => {
      held = false;
      if (movedWhileHeld) schedule();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", lift, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      clearTimeout(release);
      offScroll();
      offInput();
      observer.disconnect();
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", lift);
    };
  }, [lenis, pathname]);

  return null;
}
