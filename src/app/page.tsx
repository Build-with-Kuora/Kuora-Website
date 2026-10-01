import Link from "next/link";
import { ContactBand } from "@/components/contact-band";
import { Faq, type Question } from "@/components/faq";
import { KuoraMonogram, PillarGlyph } from "@/components/kuora-mark";
import { ProcessBeam } from "@/components/process-beam";
import { SectionHeading } from "@/components/section-heading";
import { pillars } from "@/lib/pillars";
import { reveal } from "@/lib/reveal";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";

// The layers of a system we build, top to bottom. The Systems page covers each in depth.
const layers = [
  {
    name: "Interfaces",
    tech: "Next.js and React",
    body: "Web apps and dashboards that stay fast on slow networks.",
  },
  {
    name: "Services and APIs",
    tech: "Node.js",
    body: "Typed APIs, jobs and integrations that scale by adding instances.",
  },
  {
    name: "Data models",
    tech: "Prisma",
    body: "One schema for the whole domain, with migrations reviewed like code.",
  },
  {
    name: "Foundations",
    tech: "PostgreSQL",
    body: "Databases tuned to real queries and partitioned as the data grows.",
  },
];

const questions: Question[] = [
  {
    q: "What does full-cycle development mean?",
    a: "One team takes a system from the first conversation to production and keeps running it afterwards. The engineers who design the schema also build the interface and carry the on-call rotation, so nothing is lost in hand-offs.",
  },
  {
    q: "What stack do you build with?",
    a: "Our default is TypeScript end to end: Next.js and React for interfaces, Node.js for services, Prisma for data access and PostgreSQL as the foundation. We add queues, caches and infrastructure per project, based on the load the system has to carry.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on what the system has to carry. Once we understand the project, we send a written proposal for the first phase with its scope, team and cost, so you know the price before any work starts.",
  },
  {
    q: "Can you work on an existing codebase?",
    a: "Yes. Many projects start with a system that already exists and is starting to strain. We begin by measuring it with realistic data, then fix the parts that carry the most load first.",
  },
  {
    q: "How big is a typical team?",
    a: "Small and senior, sized to the system rather than to a staffing plan. The people you meet at the start are the people who build it.",
  },
  {
    q: "What happens after launch?",
    a: "We can keep running the system for you, with monitoring, on-call and performance work, or hand it over to your team with documentation and the decision records that explain why it is built the way it is.",
  },
  {
    q: "How do we start?",
    a: "Send us an inquiry with what you are building and where it strains. We reply with questions, then a short written proposal for the first phase.",
  },
];

export default function HomePage() {
  return (
    <>
      {/*
        The hero fills the first screen below main's 5rem clearance for the
        floating nav, so What we do starts on the next one. The logo's K sits in
        the same centred column as the text, its right edge on the column's
        edge, so text and mark read as one composition at every width.
      */}
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* Two parallax depths: the K lags furthest behind, the text a little less. */}
          <div data-parallax="0.4" data-parallax-max="400" className="container-sheet relative h-full">
            <KuoraMonogram
              drawDelay={250}
              className="absolute top-1/2 -right-40 h-[20rem] -translate-y-1/2 opacity-15 sm:-right-28 sm:h-[24rem] lg:right-10 lg:h-[19rem] lg:opacity-100 xl:h-[24rem] 2xl:h-[27rem]"
            />
          </div>
        </div>
        <div data-parallax="0.2" data-parallax-max="400" className="container-sheet py-16 sm:py-20">
          <h1 {...reveal(200)} className="display max-w-4xl text-[clamp(3.25rem,8.5vw,7.5rem)] leading-[0.94] tracking-[-0.045em]">
            Software built to carry load.
          </h1>
          <p {...reveal(360)} className="mt-8 max-w-xl text-lg text-muted sm:text-xl">
            Kuora designs, builds and runs full-cycle software for companies that expect to grow.
            We start from the data model and work up, so what we ship still holds when traffic,
            data and your team multiply.
          </p>
          <div {...reveal(500)} className="mt-10 flex flex-wrap gap-3">
            <Link href="/start" className="btn-primary">
              Start a project
            </Link>
            <Link href="/work" className="btn-secondary">
              See the work
            </Link>
          </div>
        </div>
      </section>

      {/*
        From here each section is a band in its own tone (see globals.css),
        alternating so neighbours never match, and snaps flush to the top
        (data-snap="flush") with its own padding clearing the floating nav.

        What we do also fills one screen, so nothing above or below shows. Its
        opaque band lets the hero's parallax layers slide under it. The heading
        drifts a little against the list, the section's one parallax depth.
      */}
      <section
        aria-labelledby="what-we-do"
        data-snap="flush"
        className="tone-deep relative flex min-h-svh flex-col justify-center pt-24 pb-12 sm:pt-28 sm:pb-16"
      >
        <div className="container-sheet grid gap-x-10 gap-y-10 lg:grid-cols-12 lg:items-center">
          <div data-parallax="0.12" data-parallax-max="48" className="lg:col-span-5">
            <h2 id="what-we-do" data-scroll-reveal="up" className="display text-[clamp(2.5rem,5vw,4.25rem)]">
              What we do.
            </h2>
            <p data-scroll-reveal="up" className="mt-5 max-w-md text-muted sm:text-lg">
              We design, build and run whole systems, from the database to the screen. One team owns
              every layer, so nothing is lost between them.
            </p>
            <div data-scroll-reveal="up" className="mt-6 sm:mt-8">
              <Link href="/systems" className="btn-secondary">
                See the systems
              </Link>
            </div>
          </div>
          <ul className="border-b border-line lg:col-span-6 lg:col-start-7">
            {layers.map((layer) => (
              <li
                key={layer.name}
                data-scroll-reveal="up"
                className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-t border-line py-4 sm:py-6"
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.015em] sm:text-2xl">{layer.name}</h3>
                  <p className="mt-1.5 hidden max-w-sm text-[0.9375rem] text-muted sm:block">{layer.body}</p>
                </div>
                <p className="label">{layer.tech}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" aria-labelledby="services-title" data-snap="flush" className="py-24 lg:py-32">
        <div className="container-sheet">
          <SectionHeading
            id="services-title"
            lead="Pick the one closest to where you are. Each starts with a written proposal for the first phase, so scope and cost are agreed before any work."
          >
            Ways to work with us.
          </SectionHeading>
          <ul className="mt-12 grid overflow-hidden rounded-2xl border border-line-strong bg-surface lg:grid-cols-3">
            {services.map((service) => (
              <li
                key={service.id}
                data-scroll-reveal="up"
                className="flex flex-col border-line p-6 not-last:border-b sm:p-8 lg:not-last:border-r lg:not-last:border-b-0"
              >
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">{service.name}</h3>
                <p className="mt-3 text-muted">{service.audience}</p>
                <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="mt-1 size-4 shrink-0 text-muted"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                      >
                        <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <p className="flex justify-between gap-4 border-t border-line pt-4 text-sm">
                    <span className="text-muted">Typical length</span>
                    <span className="font-medium">{service.length}</span>
                  </p>
                  <Link href={`/start?service=${service.id}`} className="btn-secondary mt-5 w-full justify-center">
                    Get a quote
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pillars" data-snap="flush" className="tone-raised py-24 lg:py-32">
        <div className="container-sheet grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="pillars"
            className="lg:col-span-4"
            lead="Four things every system we ship has to get right. Each carries part of the load, and none of them is optional."
          >
            Four pillars under every system.
          </SectionHeading>
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {pillars.map((pillar) => (
              <li key={pillar.id} data-scroll-reveal="up" className="border-t border-line-strong pt-5">
                <PillarGlyph pillar={pillar.id} className="size-4 text-muted" />
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.015em]">
                  <Link
                    href={`/philosophy#${pillar.id}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {pillar.name}
                  </Link>
                </h3>
                <p className="mt-1.5 text-muted">{pillar.principle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="work" data-snap="flush" className="tone-deep py-24 lg:py-32">
        <div className="container-sheet">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="work" lead="Systems we have designed, built and still run.">
              Selected work.
            </SectionHeading>
            <Link href="/work" className="btn-secondary">
              All projects
            </Link>
          </div>
          <ul className="mt-12 border-t border-line-strong">
            {projects.slice(0, 4).map((project) => (
              <li key={project.slug} data-scroll-reveal="up" className="border-b border-line-strong">
                <Link
                  href={`/work/${project.slug}`}
                  className="group grid items-baseline gap-x-8 gap-y-1 py-6 sm:grid-cols-[minmax(0,14rem)_1fr_auto]"
                >
                  <span className="text-2xl font-semibold tracking-[-0.02em] underline-offset-4 group-hover:underline">
                    {project.name}
                  </span>
                  <span className="max-w-xl text-muted">{project.summary}</span>
                  <span className="label">
                    {project.sector}, {project.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="process" data-snap="flush" className="py-24 lg:py-32">
        <div className="container-sheet">
          <SectionHeading
            id="process"
            lead="One team from the first conversation to production, and after it."
          >
            How a project runs.
          </SectionHeading>
          <ProcessBeam />
        </div>
      </section>

      <section aria-labelledby="questions" data-snap="flush" className="tone-raised py-24 lg:py-32">
        <div className="container-sheet grid gap-12 lg:grid-cols-12">
          <SectionHeading id="questions" className="lg:col-span-4">
            Common questions.
          </SectionHeading>
          <div data-scroll-reveal="up" className="lg:col-span-7 lg:col-start-6">
            <Faq questions={questions} />
          </div>
        </div>
      </section>

      <ContactBand tone="tone-tint" />
    </>
  );
}
