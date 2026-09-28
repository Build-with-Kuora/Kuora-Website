import { getPillar } from "@/lib/pillars";
import type { Project } from "@/lib/projects";
import { PillarGlyph } from "./kura-mark";
import { TransitionLink } from "./page-transition";
import { SystemDiagram } from "./system-diagram";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const pillar = getPillar(project.focus);

  return (
    <article className="group relative flex flex-col">
      <div className="border border-line bg-plate p-4 transition-colors group-hover:border-graphite sm:p-6">
        <SystemDiagram
          diagram={project.diagram}
          label={`Architecture of ${project.name}`}
          className="w-full"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <Heading className="stretch-wide text-xl font-semibold tracking-tight">
          <TransitionLink
            href={`/work/${project.slug}`}
            className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-signal after:absolute after:inset-0"
          >
            {project.name}
          </TransitionLink>
        </Heading>
        <span className="stretch-narrow shrink-0 pt-1 text-sm text-graphite">{project.year}</span>
      </div>
      <p className="mt-2 text-base text-graphite">{project.summary}</p>
      <dl className="stretch-narrow mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
        <div className="flex gap-1.5">
          <dt className="sr-only">Sector</dt>
          <dd>{project.sector}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Focus</dt>
          <dd className="flex items-center gap-1.5">
            <PillarGlyph pillar={project.focus} className="size-3.5" />
            {pillar.name}
          </dd>
        </div>
      </dl>
    </article>
  );
}
