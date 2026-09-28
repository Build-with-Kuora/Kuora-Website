import type { CSSProperties } from "react";
import { pillars } from "@/lib/pillars";
import { TransitionLink } from "./page-transition";

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

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

const joints = [
  [0, 0], [200, 0], [400, 0],
  [0, 200], [200, 200], [400, 200],
  [0, 400], [200, 400], [400, 400],
];

/** The home page hero figure: the Kura frame, with one pillar per quadrant. */
export function BracedFrame() {
  return (
    <figure className="w-full">
      <div className="relative aspect-square w-full">
        {/* The viewBox pads the 400-unit frame by 24 units on every side. */}
        <ul className="absolute inset-[5.357%] grid grid-cols-2 grid-rows-2">
          {pillars.map((pillar, index) => (
            <li key={pillar.id} className="flex">
              <TransitionLink
                href={`/philosophy#${pillar.id}`}
                className={`settle flex flex-1 p-3 text-sm font-medium transition-colors hover:bg-plate hover:text-signal focus-visible:bg-plate focus-visible:text-signal focus-visible:outline-offset-[-3px] sm:p-4 sm:text-base ${labelPlacement[index]}`}
                style={delay(1500)}
              >
                {pillar.name}
              </TransitionLink>
            </li>
          ))}
        </ul>

        <svg
          viewBox="-24 -24 448 448"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
          strokeLinecap="square"
        >
          {frameLines.map((line) => (
            <path
              key={line.d}
              d={line.d}
              pathLength={1}
              className="draw stroke-chalk"
              strokeWidth="2"
              style={delay(line.delay)}
            />
          ))}
          <path
            d="M200 0V400"
            pathLength={1}
            className="draw stroke-graphite"
            strokeWidth="1.25"
            style={delay(700)}
          />
          <path
            d="M0 200H400"
            pathLength={1}
            className="draw stroke-graphite"
            strokeWidth="1.25"
            style={delay(700)}
          />
          <path
            d="M200 0L400 200L200 400L0 200Z"
            pathLength={1}
            className="draw stroke-signal"
            strokeWidth="1.5"
            style={delay(1000)}
          />
          <g className="settle" style={delay(1500)}>
            {joints.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" className="fill-ink stroke-chalk" strokeWidth="1.5" />
            ))}
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 max-w-sm px-[5.357%] text-sm text-graphite">
        Kura comes from <i>quadro</i>, a square frame. Each quadrant is braced, so no single
        member carries the load alone.
      </figcaption>
    </figure>
  );
}
