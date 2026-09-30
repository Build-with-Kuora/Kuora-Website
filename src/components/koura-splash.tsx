"use client";

import { useEffect, useRef, useState } from "react";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";
import { splashKey } from "@/lib/splash";

/*
 * The loading screen: the KOURA wordmark, then the camera flies into the U by
 * itself and the site fades in behind it. The portal is scroll-driven, so it
 * sits in its own overflow-hidden scroller and the splash drives scrollTop;
 * visitors never scroll it. Shown once per tab session.
 *
 * Colours are the logo's: navy ground, and a scene inside the letters that
 * runs from neon cyan into neon green.
 */

const navy = "#0a1628";
const fallbackFamily = "Arial, sans-serif";

const palette: GlyphPortalStyle = {
  "--gp-paper": navy,
  "--gp-ink": "#e6f1ff",
  "--gp-field": "#22e4ff",
  "--gp-foreground": "#06101f",
};

const hold = 700; // the word rests before the camera moves
const flight = 3200; // the zoom into the U
const fade = 900; // the splash dissolves into the page

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const playedThisSession = () => document.documentElement.dataset.splash === "done";

export function KouraSplash() {
  const [phase, setPhase] = useState<"cover" | "play" | "fade" | "done">("cover");
  const [family, setFamily] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // Pick the face first: the portal freezes whichever one is loaded when it mounts.
  useEffect(() => {
    // Already played in this tab: the head script hid the cover before paint.
    if (playedThisSession()) return;

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
    document.fonts.load(`700 100px ${wanted}`, "KOURA").then(
      () => finish(wanted),
      () => finish(fallbackFamily),
    );
    return () => {
      settled = true;
      clearTimeout(timeout);
    };
  }, []);

  // Lock the page while the splash covers it.
  useEffect(() => {
    if (phase === "done" || playedThisSession()) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [phase]);

  // Fly into the U, then dissolve.
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
      try {
        sessionStorage.setItem(splashKey, "1");
      } catch {}
      setPhase("fade");
    })();

    return () => {
      cancelled = true;
    };
  }, [phase]);

  // Remove the cover once it has faded out.
  useEffect(() => {
    if (phase !== "fade") return;
    const timeout = window.setTimeout(() => setPhase("done"), fade);
    return () => clearTimeout(timeout);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      data-koura-splash
      aria-hidden="true"
      className="fixed inset-0 z-[100] transition-opacity ease-out motion-reduce:transition-none"
      style={{ background: navy, opacity: phase === "fade" ? 0 : 1, pointerEvents: phase === "fade" ? "none" : undefined, transitionDuration: `${fade}ms` }}
    >
      <style>{`
        [data-splash="done"] [data-koura-splash]{display:none}
        [data-koura-splash] [data-gp-caption],[data-koura-splash] [data-gp-touch-picker]{display:none}
      `}</style>
      <noscript>
        <style>{`[data-koura-splash]{display:none}`}</style>
      </noscript>
      {family && (
        <div ref={scroller} className="h-svh overflow-hidden">
          <GlyphPortal
            word="KOURA"
            focusChar="U"
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
                    "radial-gradient(circle at 18% 12%, rgba(180,248,255,.55), transparent 34%), radial-gradient(circle at 80% 78%, rgba(57,255,136,.85), transparent 46%), linear-gradient(135deg,#22e4ff 0%,#2cf0d0 55%,#39ff88 100%)",
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
