import { site } from "@/lib/site";

export function ContactBand({ heading = "Have a system that needs to carry more?" }: { heading?: string }) {
  return (
    <section className="border-t border-line bg-plate" aria-labelledby="contact-heading">
      <div className="container-sheet grid gap-8 py-20 lg:grid-cols-12 lg:items-end lg:py-24">
        <div className="lg:col-span-8">
          <h2
            id="contact-heading"
            className="stretch-wide text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-graphite">
            Tell us what you are building and where it strains. We will reply with how we would
            approach it.
          </p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <a
            href={`mailto:${site.email}`}
            className="inline-block bg-chalk px-6 py-4 text-base font-medium text-ink transition-colors hover:bg-signal"
          >
            Email {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
