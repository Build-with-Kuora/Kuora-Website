import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/contact-band";
import { PillarGlyph } from "@/components/kura-mark";
import { RegistrationMarks } from "@/components/registration-marks";
import { SectionHeading } from "@/components/section-heading";
import { DiagramLegend, SystemDiagram } from "@/components/system-diagram";
import { getPillar } from "@/lib/pillars";
import { getProject, projects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const pillar = getPillar(project.focus);
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const facts = [
    { term: "Sector", value: project.sector },
    { term: "Year", value: String(project.year) },
    { term: "Duration", value: project.duration },
    { term: "Team", value: project.team },
  ];

  return (
    <>
      <article>
        <header className="container-sheet pt-10 pb-14 sm:pt-14 lg:pb-20">
          <div className="flex items-center justify-between gap-4 border-b border-line-strong pb-3">
            <p className="label text-fg">Sheet K-03.{index + 1}</p>
            <Link href="/work" className="label transition-colors hover:text-fg">
              ← All work
            </Link>
          </div>
          <p className="label mt-12 sm:mt-16">
            Case study · {project.year} · {project.sector}
          </p>
          <h1 className="display mt-5 text-[clamp(3rem,8vw,6.5rem)]">{project.name}</h1>
          <p className="mt-6 max-w-3xl text-xl font-medium tracking-[-0.01em] sm:text-2xl">{project.summary}</p>

          <dl className="grid-hairline mt-12 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.term} className="p-5">
                <dt className="label">{fact.term}</dt>
                <dd className="mt-2 text-[0.9375rem]">{fact.value}</dd>
              </div>
            ))}
            <div className="p-5">
              <dt className="label">Focus</dt>
              <dd className="mt-2 flex items-center gap-2 text-[0.9375rem]">
                <PillarGlyph pillar={project.focus} className="size-3.5 text-fg" />
                <Link href={`/philosophy#${pillar.id}`} className="link-line">
                  {pillar.name}
                </Link>
              </dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="architecture" className="container-sheet pb-24 lg:pb-32">
          <figure className="relative border border-panel-line bg-panel">
            <RegistrationMarks />
            <figcaption className="flex items-center justify-between gap-4 border-b border-panel-line px-5 py-3 sm:px-7">
              <h2
                id="architecture"
                className="label flex items-center gap-2 text-panel-muted"
              >
                <span aria-hidden="true" className="status-dot size-1.5 bg-neon-green" />
                Fig. 01 · Architecture · <span className="text-neon-green">{project.diagram.nodes.length} components</span>
              </h2>
            </figcaption>
            <div className="overflow-x-auto p-5 sm:p-8 lg:p-12">
              <SystemDiagram
                diagram={project.diagram}
                tone="panel"
                label={`Architecture of ${project.name}: ${project.diagram.nodes.map((node) => node.label).join(", ")}`}
                className="mx-auto w-full max-w-5xl min-w-[36rem]"
              />
            </div>
            <div className="border-t border-panel-line px-5 py-4 sm:px-7">
              <DiagramLegend tone="panel" />
            </div>
          </figure>
        </section>

        <section aria-label="Problem and approach">
          <div className="container-sheet grid gap-14 pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-32">
            <div className="border-t-2 border-fg pt-3 lg:col-span-5">
              <p className="label text-fg">The problem</p>
              <p className="mt-6 text-2xl leading-snug font-medium tracking-[-0.015em]">{project.challenge}</p>
            </div>
            <div className="border-t-2 border-fg pt-3 lg:col-span-6 lg:col-start-7">
              <p className="label text-fg">What we built</p>
              <ol className="mt-6 border-t border-line-strong">
                {project.approach.map((step, stepIndex) => (
                  <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-line-strong py-4 text-[0.9375rem]">
                    <span className="label pt-1">
                      {String(stepIndex + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section aria-labelledby="results">
          <div className="container-sheet pb-24 lg:pb-32">
            <SectionHeading id="results">
              What changed.
            </SectionHeading>
            <dl className="mt-12 grid border border-fg sm:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div key={outcome.label} className="flex flex-col-reverse gap-2 border-fg bg-surface p-6 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0">
                  <dt className="text-[0.9375rem] text-muted">{outcome.label}</dt>
                  <dd className="display text-5xl">{outcome.value}</dd>
                </div>
              ))}
            </dl>
            <h3 className="label mt-12">Stack</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <li key={tool} className="label border border-fg px-3 py-2 text-fg">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>

      <nav aria-label="Next project" className="border-t border-fg">
        <Link
          href={`/work/${next.slug}`}
          className="group container-sheet flex flex-wrap items-end justify-between gap-4 py-16"
        >
          <span className="label text-fg">Next sheet · K-03.{((index + 1) % projects.length) + 1}</span>
          <span className="display text-[clamp(2.25rem,5vw,3.75rem)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8">
            {next.name} →
          </span>
        </Link>
      </nav>

      <ContactBand />
    </>
  );
}
