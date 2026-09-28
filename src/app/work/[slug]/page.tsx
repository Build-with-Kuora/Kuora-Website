import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/contact-band";
import { PillarGlyph } from "@/components/kura-mark";
import { TransitionLink } from "@/components/page-transition";
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
        <header className="container-sheet pt-10 pb-12 sm:pt-14 lg:pb-16">
          <TransitionLink
            href="/work"
            className="text-base text-graphite underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
          >
            All work
          </TransitionLink>
          <h1 className="stretch-wide mt-10 text-[clamp(2.5rem,6vw,5rem)] leading-none font-semibold tracking-[-0.02em]">
            {project.name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-snug sm:text-2xl">{project.summary}</p>

          <dl className="mt-10 grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.term} className="border-r border-b border-line p-4">
                <dt className="stretch-narrow text-sm text-graphite">{fact.term}</dt>
                <dd className="mt-1 text-base">{fact.value}</dd>
              </div>
            ))}
            <div className="border-r border-b border-line p-4">
              <dt className="stretch-narrow text-sm text-graphite">Focus</dt>
              <dd className="mt-1 flex items-center gap-2 text-base">
                <PillarGlyph pillar={project.focus} className="size-3.5" />
                <TransitionLink
                  href={`/philosophy#${pillar.id}`}
                  className="underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                >
                  {pillar.name}
                </TransitionLink>
              </dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="architecture" className="container-sheet pb-20 lg:pb-28">
          <h2 id="architecture" className="sr-only">
            Architecture
          </h2>
          <figure className="border border-line bg-plate">
            <div className="overflow-x-auto p-4 sm:p-8 lg:p-12">
              <SystemDiagram
                diagram={project.diagram}
                label={`Architecture of ${project.name}: ${project.diagram.nodes.map((node) => node.label).join(", ")}`}
                className="mx-auto w-full min-w-[36rem] max-w-5xl"
              />
            </div>
            <figcaption className="border-t border-line px-4 py-4 sm:px-8">
              <DiagramLegend />
            </figcaption>
          </figure>
        </section>

        <section className="border-t border-line">
          <div className="container-sheet grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
            <div className="lg:col-span-5">
              <h2 className="stretch-wide text-2xl font-semibold tracking-tight">The problem</h2>
              <p className="mt-5 text-lg text-graphite">{project.challenge}</p>
            </div>
            <div className="lg:col-span-7">
              <h2 className="stretch-wide text-2xl font-semibold tracking-tight">What we built</h2>
              <ul className="mt-5 space-y-4 text-lg">
                {project.approach.map((step) => (
                  <li key={step} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 bg-signal" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section aria-labelledby="results" className="border-t border-line">
          <div className="container-sheet py-20 lg:py-28">
            <h2 id="results" className="stretch-wide text-2xl font-semibold tracking-tight">
              Results
            </h2>
            <dl className="mt-10 grid border-t-2 border-chalk sm:grid-cols-3">
              {project.outcomes.map((outcome) => (
                <div
                  key={outcome.label}
                  className="flex flex-col-reverse border-b border-line py-6 sm:border-r sm:border-b-0 sm:px-6 sm:first:pl-0 sm:last:border-r-0"
                >
                  <dt className="mt-2 text-base text-graphite">{outcome.label}</dt>
                  <dd className="stretch-wide text-5xl font-semibold tracking-tight">
                    {outcome.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-14">
              <h3 className="stretch-narrow text-sm text-graphite">Stack</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tool) => (
                  <li key={tool} className="border border-line px-3 py-1.5 text-base">
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </article>

      <nav aria-label="Next project" className="border-t border-line">
        <TransitionLink
          href={`/work/${next.slug}`}
          className="group container-sheet flex flex-wrap items-baseline justify-between gap-4 py-14"
        >
          <span className="text-base text-graphite">Next project</span>
          <span className="stretch-wide text-3xl font-semibold tracking-tight underline decoration-transparent underline-offset-8 transition-colors group-hover:text-signal group-hover:decoration-signal sm:text-4xl">
            {next.name}
          </span>
        </TransitionLink>
      </nav>

      <ContactBand />
    </>
  );
}
