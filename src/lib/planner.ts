import type { Diagram, DiagramNode } from "./projects";

// The project planner on the home page. Each blueprint is the system we would
// start from for one kind of product, and each node or edge says from which
// load tier it is needed. Nothing is added before the load asks for it.

export type Tier = 0 | 1 | 2;

export const tiers: { label: string }[] = [
  { label: "Under 10k users" },
  { label: "10k to 1M users" },
  { label: "Over 1M users" },
];

type PlanNode = DiagramNode & { from?: Tier };
type PlanEdge = { link: [from: string, to: string]; from?: Tier; until?: Tier };

export type Blueprint = {
  id: string;
  label: string;
  /** Slug of the closest case study. */
  project: string;
  nodes: PlanNode[];
  edges: PlanEdge[];
};

export const blueprints: Blueprint[] = [
  {
    id: "ledger",
    label: "Payments or a ledger",
    project: "ledgerline",
    nodes: [
      { id: "clients", label: "Merchants", kind: "client", x: 0, y: 1 },
      { id: "gateway", label: "API gateway", kind: "service", x: 1, y: 1 },
      { id: "ledger", label: "Ledger", kind: "service", x: 2, y: 1 },
      { id: "db", label: "Postgres", kind: "data", x: 3, y: 1 },
      { id: "outbox", label: "Outbox", kind: "queue", x: 3, y: 0, from: 1 },
      { id: "recon", label: "Reconciler", kind: "service", x: 4, y: 0, from: 1 },
      { id: "replica", label: "Replica", kind: "data", x: 4, y: 2, from: 2 },
    ],
    edges: [
      { link: ["clients", "gateway"] },
      { link: ["gateway", "ledger"] },
      { link: ["ledger", "db"] },
      { link: ["ledger", "outbox"], from: 1 },
      { link: ["outbox", "recon"], from: 1 },
      { link: ["db", "replica"], from: 2 },
    ],
  },
  {
    id: "tracking",
    label: "Tracking or telemetry",
    project: "harbor",
    nodes: [
      { id: "devices", label: "Devices", kind: "client", x: 0, y: 1 },
      { id: "ingest", label: "Ingest", kind: "service", x: 1, y: 1 },
      { id: "stream", label: "Stream", kind: "queue", x: 2, y: 1, from: 1 },
      { id: "workers", label: "Processors", kind: "service", x: 3, y: 1, from: 1 },
      { id: "alerts", label: "Alerts", kind: "service", x: 4, y: 0, from: 1 },
      { id: "db", label: "Postgres", kind: "data", x: 4, y: 1 },
      { id: "archive", label: "Archive", kind: "data", x: 3, y: 2, from: 2 },
    ],
    edges: [
      { link: ["devices", "ingest"] },
      { link: ["ingest", "db"], until: 0 },
      { link: ["ingest", "stream"], from: 1 },
      { link: ["stream", "workers"], from: 1 },
      { link: ["workers", "db"], from: 1 },
      { link: ["workers", "alerts"], from: 1 },
      { link: ["stream", "archive"], from: 2 },
    ],
  },
  {
    id: "booking",
    label: "Booking and scheduling",
    project: "cadence",
    nodes: [
      { id: "customers", label: "Customer app", kind: "client", x: 0, y: 0 },
      { id: "staff", label: "Staff console", kind: "client", x: 0, y: 2 },
      { id: "api", label: "API", kind: "service", x: 1, y: 1 },
      { id: "scheduling", label: "Scheduling", kind: "service", x: 2, y: 1 },
      { id: "db", label: "Postgres", kind: "data", x: 3, y: 1 },
      { id: "calendars", label: "Calendars", kind: "external", x: 3, y: 2 },
      { id: "reminders", label: "Reminders", kind: "queue", x: 3, y: 0, from: 1 },
      { id: "replica", label: "Replica", kind: "data", x: 4, y: 1, from: 2 },
    ],
    edges: [
      { link: ["customers", "api"] },
      { link: ["staff", "api"] },
      { link: ["api", "scheduling"] },
      { link: ["scheduling", "db"] },
      { link: ["scheduling", "calendars"] },
      { link: ["scheduling", "reminders"], from: 1 },
      { link: ["db", "replica"], from: 2 },
    ],
  },
  {
    id: "reporting",
    label: "Dashboards and reporting",
    project: "relay",
    nodes: [
      { id: "dashboards", label: "Dashboards", kind: "client", x: 0, y: 1 },
      { id: "query", label: "Query API", kind: "service", x: 1, y: 1 },
      { id: "db", label: "Postgres", kind: "data", x: 3, y: 1 },
      { id: "rollups", label: "Rollups", kind: "service", x: 3, y: 2, from: 1 },
      { id: "events", label: "Events", kind: "queue", x: 4, y: 2, from: 1 },
      { id: "cache", label: "Cache", kind: "data", x: 2, y: 0, from: 2 },
    ],
    edges: [
      { link: ["dashboards", "query"] },
      { link: ["query", "db"] },
      { link: ["events", "rollups"], from: 1 },
      { link: ["rollups", "db"], from: 1 },
      { link: ["query", "cache"], from: 2 },
    ],
  },
  {
    id: "commerce",
    label: "A store or marketplace",
    project: "parcel",
    nodes: [
      { id: "storefronts", label: "Storefronts", kind: "client", x: 0, y: 1 },
      { id: "edge", label: "Edge cache", kind: "service", x: 1, y: 1, from: 2 },
      { id: "api", label: "Store API", kind: "service", x: 2, y: 1 },
      { id: "db", label: "Postgres", kind: "data", x: 3, y: 1 },
      { id: "payments", label: "Payments", kind: "external", x: 3, y: 2 },
      { id: "jobs", label: "Jobs", kind: "queue", x: 3, y: 0, from: 1 },
      { id: "search", label: "Search", kind: "data", x: 4, y: 0, from: 1 },
    ],
    edges: [
      { link: ["storefronts", "api"], until: 1 },
      { link: ["storefronts", "edge"], from: 2 },
      { link: ["edge", "api"], from: 2 },
      { link: ["api", "db"] },
      { link: ["api", "payments"] },
      { link: ["api", "jobs"], from: 1 },
      { link: ["jobs", "search"], from: 1 },
    ],
  },
  {
    id: "registry",
    label: "An asset or data registry",
    project: "meridian",
    nodes: [
      { id: "field", label: "Field app", kind: "client", x: 0, y: 0 },
      { id: "office", label: "Back office", kind: "client", x: 0, y: 2 },
      { id: "api", label: "Asset API", kind: "service", x: 1, y: 1 },
      { id: "registry", label: "Registry", kind: "service", x: 2, y: 1 },
      { id: "db", label: "Postgres", kind: "data", x: 3, y: 1 },
      { id: "changes", label: "Change log", kind: "queue", x: 3, y: 0, from: 1 },
      { id: "reports", label: "Reports", kind: "service", x: 4, y: 0, from: 2 },
    ],
    edges: [
      { link: ["field", "api"] },
      { link: ["office", "api"] },
      { link: ["api", "registry"] },
      { link: ["registry", "db"] },
      { link: ["registry", "changes"], from: 1 },
      { link: ["changes", "reports"], from: 2 },
    ],
  },
];

/** The blueprint's system at a given load tier, ready for SystemDiagram. */
export function systemAt(blueprint: Blueprint, tier: Tier): Diagram {
  const inTier = (item: { from?: Tier; until?: Tier }) =>
    (item.from ?? 0) <= tier && tier <= (item.until ?? 2);
  return {
    nodes: blueprint.nodes.filter(inTier),
    edges: blueprint.edges.filter(inTier).map((edge) => edge.link),
  };
}

/** Components that first appear at this tier. */
export function addedAt(blueprint: Blueprint, tier: Tier) {
  return tier === 0 ? [] : blueprint.nodes.filter((node) => node.from === tier).map((node) => node.label);
}
