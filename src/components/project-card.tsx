import Link from "next/link";
import { getPillar } from "@/lib/pillars";
import type { Project } from "@/lib/projects";
import { PillarGlyph } from "./koura-mark";
import { SystemDiagram } from "./system-diagram";

export function ProjectCard({
  project,
  sheet,
  headingLevel = "h3",
}: {
  project: Project;
  sheet: string;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const pillar = getPillar(project.focus);

  return (
    <article className="group relative flex flex-col border border-fg bg-surface">
      <div className="flex items-center justify-between gap-4 border-b border-fg px-4 py-2.5">
        <span className="label text-fg">Sheet {sheet}</span>
        <span className="label flex items-center gap-1.5">
          <PillarGlyph pillar={project.focus} className="size-3 text-fg" />
          {pillar.name}
        </span>
      </div>
      <div className="bg-panel px-4 py-7 transition-colors sm:px-6">
        <SystemDiagram
          diagram={project.diagram}
          tone="panel"
          label={`Architecture of ${project.name}`}
          className="w-full"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-fg p-5 sm:p-6">
        <Heading className="display text-[1.875rem]">
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-6"
          >
            {project.name}
          </Link>
        </Heading>
        <p className="mt-3 text-[0.9375rem] text-muted">{project.summary}</p>
        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-4 border-t border-line-strong pt-4">
            <span className="label">
              {project.sector} · {project.year}
            </span>
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center border border-fg transition-colors group-hover:bg-brand-mint group-hover:text-on-brand"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
