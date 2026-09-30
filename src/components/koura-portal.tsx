"use client";

import { useEffect, useState } from "react";
import GlyphPortal, { type GlyphPortalStyle } from "@/components/ui/glyph-portal";

/*
 * The opening scroll: the camera flies into the Koura wordmark and comes out
 * inside it. Colours are taken from the logo, a navy tile with a neon cyan
 * glyph, and the scene inside runs from cyan into the site's neon green.
 */

const navy = "#0a1628";
const cyan = "#22e4ff";
const fallbackFamily = "Arial, sans-serif";

const palette: GlyphPortalStyle = {
  "--gp-paper": navy,
  "--gp-ink": "#e6f1ff",
  "--gp-field": cyan,
  "--gp-foreground": "#06101f",
};

const steps = [
  { no: "01", title: "Design", copy: "We start from the data model and work up to the interface." },
  { no: "02", title: "Build", copy: "One senior team writes the schema, the services and the screens." },
  { no: "03", title: "Run", copy: "We stay on call after launch, so what we ship keeps holding." },
];

export function KouraPortal() {
  // The portal freezes whichever face is loaded when it mounts, so wait for
  // the site font first. After 1.6 s it falls back to Arial rather than block.
  const [family, setFamily] = useState<string | null>(null);

  useEffect(() => {
    let settled = false;
    const finish = (value: string) => {
      if (!settled) {
        settled = true;
        setFamily(value);
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

  if (!family) {
    return <div aria-hidden="true" style={{ height: "100svh", background: navy }} />;
  }

  return (
    <GlyphPortal
      word="KOURA"
      // Always fly into the middle letter; no letter picking.
      focusChar="U"
      interactive={false}
      fontFamily={family}
      fontWeight={700}
      scrollLength={2.4}
      enterLabel="Step inside"
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
      front={
        <p
          className="absolute inset-x-6 m-0 text-center text-sm text-[#8ea5c4]"
          style={{ bottom: "calc(100% - var(--gp-word-top, 35%) + 32px)" }}
        >
          Software built to carry load.
        </p>
      }
    >
      <div className="container-sheet flex flex-col gap-10">
        <h2 className="display max-w-3xl text-[clamp(1.75rem,4vw,3rem)]">
          One team, from the schema to the interface.
        </h2>
        <ul className="grid gap-7 md:grid-cols-3 md:gap-14">
          {steps.map((step) => (
            <li key={step.no} className="border-t border-[#06101f]/30 pt-4">
              <h3 className="text-lg font-semibold">
                <span className="mr-3 font-mono text-xs tracking-[0.08em] opacity-70">{step.no}</span>
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] opacity-85">{step.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </GlyphPortal>
  );
}
