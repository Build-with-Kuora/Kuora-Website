import Link from "next/link";
import type { Metadata } from "next";
import { BracedFrame } from "@/components/braced-frame";
import { ContactBand } from "@/components/contact-band";
import { PageIntro } from "@/components/page-intro";
import { PillarFrame } from "@/components/pillar-frame";
import { RegistrationMarks } from "@/components/registration-marks";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "The four pillars Koura builds on: architecture, performance, interface and scale.",
};

export default function PhilosophyPage() {
  return (
    <>
      <PageIntro
        sheet="K-01"
        label="Philosophy"
        title="Structure first. Everything else rests on it."
        lead={
          <>
            <p>
              Every system we ship stands on four pillars: architecture, performance, interface
              and scale. Each one carries part of the load, and none of them is optional.
            </p>
            <p>
              We give each of them equal weight from the first day of a project, because a system
              is only as strong as the one that was left for later.
            </p>
          </>
        }
        aside={
          <figure className="relative border border-panel-line bg-panel p-6 text-panel-fg sm:p-8">
            <RegistrationMarks />
            <figcaption className="flex items-baseline justify-between gap-4">
              <span className="label text-panel-muted">Fig. 01 · The frame</span>
              <span className="label text-neon-green">Select a quadrant</span>
            </figcaption>
            <div className="mx-auto mt-4 max-w-sm">
              <BracedFrame />
            </div>
          </figure>
        }
      />

      <section aria-labelledby="pillars" className="container-sheet pb-24 lg:pb-32">
        <SectionHeading id="pillars">
          What each pillar carries.
        </SectionHeading>
        <PillarFrame detailed />
      </section>

      <section aria-labelledby="folds" className="container-sheet pb-24 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading id="folds" className="lg:col-span-5">
            Take one member away and the frame folds.
          </SectionHeading>
          <div className="space-y-5 text-lg text-muted lg:col-span-6 lg:col-start-7 lg:pt-2">
            <p>
              A fast system with a brittle data model fails. So does a scalable one that nobody can
              use, or a beautiful interface over queries that time out. They fail the same way:
              slowly at first, then all at once, under load.
            </p>
            <p>
              That is why we do not split the work into specialist hand-offs. The people who design
              the schema also build the interface and carry the pager, so every decision is made with
              the whole frame in view.
            </p>
            <Link href="/systems" className="btn-secondary mt-3">
              See how the pillars map onto our stack <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <ContactBand heading="Want a system built on all four?" />
    </>
  );
}
