import type { Metadata } from "next";
import { ContactBand } from "@/components/contact-band";
import { WorkGallery } from "@/components/work-gallery";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Systems Kura has designed, built and run, drawn as their architecture.",
};

export default function WorkPage() {
  return (
    <>
      <section className="container-sheet pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
        <h1 className="stretch-wide max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.02em]">
          Systems in production.
        </h1>
        <p className="mt-8 mb-12 max-w-2xl text-lg text-graphite sm:text-xl">
          Each project is shown as its architecture, because that is the part we are proudest of.
          Filter by the pillar that shaped it most.
        </p>
        <WorkGallery projects={projects} />
      </section>
      <ContactBand />
    </>
  );
}
