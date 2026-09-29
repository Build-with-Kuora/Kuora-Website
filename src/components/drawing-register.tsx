"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { pillars } from "@/lib/pillars";
import { PillarGlyph } from "./kura-mark";
import { TransitionLink } from "./page-transition";
import { SystemDiagram } from "./system-diagram";

/**
 * Projects listed like the register at the front of a drawing set. Pointing
 * at a row brings up that project's architecture in the viewer.
 */
export function DrawingRegister({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
      <ol className="border-t border-line-strong">
        {projects.map((item, index) => {
          const selected = index === active;
          const pillar = pillars.find((entry) => entry.id === item.focus)!;
          return (
            <li key={item.slug} className="border-b border-line-strong">
              <TransitionLink
                href={`/work/${item.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group relative grid grid-cols-[3.75rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 pr-2 pl-3 transition-colors sm:grid-cols-[4.5rem_1fr_8rem_3rem_1.5rem] ${
                  selected ? "bg-surface" : "hover:bg-surface"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-1 transition-colors ${selected ? "bg-neon-green" : "bg-transparent"}`}
                />
                <span className="label-mono">K-03.{index + 1}</span>
                <span className="display text-[clamp(1.5rem,2.6vw,2.125rem)]">{item.name}</span>
                <span className="label-mono hidden items-center gap-1.5 sm:flex">
                  <PillarGlyph pillar={item.focus} className="size-3 text-fg" />
                  {pillar.name}
                </span>
                <span className="label-mono text-right sm:text-left">{item.year}</span>
                <span
                  aria-hidden="true"
                  className="hidden text-lg transition-transform group-hover:translate-x-1 sm:block"
                >
                  →
                </span>
                <span className="col-start-2 col-end-4 text-[0.9375rem] text-muted sm:col-end-6">
                  {item.sector} · {item.summary}
                </span>
              </TransitionLink>
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:block">
        <figure className="sticky top-24 border border-panel-line bg-panel text-panel-fg">
          <figcaption className="flex items-center justify-between gap-4 border-b border-panel-line px-5 py-3">
            <span className="label-mono flex items-center gap-2 text-panel-muted">
              <span aria-hidden="true" className="status-dot size-1.5 bg-neon-green" />
              Viewer · Sheet K-03.{active + 1}
            </span>
            <span className="label-mono text-neon-green">{project.name}</span>
          </figcaption>
          <div key={project.slug} className="settle px-5 py-10">
            <SystemDiagram
              diagram={project.diagram}
              tone="panel"
              label={`Architecture of ${project.name}`}
              className="w-full"
            />
          </div>
          <dl className="grid grid-cols-3 border-t border-panel-line">
            {project.outcomes.map((outcome) => (
              <div key={outcome.label} className="border-panel-line p-4 not-last:border-r">
                <dd className="display text-2xl text-neon-green">{outcome.value}</dd>
                <dt className="mt-1 text-[0.75rem] leading-snug text-panel-muted">{outcome.label}</dt>
              </div>
            ))}
          </dl>
        </figure>
      </div>
    </div>
  );
}
