import Link from "next/link";
import { ContactBand } from "@/components/contact-band";
import { Faq, type Question } from "@/components/faq";
import { KouraChevron, PillarGlyph } from "@/components/koura-mark";
import { ProcessBeam } from "@/components/process-beam";
import { ProjectPlanner } from "@/components/project-planner";
import { SectionHeading } from "@/components/section-heading";
import { pillars } from "@/lib/pillars";
import { reveal } from "@/lib/reveal";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";

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
      {/* The logo's chevron opens the page, cropped by the right edge. */}
      <section className="relative isolate overflow-hidden">
        <KouraChevron drawDelay={250} className="absolute top-6 -right-40 -z-10 h-[26rem] opacity-35 sm:-right-28 sm:h-[34rem] md:-right-20 md:opacity-100 lg:top-10 lg:-right-16 lg:h-[40rem] xl:right-0" />
        <div className="container-sheet pt-20 pb-20 sm:pt-28 lg:pt-36 lg:pb-32">
          <h1 {...reveal(200)} className="display max-w-4xl text-[clamp(3.25rem,8.5vw,7.5rem)] leading-[0.94] tracking-[-0.045em]">
            Software built to carry load.
          </h1>
          <p {...reveal(360)} className="mt-8 max-w-xl text-lg text-muted sm:text-xl">
            Koura designs, builds and runs full-cycle software for companies that expect to grow.
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

      <div {...reveal(650)} className="container-sheet pb-24 lg:pb-36">
        <ProjectPlanner />
      </div>

      <section id="services" aria-labelledby="services-title" className="container-sheet scroll-mt-24 pb-24 lg:pb-36">
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
      </section>

      <section aria-labelledby="pillars" className="container-sheet pb-24 lg:pb-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="pillars"
            className="lg:col-span-4"
            lead="Four things every system we ship has to get right. Each carries part of the load, and none of them is optional."
          >
            Four pillars under every system.
          </SectionHeading>
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {pillars.map((pillar) => (
              <li key={pillar.id} className="border-t border-line-strong pt-5">
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

      <section aria-labelledby="work" className="container-sheet pb-24 lg:pb-36">
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
            <li key={project.slug} className="border-b border-line-strong">
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
      </section>

      <section aria-labelledby="process" className="container-sheet pb-24 lg:pb-36">
        <SectionHeading
          id="process"
          lead="One team from the first conversation to production, and after it."
        >
          How a project runs.
        </SectionHeading>
        <ProcessBeam />
      </section>

      <section aria-labelledby="questions" className="container-sheet pb-24 lg:pb-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading id="questions" className="lg:col-span-4">
            Common questions.
          </SectionHeading>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq questions={questions} />
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
