import type { Metadata } from "next";
import { ContactBand } from "@/components/contact-band";
import { PageIntro } from "@/components/page-intro";
import { WorkGallery } from "@/components/work-gallery";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Systems Koura has designed, built and run, drawn as their architecture.",
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        title="Systems in production."
        lead={
          <p>
            Each project is filed as its architecture, because that is the part we are proudest of.
            Filter by the pillar that shaped it most.
          </p>
        }
      />
      <section className="container-sheet pb-24 lg:pb-32">
        <WorkGallery projects={projects} />
      </section>
      <ContactBand />
    </>
  );
}
