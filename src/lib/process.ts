// The stages of a Kuora engagement, in order.
export const lifecycle = [
  {
    stage: "Discover",
    question: "What has to hold?",
    body: "We map the domain, the expected load and the constraints with your team.",
    output: "A written brief and a list of risks",
  },
  {
    stage: "Design",
    question: "What shape should it take?",
    body: "Data model, service boundaries and failure modes, reviewed before we build.",
    output: "Architecture decision records",
  },
  {
    stage: "Build",
    question: "Does it work under load?",
    body: "Weekly releases to a production-like environment, with budgets checked in CI.",
    output: "Working software every week",
  },
  {
    stage: "Launch",
    question: "Can we ship it safely?",
    body: "Load-tested and observable, with a rollback plan we have already rehearsed.",
    output: "A rehearsed release plan",
  },
  {
    stage: "Operate",
    question: "What happens at ten times the traffic?",
    body: "We run what we build: on-call, tuning and planning for the next order of magnitude.",
    output: "Service levels and a scaling roadmap",
  },
];
