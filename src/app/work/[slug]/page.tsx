import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/contact-band";
import { PillarGlyph } from "@/components/kuora-mark";
import { SectionHeading } from "@/components/section-heading";
import { DiagramLegend, SystemDiagram } from "@/components/system-diagram";
import { getPillar } from "@/lib/pillars";
import { getProject, projects } from "@/lib/projects";
import { reveal } from "@/lib/reveal";

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
          <Link href="/work" className="text-sm text-muted transition-colors hover:text-fg">
            <span aria-hidden="true">←</span> All work
          </Link>
          <p className="mt-12 text-sm text-brand-mint sm:mt-16">
            {project.sector}, {project.year}
          </p>
          <h1 {...reveal(200)} className="display mt-5 text-[clamp(3rem,8vw,6.5rem)]">{project.name}</h1>
          <p {...reveal(360)} className="mt-6 max-w-3xl text-xl font-medium tracking-[-0.01em] sm:text-2xl">{project.summary}</p>

          <dl className="grid-hairline mt-12 grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.term} className="p-5">
                <dt className="label">{fact.term}</dt>
                <dd className="mt-2 text-[0.9375rem]">{fact.value}</dd>
              </div>
            ))}
            {/* Five facts: the last one spans the gap its row would otherwise leave. */}
            <div className="col-span-2 p-5 lg:col-span-1">
              <dt className="label">Focus</dt>
              <dd className="mt-2 flex items-center gap-2 text-[0.9375rem]">
                <PillarGlyph pillar={project.focus} className="size-3.5 text-brand-mint" />
                <Link href={`/philosophy#${pillar.id}`} className="link-line">
                  {pillar.name}
                </Link>
              </dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="architecture" className="container-sheet pb-24 lg:pb-32">
          <figure data-scroll-reveal="pop" className="overflow-hidden rounded-2xl border border-panel-line bg-panel">
            <figcaption className="flex items-center justify-between gap-4 border-b border-panel-line px-5 py-3 sm:px-7">
              <h2
                id="architecture"
                className="label flex items-center gap-2 text-panel-muted"
              >
                <span aria-hidden="true" className="status-dot size-1.5 rounded-full bg-brand-mint" />
                Architecture, <span className="text-brand-mint">{project.diagram.nodes.length} components</span>
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
            <div data-scroll-reveal="up" className="border-t border-line-strong pt-4 lg:col-span-5">
              <h2 className="text-sm text-brand-mint">The problem</h2>
              <p className="mt-6 text-2xl leading-snug font-medium tracking-[-0.015em]">{project.challenge}</p>
            </div>
            <div data-scroll-reveal="up" className="border-t border-line-strong pt-4 lg:col-span-6 lg:col-start-7">
              <h2 className="text-sm text-brand-mint">What we built</h2>
              <ol className="mt-6 border-t border-line">
                {project.approach.map((step, stepIndex) => (
                  <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-line py-4 text-[0.9375rem]">
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
            <dl data-scroll-reveal="pop" className="mt-12 grid overflow-hidden rounded-2xl border border-line sm:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div key={outcome.label} className="flex flex-col-reverse gap-2 border-line bg-surface p-6 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0">
                  <dt className="text-[0.9375rem] text-muted">{outcome.label}</dt>
                  <dd className="display text-5xl">{outcome.value}</dd>
                </div>
              ))}
            </dl>
            <h3 className="label mt-12">Stack</h3>
            <ul data-scroll-reveal="up" className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <li key={tool} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>

      <nav aria-label="Next project" className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          className="group container-sheet flex flex-wrap items-end justify-between gap-4 py-16"
        >
          <span className="text-sm text-muted">Next project</span>
          <span className="display text-[clamp(2.25rem,5vw,3.75rem)] transition-colors group-hover:text-accent">
            {next.name} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </nav>

      <ContactBand />
    </>
  );
}
