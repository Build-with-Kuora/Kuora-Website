import Link from "next/link";
import { pillars } from "@/lib/pillars";
import { PillarGlyph } from "./kuora-mark";

// Borders that split the grid into four cells without doubling any edge.
const cellBorders = ["border-b lg:border-r", "border-b", "border-b lg:border-r lg:border-b-0", ""];

/**
 * The four pillars as one 2 × 2 grid, each in the quadrant its glyph marks.
 * With `detailed`, each quadrant carries the full principle, explanation and practices.
 */
export function PillarFrame({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="relative mt-12 grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-2">
      {pillars.map((pillar, index) => (
        <article
          key={pillar.id}
          id={detailed ? pillar.id : undefined}
          aria-labelledby={`${pillar.id}-title`}
          data-scroll-reveal="up"
          className={`relative scroll-mt-24 border-line p-6 sm:p-10 ${cellBorders[index]}`}
        >
          <PillarGlyph pillar={pillar.id} className="size-5 text-brand-mint" />
          <h3 id={`${pillar.id}-title`} className="display mt-8 text-[clamp(2rem,3.4vw,2.75rem)]">
            {detailed ? (
              pillar.name
            ) : (
              <Link href={`/philosophy#${pillar.id}`} className="after:absolute after:inset-0 hover:text-accent">
                {pillar.name}
              </Link>
            )}
          </h3>
          <p className="mt-3 text-xl font-medium tracking-[-0.01em]">{pillar.principle}</p>
          {detailed && (
            <>
              <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>
              <h4 className="label mt-8">In practice</h4>
              <ul className="mt-3 border-t border-line text-[0.9375rem]">
                {pillar.practice.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-line py-2.5">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand-mint" />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
