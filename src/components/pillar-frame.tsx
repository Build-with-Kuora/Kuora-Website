import Link from "next/link";
import { pillars } from "@/lib/pillars";
import { PillarGlyph } from "./koura-mark";

// Borders that turn four cells into one frame with a shared centre.
const cellBorders = ["border-b lg:border-r", "border-b", "border-b lg:border-r lg:border-b-0", ""];

/**
 * The four pillars laid out as the Koura frame itself. With `detailed`, each
 * quadrant carries the full principle, explanation and practices.
 */
export function PillarFrame({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="relative mt-12 grid border border-fg bg-surface lg:grid-cols-2">
      {pillars.map((pillar, index) => (
        <article
          key={pillar.id}
          id={detailed ? pillar.id : undefined}
          aria-labelledby={`${pillar.id}-title`}
          className={`relative scroll-mt-24 border-fg p-6 sm:p-10 ${cellBorders[index]}`}
        >
          <div className="flex items-center justify-between gap-4">
            <PillarGlyph pillar={pillar.id} className="size-5 text-fg" />
            <span className="label">Member {String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 id={`${pillar.id}-title`} className="display mt-10 text-[clamp(2rem,3.4vw,2.75rem)]">
            {detailed ? (
              pillar.name
            ) : (
              <Link href={`/philosophy#${pillar.id}`} className="after:absolute after:inset-0 hover:underline hover:decoration-2 hover:underline-offset-6">
                {pillar.name}
              </Link>
            )}
          </h3>
          <p className="mt-3 text-xl font-medium tracking-[-0.01em]">{pillar.principle}</p>
          {detailed && (
            <>
              <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>
              <h4 className="label mt-8">In practice</h4>
              <ul className="mt-3 border-t border-line-strong text-[0.9375rem]">
                {pillar.practice.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-line-strong py-2.5">
                    <span aria-hidden="true" className="size-2 shrink-0 bg-neon-green ring-1 ring-fg" />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      ))}
      {/* The joint where all four members meet. */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 hidden size-5 -translate-1/2 rotate-45 bg-neon-green ring-1 ring-fg lg:block"
      />
    </div>
  );
}
