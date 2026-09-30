import type { CSSProperties } from "react";
import type { PillarId } from "@/lib/pillars";

/*
 * The Koura K, measured from the logo artwork on its 60-unit grid. The stem
 * and the chevron share a top (13) and bottom (47), sit 2 units apart at the
 * vertex, and the chevron's tips are cut flat. The chevron runs from mint at
 * its upper tip into sky blue.
 */
const STEM = { x: 14, y: 13, width: 6.5, height: 34 };
const CHEVRON = "M39 13h9L31 30l17 17h-9L22 30Z";

function ChevronGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="46" y1="13" x2="27" y2="31" gradientUnits="userSpaceOnUse">
      <stop offset="0.15" stopColor="#3be2a6" />
      <stop offset="0.75" stopColor="#4fa6e2" />
    </linearGradient>
  );
}

/** The logo itself: the K on its navy tile. */
export function KouraMark({ className, id = "koura-mark" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <defs>
        <ChevronGradient id={id} />
      </defs>
      <rect width="60" height="60" rx="13" fill="#0e2440" />
      <rect {...STEM} rx="0.75" fill="#fff" />
      <path d={CHEVRON} fill={`url(#${id})`} />
    </svg>
  );
}

const quadrantOrigin: Record<PillarId, [number, number]> = {
  architecture: [0, 0],
  performance: [8, 0],
  interface: [0, 8],
  scale: [8, 8],
};

/** Marks a pillar by its quadrant of a 2 × 2 grid. */
export function PillarGlyph({ pillar, className }: { pillar: PillarId; className?: string }) {
  const [x, y] = quadrantOrigin[pillar];
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x={x} y={y} width="8" height="8" className="fill-current" />
      <rect x="0.5" y="0.5" width="15" height="15" className="stroke-current" />
      <path d="M8 0.5v15M0.5 8h15" className="stroke-current" />
    </svg>
  );
}

/**
 * The logo's K without its tile, at display size, for the hero watermark.
 * Same geometry as KouraMark, cropped to the glyph; the stem takes the text
 * colour so it stays visible in the light theme. With `drawDelay`, the stem
 * draws top to bottom and then the chevron tip to tip, as the page reveals
 * after the loading screen. The chevron is drawn as a wide stroke along its
 * centre line and clipped to the exact outline, so its flat tips stay true
 * while it draws.
 */
export function KouraMonogram({ className, drawDelay }: { className?: string; drawDelay?: number }) {
  const draw = (delay: number) =>
    drawDelay === undefined
      ? {}
      : {
          pathLength: 1,
          strokeDasharray: 1,
          "data-reveal-draw": "",
          style: { "--reveal-delay": `${drawDelay + delay}ms` } as CSSProperties,
        };
  return (
    <svg viewBox="14 13 34 34" fill="none" className={className} aria-hidden="true">
      <defs>
        <ChevronGradient id="koura-monogram-gradient" />
        <clipPath id="koura-monogram-chevron">
          <path d={CHEVRON} />
        </clipPath>
      </defs>
      <path d={`M${STEM.x + STEM.width / 2} ${STEM.y}v${STEM.height}`} className="stroke-fg" strokeWidth={STEM.width} {...draw(0)} />
      <path
        d="M47.5 9 26.5 30l21 21"
        stroke="url(#koura-monogram-gradient)"
        strokeWidth="10"
        clipPath="url(#koura-monogram-chevron)"
        {...draw(350)}
      />
    </svg>
  );
}
