import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { ContactBand } from "@/components/contact-band";
import { PillarGlyph } from "@/components/kura-mark";
import { getPillar, type PillarId } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Kura's full-stack capabilities: Node.js services, Prisma data access and PostgreSQL, from interface to foundation.",
};

type Floor = {
  level: string;
  layer: string;
  tech: string;
  body: string;
  capabilities: string[];
  pillar: PillarId;
  belowGrade?: boolean;
};

// Top to bottom, in the order a request travels through the system.
const floors: Floor[] = [
  {
    level: "L3",
    layer: "Interface",
    tech: "Next.js and React",
    body: "Server-rendered React that receives typed data from the layer below. Pages load quickly on slow networks and work with a keyboard and a screen reader.",
    capabilities: [
      "Server components and streaming",
      "Design systems in code",
      "Accessibility to WCAG 2.2 AA",
      "Core Web Vitals budgets",
    ],
    pillar: "interface",
  },
  {
    level: "L2",
    layer: "Services",
    tech: "Node.js",
    body: "TypeScript services for HTTP and event-driven APIs, background jobs and integrations. They hold no state between requests, so capacity grows by adding instances.",
    capabilities: [
      "REST and GraphQL APIs",
      "Queues, workers and schedulers",
      "Webhooks and third-party integrations",
      "Authentication, rate limits and idempotency",
    ],
    pillar: "scale",
  },
  {
    level: "L1",
    layer: "Data access",
    tech: "Prisma",
    body: "The Prisma schema is the single source of truth for the domain model. Queries are type-safe, migrations are reviewed like code, and we drop to raw SQL when the query planner needs help.",
    capabilities: [
      "Schema-first domain modelling",
      "Reviewed, reversible migrations",
      "Type-safe queries end to end",
      "Typed SQL for hot paths",
    ],
    pillar: "architecture",
  },
  {
    level: "B1",
    layer: "Foundation",
    tech: "PostgreSQL",
    body: "PostgreSQL holds the system's integrity: constraints, transactions and indexes tuned to real access patterns. When the data grows, we partition it and add read replicas.",
    capabilities: [
      "Constraints and transactional integrity",
      "Index and query-plan tuning",
      "Partitioning and read replicas",
      "Backups and point-in-time recovery",
    ],
    pillar: "performance",
    belowGrade: true,
  },
];

const lifecycle = [
  {
    stage: "Discover",
    body: "We map the domain, the expected load and the constraints with your team.",
    output: "a written brief and a list of risks",
  },
  {
    stage: "Design",
    body: "Data model, service boundaries and failure modes, reviewed before we build.",
    output: "architecture decision records",
  },
  {
    stage: "Build",
    body: "Weekly releases to a production-like environment, with budgets checked in CI.",
    output: "working software every week",
  },
  {
    stage: "Launch",
    body: "Load-tested and observable, with a rollback plan we have already rehearsed.",
    output: "a rehearsed release plan",
  },
  {
    stage: "Operate",
    body: "We run what we build: on-call, tuning and planning for the next order of magnitude.",
    output: "service levels and a scaling roadmap",
  },
];

const surrounding = [
  { group: "Infrastructure", items: ["AWS", "Vercel", "Docker", "Terraform"] },
  { group: "Messaging and jobs", items: ["Kafka", "Redis", "BullMQ", "Amazon SQS"] },
  { group: "Observability", items: ["OpenTelemetry", "Grafana", "Sentry"] },
  { group: "Quality", items: ["Vitest", "Playwright", "k6 load testing"] },
];

const schemaExample = `
enum Status {
  ACTIVE
  ARCHIVED
}

model Project {
  id        String    @id @default(cuid())
  name      String
  status    Status    @default(ACTIVE)
  createdAt DateTime  @default(now())
  releases  Release[]

  // Shaped for the list query: filter by status, newest first.
  @@index([status, createdAt(sort: Desc)])
}
`;

const serviceExample = `
import { prisma } from "@/lib/db";

export async function listActiveProjects(cursor?: string) {
  return prisma.project.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, createdAt: true },
    take: 50,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  });
}

// Inferred from the schema. No hand-written DTOs to drift.
export type ActiveProject = Awaited<
  ReturnType<typeof listActiveProjects>
>[number];
`;

export default function SystemsPage() {
  return (
    <>
      <section className="container-sheet pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-20">
        <h1 className="stretch-wide max-w-4xl text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.02em]">
          The full stack, from the foundation up.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-graphite sm:text-xl">
          We work across every layer and every stage of a system&apos;s life. Our core is
          TypeScript on Node.js, Prisma and PostgreSQL: proven, well understood, and fast enough for
          almost anything you will ask of it.
        </p>
      </section>

      <section aria-labelledby="section-drawing" className="container-sheet pb-20 lg:pb-28">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 id="section-drawing" className="stretch-wide text-2xl font-semibold tracking-tight">
            How a system stands
          </h2>
          <p className="text-base text-graphite">
            Drawn as a building section. A request enters at the top and travels down to the
            foundation.
          </p>
        </div>

        <ol className="mt-8 border-t-2 border-chalk">
          {floors.map((floor) => {
            const pillar = getPillar(floor.pillar);
            return (
              <li
                key={floor.level}
                className={`grid gap-6 border-b border-line py-8 lg:grid-cols-[7rem_1fr_1fr] lg:gap-10 lg:py-10 ${floor.belowGrade ? "border-t-2 border-t-chalk" : ""}`}
              >
                <div className="flex items-baseline gap-4 lg:block">
                  <p className="stretch-narrow text-5xl leading-none font-medium text-graphite">
                    <span className="sr-only">Level </span>
                    {floor.level}
                  </p>
                  {floor.belowGrade && (
                    <p className="stretch-narrow text-sm text-graphite lg:mt-3">Below grade</p>
                  )}
                </div>
                <div>
                  <h3 className="stretch-wide text-2xl font-semibold tracking-tight">
                    {floor.tech}
                  </h3>
                  <p className="stretch-narrow mt-1 text-sm text-graphite">{floor.layer}</p>
                  <p className="mt-4 max-w-prose text-base text-graphite">{floor.body}</p>
                  <p className="mt-5 flex items-center gap-2 text-sm">
                    <PillarGlyph pillar={floor.pillar} className="size-3.5" />
                    Carries {pillar.name.toLowerCase()}
                  </p>
                </div>
                <ul
                  className="space-y-2.5 self-start text-base lg:pt-1"
                >
                  {floor.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 bg-signal" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
        {/* Ground beneath the foundation, hatched as on a section drawing. */}
        <div
          aria-hidden="true"
          className="h-8 bg-[repeating-linear-gradient(135deg,var(--color-line)_0_1px,transparent_1px_12px)]"
        />
      </section>

      <section aria-labelledby="typed" className="border-t border-line">
        <div className="container-sheet grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <div className="lg:col-span-4">
            <h2 id="typed" className="stretch-wide text-3xl leading-tight font-semibold tracking-tight">
              One schema, typed all the way to the screen.
            </h2>
            <ul className="mt-8 space-y-5 text-base text-graphite">
              <li>
                <span className="text-chalk">The index is designed with the query.</span> It is not
                added after the first incident.
              </li>
              <li>
                <span className="text-chalk">Cursor pagination</span> keeps the ten-thousandth page
                as fast as the first.
              </li>
              <li>
                <span className="text-chalk">Types flow upward.</span> Rename a column and the build
                fails, not the page your customer is looking at.
              </li>
            </ul>
          </div>
          <div className="grid min-w-0 gap-4 lg:col-span-8">
            <CodeBlock code={schemaExample} lang="prisma" filename="prisma/schema.prisma" />
            <CodeBlock code={serviceExample} lang="typescript" filename="src/services/projects.ts" />
          </div>
        </div>
      </section>

      <section aria-labelledby="lifecycle" className="border-t border-line">
        <div className="container-sheet py-20 lg:py-28">
          <h2 id="lifecycle" className="stretch-wide max-w-2xl text-3xl leading-tight font-semibold tracking-tight">
            Full cycle, from the first question to the on-call rotation.
          </h2>
          <ol className="mt-12 grid border-t-2 border-chalk md:grid-cols-2 lg:grid-cols-5">
            {lifecycle.map((step, index) => (
              <li
                key={step.stage}
                className="border-b border-line py-6 md:px-5 md:odd:border-r lg:border-r lg:border-b-0 lg:px-5 lg:first:pl-0 lg:last:border-r-0"
              >
                <p className="stretch-narrow text-sm text-graphite">Stage {index + 1}</p>
                <h3 className="stretch-wide mt-2 text-xl font-semibold">{step.stage}</h3>
                <p className="mt-3 text-base text-graphite">{step.body}</p>
                <p className="mt-4 border-t border-line pt-3 text-sm">
                  <span className="text-graphite">You get </span>
                  {step.output}.
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="surrounding" className="border-t border-line">
        <div className="container-sheet grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <h2 id="surrounding" className="stretch-wide text-2xl font-semibold tracking-tight">
              Around the core
            </h2>
            <p className="mt-4 text-base text-graphite">
              The tools we reach for when a system needs more than the core stack. We choose them
              per project, not by habit.
            </p>
          </div>
          <dl className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {surrounding.map((entry) => (
              <div key={entry.group} className="border-t border-line pt-4">
                <dt className="stretch-narrow text-sm text-graphite">{entry.group}</dt>
                {entry.items.map((item) => (
                  <dd key={item} className="mt-1.5 text-base">
                    {item}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
