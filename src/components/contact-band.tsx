import { site } from "@/lib/site";

/** The closing call to action: a full-width band in the signal colour. */
export function ContactBand({ heading = "Have a system that needs to carry more?" }: { heading?: string }) {
  return (
    <section className="border-y border-fg bg-neon-green text-on-neon" aria-labelledby="contact-heading">
      <div className="container-sheet grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-8">
          <p className="label-mono text-on-neon">Start a project</p>
          <h2 id="contact-heading" className="display mt-6 text-[clamp(2.5rem,6vw,5rem)]">
            {heading}
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="text-lg">
            Tell us what you are building and where it strains. We will reply with how we would
            approach it.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 flex h-14 items-center justify-between gap-6 bg-on-neon px-6 font-semibold text-neon-green transition-colors hover:bg-on-neon/85"
          >
            Email {site.email}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
