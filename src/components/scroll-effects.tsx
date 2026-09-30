"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
 * Scroll-driven motion for the whole site, built to stay smooth:
 *
 * Reveals. Elements marked data-scroll-reveal ("up" for text, "pop" for
 * cards and figures) start hidden and pop into place as they enter the
 * screen. One IntersectionObserver watches all of them; elements that enter
 * together are staggered in reading order. Only opacity, translate and scale
 * animate, so the work stays on the compositor, and each element's marker is
 * removed once it has arrived so its own hover transitions are untouched.
 *
 * Parallax. Elements marked data-parallax="<speed>" drift against the scroll
 * (0.2 moves at 80% of scroll speed). Their positions are measured once and
 * again only on resize or navigation; each frame then does arithmetic and one
 * transform write per on-screen layer, with no layout reads.
 *
 * Nothing is hidden without JavaScript, and nothing moves for visitors who
 * prefer reduced motion. Reveals wait until the loading screen starts to fade,
 * so anything already on screen arrives with the page.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.dataset.scrollFx = "";

    const cleanups: (() => void)[] = [];
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      cleanups.push(startReveals(), startParallax());
    };

    // Hold reveals until the splash hands the page over (data-reveal="in").
    if (root.dataset.reveal === "pending") {
      const watcher = new MutationObserver(() => {
        if (root.dataset.reveal !== "pending") {
          watcher.disconnect();
          start();
        }
      });
      watcher.observe(root, { attributes: true, attributeFilter: ["data-reveal"] });
      cleanups.push(() => watcher.disconnect());
    } else {
      start();
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}

const STAGGER = 90; // ms between elements that enter together
const STAGGER_CAP = 6; // later ones share the last delay rather than waiting longer
const SETTLE = 1300; // ms after which a revealed element drops its marker

function startReveals() {
  const timers: number[] = [];

  const observer = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);

      entering.forEach((entry, index) => {
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        const delay = Math.min(index, STAGGER_CAP) * STAGGER;
        element.style.setProperty("--scroll-delay", `${delay}ms`);
        element.dataset.in = "";
        timers.push(
          window.setTimeout(() => {
            delete element.dataset.scrollReveal;
            delete element.dataset.in;
            element.style.removeProperty("--scroll-delay");
          }, delay + SETTLE),
        );
      });
    },
    // Trigger a little before the element's top reaches the bottom edge.
    { rootMargin: "0px 0px -8% 0px", threshold: 0 },
  );

  document.querySelectorAll<HTMLElement>("[data-scroll-reveal]:not([data-in])").forEach((element) => observer.observe(element));

  return () => {
    observer.disconnect();
    timers.forEach((timer) => clearTimeout(timer));
  };
}

type Layer = {
  element: HTMLElement;
  speed: number;
  max: number;
  /** The scroll position at which the layer sits exactly where the layout put it. */
  origin: number;
  y: number;
  visible: boolean;
};

function startParallax() {
  const layers: Layer[] = [...document.querySelectorAll<HTMLElement>("[data-parallax]")].map((element) => ({
    element,
    speed: Number.parseFloat(element.dataset.parallax ?? "0") || 0,
    max: Number.parseFloat(element.dataset.parallaxMax ?? "") || 240,
    origin: 0,
    y: 0,
    visible: false,
  }));
  if (layers.length === 0) return () => {};

  let viewport = window.innerHeight;
  let scale = 1;
  let frame = 0;

  // The only layout reads: on start, on resize and when the page reflows.
  const measure = () => {
    viewport = window.innerHeight;
    scale = window.innerWidth < 768 ? 0.5 : 1;
    const scroll = window.scrollY;
    const end = document.documentElement.scrollHeight - viewport;
    for (const layer of layers) {
      const rect = layer.element.getBoundingClientRect();
      const top = rect.top + scroll - layer.y;
      // Layers in the first screen rest at the top of the page, so nothing
      // jumps on load; the rest rest when centred on screen, or at the very
      // end of the page if they can never reach the centre (the footer).
      layer.origin = top < viewport ? 0 : Math.min(top + rect.height / 2 - viewport / 2, end);
    }
  };

  const update = () => {
    frame = 0;
    const scroll = window.scrollY;
    for (const layer of layers) {
      if (!layer.visible) continue;
      const y = Math.max(-layer.max, Math.min(layer.max, (scroll - layer.origin) * layer.speed * scale));
      if (Math.abs(y - layer.y) < 0.1) continue;
      layer.y = y;
      layer.element.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    }
  };

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  const remeasure = () => {
    measure();
    schedule();
  };

  // Only layers near the screen are updated each frame.
  const visibility = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const layer = layers.find((item) => item.element === entry.target);
        if (layer) layer.visible = entry.isIntersecting;
      }
      schedule();
    },
    { rootMargin: "25% 0px" },
  );
  layers.forEach((layer) => visibility.observe(layer.element));

  const resize = new ResizeObserver(remeasure);
  resize.observe(document.body);

  measure();
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", remeasure);

  return () => {
    cancelAnimationFrame(frame);
    visibility.disconnect();
    resize.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", remeasure);
    for (const layer of layers) layer.element.style.removeProperty("transform");
  };
}
