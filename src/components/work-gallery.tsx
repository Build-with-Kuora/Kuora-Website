"use client";

import { useState } from "react";
import { pillars, type PillarId } from "@/lib/pillars";
import type { Project } from "@/lib/projects";
import { PillarGlyph } from "./kura-mark";
import { ProjectCard } from "./project-card";

export function WorkGallery({ projects }: { projects: Project[] }) {
  const [focus, setFocus] = useState<PillarId | "all">("all");
  const visible = focus === "all" ? projects : projects.filter((project) => project.focus === focus);

  const filters = [
    { id: "all" as const, label: "All projects", count: projects.length },
    ...pillars.map((pillar) => ({
      id: pillar.id,
      label: pillar.name,
      count: projects.filter((project) => project.focus === pillar.id).length,
    })),
  ];

  return (
    <>
      <div role="group" aria-label="Filter by pillar" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const pressed = focus === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => setFocus(filter.id)}
              className={`flex items-center gap-2 border px-3.5 py-2 text-[0.9375rem] transition-colors ${
                pressed
                  ? "border-chalk bg-chalk text-ink"
                  : "border-line text-graphite hover:border-graphite hover:text-chalk"
              }`}
            >
              {filter.id !== "all" && (
                <PillarGlyph
                  pillar={filter.id}
                  className={`size-3.5 ${pressed ? "[&_.fill-chalk]:fill-ink [&_.stroke-graphite]:stroke-ink" : ""}`}
                />
              )}
              {filter.label}
              <span className={`stretch-narrow text-sm ${pressed ? "text-ink/70" : "text-graphite"}`}>
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {projects.length} projects
      </p>

      <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} headingLevel="h2" />
        ))}
      </div>
    </>
  );
}
