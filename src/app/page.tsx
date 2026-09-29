import { BracedFrame } from "@/components/braced-frame";
import { ContactBand } from "@/components/contact-band";
import { DrawingRegister } from "@/components/drawing-register";
import { Faq, type Question } from "@/components/faq";
import { LatencyBudget } from "@/components/latency-budget";
import { TransitionLink } from "@/components/page-transition";
import { PillarFrame } from "@/components/pillar-frame";
import { ProcessBeam } from "@/components/process-beam";
import { RegistrationMarks } from "@/components/registration-marks";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const coreStack = ["Next.js", "Node.js", "Prisma", "PostgreSQL"];

const questions: Question[] = [
  {
    q: "What does full-cycle development mean?",
    a: "One team takes a system from the first conversation to production and keeps running it afterwards. The engineers who design the schema also build the interface and carry the on-call rotation, so nothing is lost in hand-offs.",
  },
  {
    q: "What stack do you build with?",
    a: "Our default is TypeScript end to end: Next.js and React for interfaces, Node.js for services, Prisma for data access and PostgreSQL as the foundation. We add queues, caches and infrastructure per project, based on the load the system has to carry.",
  },
  {
    q: "Can you work on an existing codebase?",
    a: "Yes. Many projects start with a system that already exists and is starting to strain. We begin by measuring it with realistic data, then fix the parts that carry the most load first.",
  },
  {
    q: "How big is a typical team?",
    a: "Small and senior, sized to the system rather than to a staffing plan. The people you meet at the start are the people who build it.",
  },
  {
    q: "What happens after launch?",
    a: "We can keep running the system for you, with monitoring, on-call and performance work, or hand it over to your team with documentation and the decision records that explain why it is built the way it is.",
  },
  {
    q: "How do we start?",
    a: "Email us with what you are building and where it strains. We reply with questions, then a short written proposal for the first phase.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* The hero is the frame: four quadrants, two of them lit. */}
      <section className="container-sheet pt-8 pb-24 sm:pt-12 lg:pb-32">
        <div className="grid border border-fg lg:grid-cols-[1.35fr_1fr]">
          <div className="relative border-b border-fg p-6 sm:p-10 lg:border-r">
            <RegistrationMarks />
            <div className="flex items-center justify-between gap-4">
              <p className="label-mono text-fg">Sheet K-00</p>
              <p className="label-mono">Software engineering studio</p>
            </div>
            <h1 className="display mt-14 text-[clamp(3rem,7.2vw,6.5rem)] sm:mt-20">
              Software built to carry load.
            </h1>
          </div>

          <div className="relative border-b border-panel-line bg-panel p-6 text-panel-fg sm:p-8">
            <RegistrationMarks />
            <div className="flex items-baseline justify-between gap-4">
              <p className="label-mono text-panel-muted">Fig. 01 · The frame</p>
              <p className="label-mono text-neon-green">4 members</p>
            </div>
            <div className="mx-auto mt-4 max-w-sm">
              <BracedFrame />
            </div>
          </div>

          <div className="relative flex flex-col justify-between gap-10 border-b border-fg p-6 sm:p-10 lg:border-r lg:border-b-0">
            <RegistrationMarks />
            <p className="max-w-lg text-lg sm:text-xl">
              Kura designs, builds and runs full-cycle software for companies that expect to grow. We
              start from the data model and work up, so what we ship still holds when traffic, data
              and your team multiply.
            </p>
            <div>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${site.email}`} className="btn-primary">
                  Start a project <span aria-hidden="true">→</span>
                </a>
                <TransitionLink href="/work" className="btn-secondary">
                  See the work
                </TransitionLink>
              </div>
              <ul aria-label="Core stack" className="mt-8 flex flex-wrap border-t border-line-strong pt-4">
                {coreStack.map((tool, index) => (
                  <li key={tool} className="label-mono flex items-center text-fg">
                    {index > 0 && (
                      <span aria-hidden="true" className="mx-3 text-line-strong">
                        /
                      </span>
                    )}
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative bg-panel p-6 sm:p-8">
            <RegistrationMarks />
            <LatencyBudget />
          </div>
        </div>
      </section>

      <section aria-labelledby="pillars" className="container-sheet pb-24 lg:pb-32">
        <SectionHeading
          id="pillars"
          label="Pillars"
          index="01"
          lead="Kura comes from quadro, a square frame. Four members, each carrying part of the load, and none of them optional."
        >
          Four pillars. One frame.
        </SectionHeading>
        <PillarFrame />
      </section>

      <section aria-labelledby="register" className="container-sheet pb-24 lg:pb-32">
        <SectionHeading
          id="register"
          label="Drawing register"
          index="02"
          lead="Every project is filed as its architecture. Point at a sheet to open it in the viewer."
        >
          Systems we have built.
        </SectionHeading>
        <div className="mt-12">
          <DrawingRegister projects={projects} />
        </div>
      </section>

      <section aria-labelledby="process" className="container-sheet pb-24 lg:pb-32">
        <SectionHeading id="process" label="Process" index="03">
          Five stages, one load path.
        </SectionHeading>
        <ProcessBeam />
      </section>

      <section aria-labelledby="questions" className="container-sheet pb-24 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading id="questions" label="Questions" index="04" className="lg:col-span-4">
            Before you ask.
          </SectionHeading>
          <div className="lg:col-span-7 lg:col-start-6 lg:pt-[4.25rem]">
            <Faq questions={questions} />
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
