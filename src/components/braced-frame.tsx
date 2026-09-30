import Link from "next/link";
import type { CSSProperties } from "react";
import { pillars } from "@/lib/pillars";

const labelPlacement = [
  "items-start justify-start text-left",
  "items-start justify-end text-right",
  "items-end justify-start text-left",
  "items-end justify-end text-right",
];

// Frame edges overshoot their corners, the way construction lines do on a drawing.
const frameLines = [
  { d: "M-16 0H416", delay: 100 },
  { d: "M400 -16V416", delay: 220 },
  { d: "M416 400H-16", delay: 340 },
  { d: "M0 416V-16", delay: 460 },
];

const BRACES = "M200 0L400 200L200 400L0 200Z";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const joints = [
  [0, 0], [200, 0], [400, 0],
  [0, 200], [200, 200], [400, 200],
  [0, 400], [200, 400], [400, 400],
];

/** The Kuora frame, with one pillar per quadrant. Drawn for a dark panel. */
export function BracedFrame() {
  return (
    <figure className="w-full">
      <div className="relative aspect-square w-full">
        {/* The viewBox pads the 400-unit frame by 24 units on every side. */}
        <ul className="absolute inset-[5.357%] grid grid-cols-2 grid-rows-2">
          {pillars.map((pillar, index) => (
            <li key={pillar.id} className="flex">
              <Link
                href={`/philosophy#${pillar.id}`}
                className={`settle flex flex-1 p-3 text-sm font-medium text-panel-fg transition-colors hover:bg-brand-sky/10 hover:text-brand-mint focus-visible:bg-brand-sky/10 focus-visible:text-brand-mint focus-visible:outline-offset-[-3px] sm:p-4 sm:text-base ${labelPlacement[index]}`}
                style={delay(1500)}
              >
                {pillar.name}
              </Link>
            </li>
          ))}
        </ul>

        <svg
          viewBox="-24 -24 448 448"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          strokeLinecap="square"
        >
          <defs>
            <linearGradient id="brace-gradient" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0" style={{ stopColor: "var(--color-brand-sky)" }} />
              <stop offset="1" style={{ stopColor: "var(--color-brand-mint)" }} />
            </linearGradient>
          </defs>

          {frameLines.map((line) => (
            <path
              key={line.d}
              d={line.d}
              pathLength={1}
              className="draw stroke-panel-fg"
              strokeWidth="2"
              style={delay(line.delay)}
            />
          ))}
          <path
            d="M200 0V400M0 200H400"
            className="settle stroke-brand-sky/60"
            strokeWidth="1.25"
            style={delay(700)}
          />
          {/* Glow is a wide, faint stroke under the sharp one: no SVG filters, which can stall repaints. */}
          <path
            d={BRACES}
            pathLength={1}
            stroke="url(#brace-gradient)"
            className="draw"
            strokeWidth="10"
            strokeOpacity="0.16"
            style={delay(1000)}
          />
          <path
            d={BRACES}
            pathLength={1}
            stroke="url(#brace-gradient)"
            className="draw"
            strokeWidth="2.25"
            style={delay(1000)}
          />
          {/* Two pulses of load travelling round the braces. */}
          {[1900, 4300].map((ms) => (
            <g key={ms}>
              <path
                d={BRACES}
                pathLength={1}
                className="load-pulse stroke-brand-mint"
                strokeWidth="12"
                strokeOpacity="0.25"
                strokeLinecap="round"
                style={delay(ms)}
              />
              <path
                d={BRACES}
                pathLength={1}
                className="load-pulse stroke-brand-mint"
                strokeWidth="4"
                strokeLinecap="round"
                style={delay(ms)}
              />
            </g>
          ))}
          <g className="settle" style={delay(1500)}>
            {joints.map(([x, y]) => {
              const centre = x === 200 && y === 200;
              return (
                <rect
                  key={`${x}-${y}`}
                  x={x - 4.5}
                  y={y - 4.5}
                  width="9"
                  height="9"
                  className={centre ? "fill-brand-mint stroke-brand-mint" : "fill-panel stroke-panel-fg"}
                  strokeWidth="1.5"
                />
              );
            })}
          </g>
        </svg>
      </div>
    </figure>
  );
}
