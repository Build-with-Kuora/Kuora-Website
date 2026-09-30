// The ways to hire Koura. Lengths are typical ranges, not quotes; every
// engagement starts with a written proposal for the first phase.

export type ServiceId = "build" | "scale" | "run";

export type Service = {
  id: ServiceId;
  name: string;
  audience: string;
  includes: string[];
  length: string;
};

export const services: Service[] = [
  {
    id: "build",
    name: "Build a new product",
    audience: "You have an idea or a spec and need the whole system built, from the data model to the interface.",
    includes: [
      "Discovery and a written brief",
      "Architecture decisions written down before code",
      "Weekly releases you can try",
      "Load-tested launch with a rehearsed rollback",
    ],
    length: "3 to 9 months",
  },
  {
    id: "scale",
    name: "Scale an existing system",
    audience: "Your product works, but it is starting to strain under more users, more data or more engineers.",
    includes: [
      "Measurement against production-sized data",
      "Fixes ordered by the load they carry",
      "Latency budgets enforced in CI",
      "A roadmap for the next order of magnitude",
    ],
    length: "4 to 12 weeks",
  },
  {
    id: "run",
    name: "Run and support",
    audience: "Your system is live and you want it kept fast, observed and on call while you grow.",
    includes: [
      "Monitoring, alerting and on-call",
      "Performance work as traffic grows",
      "Regular reviews of cost and capacity",
      "A documented handover whenever you want one",
    ],
    length: "Ongoing",
  },
];
