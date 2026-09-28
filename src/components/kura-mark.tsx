import type { PillarId } from "@/lib/pillars";

/*
 * The Kura frame: a square divided into four, with each quadrant braced by a
 * diagonal. Together the braces form a diamond, so no member carries the load
 * alone. The same geometry is used for the logo, the hero figure and the
 * pillar glyphs.
 */

export function KuraMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      strokeLinecap="square"
    >
      <rect x="1.5" y="1.5" width="21" height="21" className="stroke-chalk" strokeWidth="2" />
      <path d="M12 1.5v21M1.5 12h21" className="stroke-chalk" strokeWidth="1.25" />
      <path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" className="stroke-signal" strokeWidth="1.25" />
    </svg>
  );
}

const quadrantOrigin: Record<PillarId, [number, number]> = {
  architecture: [0, 0],
  performance: [8, 0],
  interface: [0, 8],
  scale: [8, 8],
};

/** Shows which quadrant of the frame a pillar occupies. */
export function PillarGlyph({ pillar, className }: { pillar: PillarId; className?: string }) {
  const [x, y] = quadrantOrigin[pillar];
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <rect x={x} y={y} width="8" height="8" className="fill-chalk" />
      <rect x="0.5" y="0.5" width="15" height="15" className="stroke-graphite" />
      <path d="M8 0.5v15M0.5 8h15" className="stroke-graphite" />
    </svg>
  );
}
