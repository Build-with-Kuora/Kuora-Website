import type { Metadata } from "next";
import { ContactBand } from "@/components/contact-band";
import { PillarGlyph } from "@/components/kura-mark";
import { TransitionLink } from "@/components/page-transition";
import { pillars } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "The four pillars Kura builds on: architecture, performance, interface and scale.",
};

// Borders that turn four cells into one frame with a shared centre.
const cellBorders = [
  "border-b lg:border-r",
  "border-b",
  "border-b lg:border-r lg:border-b-0",
  "",
];

export default function PhilosophyPage() {
  return (
    <>
      <section className="container-sheet pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-20">
        <h1 className="stretch-wide text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.02em]">
          <span className="block">Structure first.</span>
          <span className="block">Everything else rests on it.</span>
        </h1>
        <div className="mt-8 grid gap-6 text-lg text-graphite sm:text-xl lg:grid-cols-2 lg:gap-10">
          <p>
            Kura comes from <i>quadro</i>: a square frame of four members. Each one carries part
            of the load, and none of them is optional.
          </p>
          <p>
            We build software the same way. Every system we ship stands on four pillars, and we
            give each of them equal weight from the first day of a project.
          </p>
        </div>
      </section>

      <section aria-label="The four pillars" className="container-sheet pb-20 lg:pb-28">
        <div className="relative grid border border-line lg:grid-cols-2">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.id}
              id={pillar.id}
              aria-labelledby={`${pillar.id}-heading`}
              className={`scroll-mt-24 border-line p-6 sm:p-10 lg:p-12 ${cellBorders[index]}`}
            >
              <div className="flex items-center gap-3">
                <PillarGlyph pillar={pillar.id} className="size-5" />
                <h2
                  id={`${pillar.id}-heading`}
                  className="stretch-wide text-3xl font-semibold tracking-tight"
                >
                  {pillar.name}
                </h2>
              </div>
              <p className="mt-6 text-xl leading-snug sm:text-2xl">{pillar.principle}</p>
              <p className="mt-4 max-w-prose text-base text-graphite">{pillar.body}</p>
              <h3 className="stretch-narrow mt-8 text-sm text-graphite">In practice</h3>
              <ul className="mt-3 space-y-2.5 text-base">
                {pillar.practice.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          {/* The joint where all four members meet. */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 hidden size-4 -translate-1/2 rotate-45 border-2 border-signal bg-ink lg:block"
          />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-sheet grid gap-8 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <h2 className="stretch-wide text-3xl leading-tight font-semibold tracking-tight lg:col-span-5">
            Take one member away and the frame folds.
          </h2>
          <div className="space-y-5 text-lg text-graphite lg:col-span-7">
            <p>
              A fast system with a brittle data model fails. So does a scalable one that nobody can
              use, or a beautiful interface over queries that time out. They fail the same way:
              slowly at first, then all at once, under load.
            </p>
            <p>
              That is why we do not split the work into specialist hand-offs. The people who design
              the schema also build the interface and carry the pager, so every decision is made
              with the whole frame in view.
            </p>
            <p>
              <TransitionLink
                href="/systems"
                className="text-chalk underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
              >
                See how the pillars map onto our stack
              </TransitionLink>
            </p>
          </div>
        </div>
      </section>

      <ContactBand heading="Want a system built on all four?" />
    </>
  );
}
