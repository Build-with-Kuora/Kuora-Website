"use client";

import { useState } from "react";
import { pillars, type PillarId } from "@/lib/pillars";
import type { Project } from "@/lib/projects";
import { PillarGlyph } from "./koura-mark";
import { ProjectCard } from "./project-card";

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [focus, setFocus] = useState<PillarId | "all">("all");
  const visible = focus === "all" ? projects : projects.filter((project) => project.focus === focus);

  const filters = [
    { id: "all" as const, label: "All sheets", count: projects.length },
    ...pillars.map((pillar) => ({
      id: pillar.id,
      label: pillar.name,
      count: projects.filter((project) => project.focus === pillar.id).length,
    })),
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-fg py-3">
        <div role="group" aria-label="Filter by pillar" className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const pressed = focus === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFocus(filter.id)}
                className={`flex h-10 items-center gap-2 border px-3.5 text-sm font-medium transition-colors ${
                  pressed
                    ? "border-fg bg-brand-mint text-on-brand"
                    : "border-line-strong text-fg hover:border-fg"
                }`}
              >
                {filter.id !== "all" && <PillarGlyph pillar={filter.id} className="size-3" />}
                {filter.label}
                <span className="label text-current opacity-70">{filter.count}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="label">
          Showing {visible.length} of {projects.length}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            sheet={`K-03.${projects.indexOf(project) + 1}`}
            headingLevel="h2"
          />
        ))}
      </div>
    </>
  );
}
