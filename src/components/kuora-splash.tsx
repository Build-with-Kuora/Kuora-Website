"use client";

import { useEffect, useRef, useState } from "react";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";
import { INTRO_KEY, introSeen } from "@/lib/intro";

/*
 * The loading screen: the KUORA wordmark, then the camera flies into the O by
 * itself and the site fades in behind it. The portal is scroll-driven, so it
 * sits in its own overflow-hidden scroller and the splash drives scrollTop;
 * visitors never scroll it. Plays once per browser (see lib/intro): later
 * visits go straight to the page, with the cover hidden before first paint,
 * and the page's own entrance still plays.
 *
 * Colours are the logo's: the navy tile, and inside the letters the same
 * mint-to-sky gradient as the chevron.
 */

const navy = "#0e2440";
const fallbackFamily = "Arial, sans-serif";

const palette: GlyphPortalStyle = {
  "--gp-paper": navy,
  "--gp-ink": "#f5f8fc",
  "--gp-field": "#4fa6e2",
  "--gp-foreground": "#0e2440",
};

const hold = 700; // the word rests before the camera moves
const flight = 3200; // the zoom into the O
const fade = 900; // the splash dissolves into the page

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export function KuoraSplash() {
  const [phase, setPhase] = useState<"cover" | "play" | "fade" | "done">("cover");
  const [family, setFamily] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // Pick the face first: the portal freezes whichever one is loaded when it mounts.
  // Seen before, the cover stays hidden and none of this runs.
  useEffect(() => {
    if (introSeen()) return;
    let settled = false;
    const finish = (value: string) => {
      if (!settled) {
        settled = true;
        setFamily(value);
        setPhase("play");
      }
    };
    const site = getComputedStyle(document.documentElement).getPropertyValue("--font-instrument-sans").trim();
    const wanted = site ? `${site}, ${fallbackFamily}` : fallbackFamily;
    const timeout = window.setTimeout(() => finish(fallbackFamily), 1600);
    document.fonts.load(`700 100px ${wanted}`, "KUORA").then(
      () => finish(wanted),
      () => finish(fallbackFamily),
    );
    return () => {
      settled = true;
      clearTimeout(timeout);
    };
  }, []);

  // Hold the page out of view under the cover; it rises in as the cover fades.
  // Seen before, there is no cover, but the page still rises in: the intro
  // script has held it at "pending" since first paint, so let it go now.
  useEffect(() => {
    const root = document.documentElement;
    if (introSeen()) {
      const frame = requestAnimationFrame(() => {
        root.dataset.reveal = "in";
      });
      return () => cancelAnimationFrame(frame);
    }
    root.dataset.reveal = "pending";
    return () => {
      root.dataset.reveal = "in";
    };
  }, []);

  // Lock the page while the splash covers it.
  useEffect(() => {
    if (phase === "done" || introSeen()) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [phase]);

  // Fly into the O, then dissolve.
  useEffect(() => {
    if (phase !== "play") return;
    let cancelled = false;

    (async () => {
      await wait(hold);
      const el = scroller.current;
      const section = el?.querySelector<HTMLElement>("[data-gp-motion]");
      // The portal turns motion off for reduced motion or a stalled font; then just fade.
      if (el && section?.dataset.gpMotion === "on") {
        const distance = el.scrollHeight - el.clientHeight;
        const start = performance.now();
        await new Promise<void>((resolve) => {
          const step = (now: number) => {
            if (cancelled) return resolve();
            const t = Math.min(1, (now - start) / flight);
            el.scrollTop = distance * ease(t);
            if (t < 1) requestAnimationFrame(step);
            else resolve();
          };
          requestAnimationFrame(step);
        });
      }
      if (cancelled) return;
      setPhase("fade");
    })();

    return () => {
      cancelled = true;
    };
  }, [phase]);

  // Start the page reveal as the cover begins to fade, then remove the cover.
  // From here it counts as seen, so the next visit skips it.
  useEffect(() => {
    if (phase !== "fade") return;
    document.documentElement.dataset.reveal = "in";
    try {
      localStorage.setItem(INTRO_KEY, "seen");
    } catch {
      // Storage blocked: the splash simply plays again next time.
    }
    const timeout = window.setTimeout(() => setPhase("done"), fade);
    return () => clearTimeout(timeout);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      data-kuora-splash
      data-lenis-prevent
      aria-hidden="true"
      className="fixed inset-0 z-[100] transition-opacity ease-out motion-reduce:transition-none"
      style={{ background: navy, opacity: phase === "fade" ? 0 : 1, pointerEvents: phase === "fade" ? "none" : undefined, transitionDuration: `${fade}ms` }}
    >
      <style>{`
        [data-kuora-splash] [data-gp-caption],[data-kuora-splash] [data-gp-touch-picker]{display:none}
      `}</style>
      <noscript>
        <style>{`[data-kuora-splash]{display:none}`}</style>
      </noscript>
      {family && (
        <div ref={scroller} className="h-svh overflow-hidden">
          <GlyphPortal
            word="KUORA"
            focusChar="O"
            interactive={false}
            fontFamily={family}
            fontWeight={700}
            scrollLength={1.6}
            style={{ ...palette, fontFamily: family }}
            background={
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "scale(var(--gp-field-scale,1))",
                  background:
                    "radial-gradient(circle at 82% 10%, rgba(59,226,166,.9), transparent 42%), radial-gradient(circle at 16% 86%, rgba(79,166,226,.9), transparent 48%), linear-gradient(210deg,#3be2a6 0%,#46c2c6 45%,#4fa6e2 100%)",
                }}
              />
            }
          >
            <span />
          </GlyphPortal>
        </div>
      )}
    </div>
  );
}
