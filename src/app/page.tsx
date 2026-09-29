import Link from "next/link";
import { ContactBand } from "@/components/contact-band";
import { Faq, type Question } from "@/components/faq";
import { PillarGlyph } from "@/components/kura-mark";
import { ProcessBeam } from "@/components/process-beam";
import { ProjectPlanner } from "@/components/project-planner";
import { SectionHeading } from "@/components/section-heading";
import { pillars } from "@/lib/pillars";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

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
    a: "Email us with what you are building and where it strains. We reply with questions, then a short written proposal for the first phase.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="container-sheet pt-16 pb-24 sm:pt-24 lg:pt-28 lg:pb-36">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="display text-[clamp(3rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.04em] lg:col-span-8">
            Software built to carry load.
          </h1>
          <div className="lg:col-span-4">
            <p className="max-w-xl text-lg text-muted">
              Kura designs, builds and runs full-cycle software for companies that expect to grow.
              We start from the data model and work up, so what we ship still holds when traffic,
              data and your team multiply.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn-primary">
                Start a project
              </a>
              <Link href="/work" className="btn-secondary">
                See the work
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-16">
          <ProjectPlanner />
        </div>
      </section>

      <section aria-labelledby="pillars" className="container-sheet pb-24 lg:pb-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="pillars"
            className="lg:col-span-4"
            lead="Kura comes from quadro, a square frame. Four members, each carrying part of the load, and none of them optional."
          >
            Four pillars, one frame.
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
