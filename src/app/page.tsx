import { BracedFrame } from "@/components/braced-frame";
import { ContactBand } from "@/components/contact-band";
import { TransitionLink } from "@/components/page-transition";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

const core = [
  {
    name: "Node.js",
    role: "Services",
    body: "Typed APIs, background jobs and integrations, stateless so they scale out.",
  },
  {
    name: "Prisma",
    role: "Data access",
    body: "One schema as the source of truth, with type-safe queries and reviewed migrations.",
  },
  {
    name: "PostgreSQL",
    role: "Foundation",
    body: "Constraints, transactions and indexes shaped around how the data is really used.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="container-sheet grid gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-24 lg:pb-28">
        <div className="lg:col-span-7">
          <h1 className="stretch-wide text-[clamp(2.25rem,6.2vw,5.5rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
            Software built to carry load.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-graphite sm:text-xl">
            Kura designs, builds and runs full-cycle software for companies that expect to grow. We
            start from the data model and work up, so what we ship still holds when traffic, data
            and your team multiply.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <TransitionLink
              href="/work"
              className="bg-chalk px-5 py-3 text-base font-medium text-ink transition-colors hover:bg-signal"
            >
              See the work
            </TransitionLink>
            <TransitionLink
              href="/philosophy"
              className="border border-line px-5 py-3 text-base font-medium transition-colors hover:border-signal hover:text-signal"
            >
              How we build
            </TransitionLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <BracedFrame />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-sheet grid gap-8 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <h2 className="stretch-wide text-2xl font-semibold tracking-tight lg:col-span-4">
            What we do
          </h2>
          <div className="lg:col-span-8">
            <p className="max-w-3xl text-2xl leading-snug sm:text-3xl sm:leading-tight">
              We own software systems end to end: the data model, the services, the interface, the
              infrastructure, and the on-call rotation after launch. One team holds the whole
              structure, so nothing is lost between the layers.
            </p>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-base">
              <li>
                <TransitionLink
                  href="/philosophy"
                  className="underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                >
                  Read the four pillars
                </TransitionLink>
              </li>
              <li>
                <TransitionLink
                  href="/systems"
                  className="underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
                >
                  See the stack we build on
                </TransitionLink>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="selected-work">
        <div className="container-sheet py-20 lg:py-28">
          <div className="flex items-end justify-between gap-6">
            <h2 id="selected-work" className="stretch-wide text-2xl font-semibold tracking-tight">
              Selected work
            </h2>
            <TransitionLink
              href="/work"
              className="text-base underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
            >
              All {projects.length} projects
            </TransitionLink>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="core-stack">
        <div className="container-sheet grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <h2 id="core-stack" className="stretch-wide text-2xl font-semibold tracking-tight">
              A stack we know down to the foundation
            </h2>
            <TransitionLink
              href="/systems"
              className="mt-6 inline-block text-base underline decoration-line underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
            >
              How the layers fit together
            </TransitionLink>
          </div>
          {/* Listed top to bottom in the order a request travels. */}
          <ol className="border-t-2 border-chalk lg:col-span-8">
            {core.map((layer) => (
              <li
                key={layer.name}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <div>
                  <p className="stretch-wide text-xl font-semibold">{layer.name}</p>
                  <p className="stretch-narrow text-sm text-graphite">{layer.role}</p>
                </div>
                <p className="text-base text-graphite sm:pt-1">{layer.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
