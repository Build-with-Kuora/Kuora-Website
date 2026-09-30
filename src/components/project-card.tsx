import Link from "next/link";
import { getPillar } from "@/lib/pillars";
import type { Project } from "@/lib/projects";
import { PillarGlyph } from "./kuora-mark";
import { SystemDiagram } from "./system-diagram";

export function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const pillar = getPillar(project.focus);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-brand-sky/60">
      <div className="bg-panel px-4 py-8 sm:px-6">
        <SystemDiagram
          diagram={project.diagram}
          tone="panel"
          label={`Architecture of ${project.name}`}
          className="w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex items-center gap-2 text-sm text-muted">
          <PillarGlyph pillar={project.focus} className="size-3 text-brand-mint" />
          {pillar.name}
        </p>
        <Heading className="display mt-3 text-[1.875rem]">
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl"
          >
            {project.name}
          </Link>
        </Heading>
        <p className="mt-3 text-[0.9375rem] text-muted">{project.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <span className="label">
            {project.sector}, {project.year}
          </span>
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full border border-line-strong transition-colors group-hover:border-brand-sky group-hover:bg-brand-sky group-hover:text-on-brand"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
