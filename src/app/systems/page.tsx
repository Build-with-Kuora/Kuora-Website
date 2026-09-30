import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { ContactBand } from "@/components/contact-band";
import { PillarGlyph } from "@/components/kuora-mark";
import { PageIntro } from "@/components/page-intro";
import { ProcessBeam } from "@/components/process-beam";
import { SectionHeading } from "@/components/section-heading";
import { getPillar, type PillarId } from "@/lib/pillars";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Kuora's full-stack capabilities: Node.js services, Prisma data access and PostgreSQL, from interface to foundation.",
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
      <PageIntro
        title="The full stack, from the foundation up."
        lead={
          <p>
            We work across every layer and every stage of a system&apos;s life. Our core is TypeScript
            on Node.js, Prisma and PostgreSQL: proven, well understood, and fast enough for almost
            anything you will ask of it.
          </p>
        }
      />

      <section aria-labelledby="section-drawing" className="container-sheet pb-24 lg:pb-32">
        <SectionHeading
          id="section-drawing"
          lead="Read it like a building section. A request enters at the top and travels down to the foundation."
        >
          How a system stands
        </SectionHeading>

        <ol className="mt-12 overflow-hidden rounded-2xl border border-line">
          {floors.map((floor) => {
            const pillar = getPillar(floor.pillar);
            const dark = floor.belowGrade;
            return (
              <li
                key={floor.level}
                className={`grid gap-6 border-line p-6 not-last:border-b sm:p-8 lg:grid-cols-[8rem_1.2fr_1fr] lg:gap-10 ${
                  dark ? "bg-panel text-panel-fg" : "bg-surface"
                }`}
              >
                <div className="flex items-baseline gap-4 lg:block">
                  <p className={`display text-4xl ${dark ? "text-brand-mint" : "text-accent"}`}>
                    <span className="sr-only">Level </span>
                    {floor.level}
                  </p>
                  <p className={`text-sm lg:mt-2 ${dark ? "text-panel-muted" : "text-muted"}`}>
                    {dark ? "Below grade" : floor.layer}
                  </p>
                </div>
                <div>
                  <h3 className="display text-3xl">{floor.tech}</h3>
                  <p className={`mt-3 max-w-prose text-[0.9375rem] leading-relaxed ${dark ? "text-panel-muted" : "text-muted"}`}>
                    {floor.body}
                  </p>
                  <p className={`mt-5 flex items-center gap-2 text-sm ${dark ? "text-panel-muted" : "text-muted"}`}>
                    <PillarGlyph pillar={floor.pillar} className="size-3 text-brand-mint" />
                    Carries {pillar.name.toLowerCase()}
                  </p>
                </div>
                <ul className={`self-start border-t text-[0.875rem] ${dark ? "border-panel-line" : "border-line"}`}>
                  {floor.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className={`flex items-center gap-2.5 border-b py-2.5 ${dark ? "border-panel-line" : "border-line"}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`size-1.5 shrink-0 rounded-full bg-brand-mint ${dark ? "status-dot" : ""}`}
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="typed">
        <div className="container-sheet grid gap-12 pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-32">
          <div className="lg:col-span-4">
            <SectionHeading id="typed">
              One schema, all the way to the screen.
            </SectionHeading>
            <dl className="mt-10 border-t border-line-strong text-[0.9375rem]">
              {[
                ["The index is designed with the query.", "It is not added after the first incident."],
                ["Cursor pagination", "keeps the ten-thousandth page as fast as the first."],
                ["Types flow upward.", "Rename a column and the build fails, not the page your customer is looking at."],
              ].map(([term, detail]) => (
                <div key={term} className="border-b border-line py-4">
                  <dt className="inline">{term} </dt>
                  <dd className="inline text-muted">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid min-w-0 gap-4 lg:col-span-8">
            <CodeBlock code={schemaExample} lang="prisma" filename="prisma/schema.prisma" />
            <CodeBlock code={serviceExample} lang="typescript" filename="src/services/projects.ts" />
          </div>
        </div>
      </section>

      <section aria-labelledby="lifecycle">
        <div className="container-sheet pb-24 lg:pb-32">
          <SectionHeading id="lifecycle">
            From the first question to the on-call rotation.
          </SectionHeading>
          <ProcessBeam showOutput />
        </div>
      </section>

      <section aria-labelledby="surrounding">
        <div className="container-sheet grid gap-10 pb-24 lg:grid-cols-12 lg:pb-32">
          <SectionHeading
            id="surrounding"
            lead="The tools we reach for when a system needs more than the core stack. We choose them per project, not by habit."
            className="lg:col-span-5"
          >
            Chosen for the load.
          </SectionHeading>
          <dl className="grid-hairline self-start sm:grid-cols-2 lg:col-span-7">
            {surrounding.map((entry) => (
              <div key={entry.group} className="p-6">
                <dt className="label">{entry.group}</dt>
                {entry.items.map((item) => (
                  <dd key={item} className="mt-2 text-[0.9375rem]">
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
