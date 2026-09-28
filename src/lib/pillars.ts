export type PillarId = "architecture" | "performance" | "interface" | "scale";

export type Pillar = {
  id: PillarId;
  name: string;
  principle: string;
  body: string;
  practice: string[];
};

// Order matches the quadrants of the Kura frame: top-left, top-right,
// bottom-left, bottom-right.
export const pillars: Pillar[] = [
  {
    id: "architecture",
    name: "Architecture",
    principle: "Decide the shape before writing the code.",
    body: "We design the data model, the service boundaries and the failure modes first, and we write them down. Architecture is the part of a system that is expensive to change later, so that is where we spend our thinking.",
    practice: [
      "Schema and domain model reviewed before the first endpoint",
      "Architecture decision records kept in the repository",
      "Failure modes designed for, not discovered in production",
    ],
  },
  {
    id: "performance",
    name: "Performance",
    principle: "Fast is a requirement, not a phase.",
    body: "Performance budgets are set at the start and checked on every pull request. We measure real queries against realistic data, never against an empty development database.",
    practice: [
      "Query plans reviewed for every new access pattern",
      "Latency budgets per endpoint, enforced in CI",
      "Load tests on production-sized data before launch",
    ],
  },
  {
    id: "interface",
    name: "Interface",
    principle: "A system is judged by the parts people touch.",
    body: "APIs and screens are both interfaces. We type them end to end, design them around the person using them, and treat accessibility as part of the structure rather than a finish applied at the end.",
    practice: [
      "Typed contracts from the database to the component",
      "WCAG 2.2 AA as the minimum, tested with real assistive tech",
      "Versioned APIs with a documented deprecation path",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    principle: "Build for ten times the load. Plan for a hundred.",
    body: "We design for the next order of magnitude of users, data and engineers, and we write down what has to change at the one after that. Scale is as much about people shipping safely as it is about servers.",
    practice: [
      "Horizontal scaling paths designed in from the start",
      "Traces, metrics and logs from the first deploy",
      "Codebases a new engineer can ship to in their first week",
    ],
  },
];

export function getPillar(id: PillarId) {
  return pillars.find((pillar) => pillar.id === id)!;
}
