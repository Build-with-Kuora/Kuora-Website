import type { PillarId } from "@/lib/pillars";

/*
 * The Koura logo: a navy tile with a white stem and a chevron that runs from
 * mint at its tip into sky blue, together reading as a K and an opening
 * angle bracket. Drawn on a 60-unit grid to match the source artwork.
 */
export function KouraMark({ className, id = "koura-mark" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="44" y1="12" x2="27" y2="31" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3be2a6" />
          <stop offset="1" stopColor="#4fa6e2" />
        </linearGradient>
      </defs>
      <rect width="60" height="60" rx="13" fill="#0e2440" />
      <rect x="14" y="12" width="6.5" height="36" rx="1.25" fill="#fff" />
      <path d="M44 12.5 27.5 30 44 47.5" fill="none" stroke={`url(#${id})`} strokeWidth="6.5" />
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
