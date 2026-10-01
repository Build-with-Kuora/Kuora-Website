import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The closing call to action at the foot of every page. Given a tone, it is a
 * full-width band in that colour that snaps flush to the top, as on the
 * landing page; otherwise a rule sets it apart from the content above.
 */
export function ContactBand({
  heading = "Have a system that needs to carry more?",
  tone,
}: {
  heading?: string;
  tone?: string;
}) {
  return (
    <section
      aria-labelledby="contact-heading"
      data-snap={tone ? "flush" : undefined}
      className={tone ? `${tone} py-24 lg:py-32` : "container-sheet pb-24 lg:pb-32"}
    >
      <div
        className={`grid gap-8 lg:grid-cols-12 lg:items-end ${
          tone ? "container-sheet" : "border-t border-line-strong pt-12 lg:pt-16"
        }`}
      >
        <h2 id="contact-heading" data-scroll-reveal="up" className="display text-[clamp(2.25rem,4.6vw,3.75rem)] lg:col-span-7">
          {heading}
        </h2>
        <div data-scroll-reveal="up" className="lg:col-span-4 lg:col-start-9">
          <p className="text-lg text-muted">
            Tell us what you are building and where it strains. We will reply with how we would
            approach it.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/start" className="btn-primary">
              Start a project
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-[0.9375rem] underline decoration-line-strong underline-offset-4 hover:decoration-fg"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
