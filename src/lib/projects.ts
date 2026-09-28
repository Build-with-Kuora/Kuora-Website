import type { PillarId } from "./pillars";

// Placeholder case studies. The project names, clients and figures below are
// illustrative only. Replace them with real, approved client work before launch.

export type NodeKind = "client" | "service" | "queue" | "data" | "external";

export type DiagramNode = {
  id: string;
  label: string;
  kind: NodeKind;
  /** Column on a 5 × 3 grid. */
  x: number;
  /** Row on a 5 × 3 grid. */
  y: number;
};

export type Diagram = {
  nodes: DiagramNode[];
  edges: [from: string, to: string][];
};

export type Project = {
  slug: string;
  name: string;
  sector: string;
  year: number;
  focus: PillarId;
  summary: string;
  challenge: string;
  approach: string[];
  outcomes: { value: string; label: string }[];
  stack: string[];
  duration: string;
  team: string;
  diagram: Diagram;
};

export const projects: Project[] = [
  {
    slug: "ledgerline",
    name: "Ledgerline",
    sector: "Fintech",
    year: 2026,
    focus: "architecture",
    summary:
      "A double-entry ledger that replaced a payments company's balance tables.",
    challenge:
      "Balances were stored as mutable columns and updated from six services. Reconciliation ran nightly and finance corrected discrepancies by hand. The company needed a single source of truth before it could launch in new markets.",
    approach: [
      "Modelled money movement as immutable, balanced journal entries in PostgreSQL, enforced with constraints and serializable transactions.",
      "Put one Node.js ledger service in front of the data, with idempotency keys on every write.",
      "Published ledger events through a transactional outbox so downstream systems could not drift.",
      "Migrated historical balances in replayable batches, with parity checks against the old tables.",
    ],
    outcomes: [
      { value: "4.2M", label: "journal entries written per day" },
      { value: "0", label: "unreconciled balances since launch" },
      { value: "38 ms", label: "p99 write latency" },
    ],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Kafka"],
    duration: "7 months",
    team: "4 engineers",
    diagram: {
      nodes: [
        { id: "merchants", label: "Merchants", kind: "client", x: 0, y: 1 },
        { id: "gateway", label: "API gateway", kind: "service", x: 1, y: 1 },
        { id: "ledger", label: "Ledger", kind: "service", x: 2, y: 1 },
        { id: "outbox", label: "Outbox", kind: "queue", x: 3, y: 0 },
        { id: "recon", label: "Reconciler", kind: "service", x: 4, y: 0 },
        { id: "primary", label: "Postgres", kind: "data", x: 3, y: 1 },
        { id: "replica", label: "Replica", kind: "data", x: 4, y: 2 },
      ],
      edges: [
        ["merchants", "gateway"],
        ["gateway", "ledger"],
        ["ledger", "primary"],
        ["ledger", "outbox"],
        ["outbox", "recon"],
        ["primary", "replica"],
      ],
    },
  },
  {
    slug: "harbor",
    name: "Harbor",
    sector: "Logistics",
    year: 2025,
    focus: "scale",
    summary:
      "Telemetry ingestion for a fleet operator growing from 3,000 to 30,000 vehicles.",
    challenge:
      "Every vehicle reported its position every five seconds into a single database table. At 3,000 vehicles, the dispatch dashboard already lagged by minutes, and the operator had signed contracts that would multiply the fleet tenfold.",
    approach: [
      "Split ingestion from processing with a partitioned stream, so bursts queue instead of failing.",
      "Made processors stateless and horizontally scaled on stream lag.",
      "Moved position history into time-partitioned PostgreSQL tables with automated retention.",
      "Archived raw payloads to object storage for replay and audit.",
    ],
    outcomes: [
      { value: "10×", label: "fleet growth with no redesign" },
      { value: "1.1 s", label: "median position-to-dashboard delay" },
      { value: "−62%", label: "database storage after partitioning" },
    ],
    stack: ["Node.js", "PostgreSQL", "Prisma", "Redis Streams", "AWS"],
    duration: "5 months",
    team: "3 engineers",
    diagram: {
      nodes: [
        { id: "vehicles", label: "Vehicles", kind: "client", x: 0, y: 1 },
        { id: "ingest", label: "Ingest", kind: "service", x: 1, y: 1 },
        { id: "stream", label: "Stream", kind: "queue", x: 2, y: 1 },
        { id: "workers", label: "Processors", kind: "service", x: 3, y: 1 },
        { id: "alerts", label: "Alerts", kind: "service", x: 4, y: 0 },
        { id: "pg", label: "Postgres", kind: "data", x: 4, y: 1 },
        { id: "archive", label: "Archive", kind: "data", x: 3, y: 2 },
      ],
      edges: [
        ["vehicles", "ingest"],
        ["ingest", "stream"],
        ["stream", "workers"],
        ["stream", "archive"],
        ["workers", "pg"],
        ["workers", "alerts"],
      ],
    },
  },
  {
    slug: "cadence",
    name: "Cadence",
    sector: "Healthcare",
    year: 2025,
    focus: "interface",
    summary:
      "Appointment scheduling for a network of 40 clinics, used by patients and front-desk staff.",
    challenge:
      "Patients booked by phone because the old portal failed on mobile and with screen readers. Front-desk staff juggled three tools to reschedule a single visit.",
    approach: [
      "Designed one typed scheduling API that serves both the patient app and the clinic console.",
      "Built both interfaces with server-rendered React, tested with screen readers and on low-end phones.",
      "Kept the electronic health record as the system of record, synced through a dedicated bridge service.",
      "Sent reminders through a queue so a slow SMS provider never blocks a booking.",
    ],
    outcomes: [
      { value: "71%", label: "of bookings now made online" },
      { value: "AA", label: "WCAG 2.2 conformance, audited" },
      { value: "1 tool", label: "for front-desk rescheduling, down from 3" },
    ],
    stack: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma"],
    duration: "6 months",
    team: "5 engineers, 1 designer",
    diagram: {
      nodes: [
        { id: "patients", label: "Patient app", kind: "client", x: 0, y: 0 },
        { id: "console", label: "Clinic console", kind: "client", x: 0, y: 2 },
        { id: "api", label: "API", kind: "service", x: 1, y: 1 },
        { id: "sched", label: "Scheduling", kind: "service", x: 2, y: 1 },
        { id: "notify", label: "Reminders", kind: "queue", x: 3, y: 0 },
        { id: "pg", label: "Postgres", kind: "data", x: 3, y: 1 },
        { id: "ehr", label: "EHR bridge", kind: "external", x: 3, y: 2 },
      ],
      edges: [
        ["patients", "api"],
        ["console", "api"],
        ["api", "sched"],
        ["sched", "pg"],
        ["sched", "notify"],
        ["sched", "ehr"],
      ],
    },
  },
  {
    slug: "relay",
    name: "Relay",
    sector: "B2B SaaS",
    year: 2024,
    focus: "performance",
    summary:
      "A reporting rebuild that took an analytics product's slowest dashboard from 14 seconds to under one.",
    challenge:
      "Customer dashboards ran aggregate queries across hundreds of millions of rows on every page load. Large accounts timed out, and support tickets about slow reports were the product's top churn signal.",
    approach: [
      "Profiled the twenty slowest queries against a production-sized copy of the data.",
      "Introduced incremental rollup tables maintained by a background worker.",
      "Added covering indexes that matched the real filter and sort order of each report.",
      "Cached hot report fragments with explicit, event-driven invalidation.",
    ],
    outcomes: [
      { value: "0.8 s", label: "p95 dashboard load, from 14 s" },
      { value: "−48%", label: "database CPU at peak" },
      { value: "0", label: "report timeouts in the last two quarters" },
    ],
    stack: ["Node.js", "PostgreSQL", "Prisma", "Redis"],
    duration: "3 months",
    team: "2 engineers",
    diagram: {
      nodes: [
        { id: "dash", label: "Dashboards", kind: "client", x: 0, y: 1 },
        { id: "query", label: "Query API", kind: "service", x: 1, y: 1 },
        { id: "cache", label: "Cache", kind: "data", x: 2, y: 0 },
        { id: "rollup", label: "Rollups", kind: "service", x: 2, y: 2 },
        { id: "pg", label: "Postgres", kind: "data", x: 3, y: 1 },
        { id: "events", label: "Events", kind: "queue", x: 4, y: 1 },
      ],
      edges: [
        ["dash", "query"],
        ["query", "cache"],
        ["query", "pg"],
        ["rollup", "pg"],
        ["pg", "events"],
      ],
    },
  },
  {
    slug: "parcel",
    name: "Parcel",
    sector: "Retail",
    year: 2024,
    focus: "scale",
    summary:
      "A multi-tenant commerce platform that hosts storefronts for 900 independent retailers.",
    challenge:
      "Each new retailer meant a new deployment, a new database and a week of setup. The client wanted self-serve onboarding without one tenant's holiday traffic slowing down the others.",
    approach: [
      "Designed tenant isolation at the database level with row-level security in PostgreSQL.",
      "Served storefronts from one Next.js application, cached at the edge per tenant.",
      "Moved search indexing and email to background jobs with per-tenant rate limits.",
      "Integrated payments through a provider-agnostic adapter.",
    ],
    outcomes: [
      { value: "900", label: "retailers on one platform" },
      { value: "4 min", label: "from sign-up to live storefront" },
      { value: "99.98%", label: "availability over peak season" },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Vercel"],
    duration: "9 months",
    team: "5 engineers",
    diagram: {
      nodes: [
        { id: "stores", label: "Storefronts", kind: "client", x: 0, y: 1 },
        { id: "edge", label: "Edge cache", kind: "service", x: 1, y: 1 },
        { id: "api", label: "Commerce API", kind: "service", x: 2, y: 1 },
        { id: "jobs", label: "Jobs", kind: "queue", x: 3, y: 0 },
        { id: "search", label: "Search", kind: "data", x: 4, y: 0 },
        { id: "pg", label: "Postgres", kind: "data", x: 3, y: 1 },
        { id: "pay", label: "Payments", kind: "external", x: 3, y: 2 },
      ],
      edges: [
        ["stores", "edge"],
        ["edge", "api"],
        ["api", "pg"],
        ["api", "jobs"],
        ["jobs", "search"],
        ["api", "pay"],
      ],
    },
  },
  {
    slug: "meridian",
    name: "Meridian",
    sector: "Energy",
    year: 2023,
    focus: "architecture",
    summary:
      "An asset registry for a grid operator, tracking two million pieces of network equipment.",
    challenge:
      "Asset records lived in spreadsheets and a legacy GIS export. Field crews and planners worked from different versions of the network, and every change needed an audit trail for the regulator.",
    approach: [
      "Modelled the network as a versioned graph in PostgreSQL with PostGIS for geometry.",
      "Recorded every change as an append-only event, so any past state can be reconstructed.",
      "Built an offline-capable field app that syncs through the same typed API as the planning tool.",
      "Generated regulatory reports from the change log instead of manual exports.",
    ],
    outcomes: [
      { value: "2M", label: "assets in one registry" },
      { value: "100%", label: "of changes traceable for audit" },
      { value: "3 days", label: "to produce the annual report, from 5 weeks" },
    ],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "PostGIS", "Prisma"],
    duration: "11 months",
    team: "6 engineers",
    diagram: {
      nodes: [
        { id: "field", label: "Field app", kind: "client", x: 0, y: 0 },
        { id: "planner", label: "Planner", kind: "client", x: 0, y: 2 },
        { id: "api", label: "Asset API", kind: "service", x: 1, y: 1 },
        { id: "registry", label: "Registry", kind: "service", x: 2, y: 1 },
        { id: "log", label: "Change log", kind: "queue", x: 3, y: 0 },
        { id: "reports", label: "Reports", kind: "service", x: 4, y: 0 },
        { id: "pg", label: "PostGIS", kind: "data", x: 3, y: 1 },
      ],
      edges: [
        ["field", "api"],
        ["planner", "api"],
        ["api", "registry"],
        ["registry", "pg"],
        ["registry", "log"],
        ["log", "reports"],
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
