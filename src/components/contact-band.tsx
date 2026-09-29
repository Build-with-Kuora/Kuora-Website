import Link from "next/link";
import { site } from "@/lib/site";

/** The closing call to action at the foot of every page. */
export function ContactBand({ heading = "Have a system that needs to carry more?" }: { heading?: string }) {
  return (
    <section className="container-sheet pb-24 lg:pb-32" aria-labelledby="contact-heading">
      <div className="grid gap-8 border-t border-line-strong pt-12 lg:grid-cols-12 lg:items-end lg:pt-16">
        <h2 id="contact-heading" className="display text-[clamp(2.25rem,4.6vw,3.75rem)] lg:col-span-7">
          {heading}
        </h2>
        <div className="lg:col-span-4 lg:col-start-9">
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
