"use client";

import Link from "next/link";
import { useState } from "react";
import { joinList as list } from "@/lib/format";
import { addedAt, blueprints, systemAt, tiers, type Tier } from "@/lib/planner";
import { projects } from "@/lib/projects";
import { SystemDiagram } from "./system-diagram";

/**
 * Pick what you are building and how many people it serves, and see the
 * system we would start from. The plan carries over to the inquiry form.
 */
export function ProjectPlanner() {
  const [blueprintId, setBlueprintId] = useState(blueprints[0].id);
  const [tier, setTier] = useState<Tier>(0);

  const blueprint = blueprints.find((item) => item.id === blueprintId)!;
  const system = systemAt(blueprint, tier);
  const added = addedAt(blueprint, tier);
  const project = projects.find((item) => item.slug === blueprint.project)!;
  const components = system.nodes.map((node) => node.label);

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line-strong bg-surface lg:grid-cols-12">
      <form
        aria-labelledby="planner-title"
        onSubmit={(event) => event.preventDefault()}
        className="border-b border-line p-6 sm:p-8 lg:col-span-4 lg:border-r lg:border-b-0"
      >
        <h2 id="planner-title" className="text-xl font-semibold tracking-[-0.015em]">
          Plan your project
        </h2>
        <p className="mt-1.5 text-[0.9375rem] text-muted">
          Tell us what you are building and we will draw the system we would start from.
        </p>

        <fieldset className="mt-7">
          <legend className="text-sm font-medium">What are you building?</legend>
          <div className="mt-3 grid gap-1">
            {blueprints.map((item) => (
              <label
                key={item.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[0.9375rem] transition-colors hover:bg-canvas has-checked:bg-fg has-checked:text-canvas has-focus-visible:outline-2 has-focus-visible:outline-neon-blue"
              >
                <input
                  type="radio"
                  name="blueprint"
                  value={item.id}
                  checked={item.id === blueprintId}
                  onChange={() => setBlueprintId(item.id)}
                  className="sr-only"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="text-sm font-medium">How many people will use it?</legend>
          <div className="mt-3 grid grid-cols-3 gap-1 rounded-lg border border-line p-1">
            {tiers.map((item, index) => (
              <label
                key={item.label}
                className="flex cursor-pointer items-center justify-center rounded-md px-2 py-2 text-center text-sm leading-tight transition-colors hover:bg-canvas has-checked:bg-fg has-checked:text-canvas has-focus-visible:outline-2 has-focus-visible:outline-neon-blue"
              >
                <input
                  type="radio"
                  name="tier"
                  value={index}
                  checked={index === tier}
                  onChange={() => setTier(index as Tier)}
                  className="sr-only"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>

        <Link
          href={`/start?service=build&plan=${blueprint.id}&size=${tier}`}
          className="btn-primary mt-8 w-full justify-center"
        >
          Continue with this plan
        </Link>
      </form>

      <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:col-span-8" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="font-medium">The system we would start from</h3>
          <p className="text-sm text-muted">
            {added.length > 0
              ? `Added at this size: ${list(added)}.`
              : "The smallest system that holds. The rest waits for the load."}
          </p>
        </div>

        <div className="-mx-6 mt-6 flex-1 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <SystemDiagram
            key={`${blueprint.id}-${tier}`}
            diagram={system}
            label={`Starting system for ${blueprint.label.toLowerCase()}: ${list(components)}`}
            className="settle w-full min-w-[34rem]"
          />
        </div>

        <dl className="mt-6 grid gap-6 border-t border-line pt-6 text-[0.9375rem] sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Stack</dt>
            <dd className="mt-1">{list(project.stack)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Closest work</dt>
            <dd className="mt-1">
              {project.name} ({project.sector}). {project.duration} with{" "}
              {project.team}.{" "}
              <Link href={`/work/${project.slug}`} className="underline underline-offset-4 decoration-line-strong hover:decoration-fg">
                Read the case study
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
