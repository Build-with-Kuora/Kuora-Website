import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm, PrefilledInquiryForm } from "@/components/inquiry-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Tell Kuora what you are building. We reply with questions, then a written proposal for the first phase.",
};

const steps = [
  {
    title: "You tell us about the project",
    body: "Use the form or email us. A few paragraphs is plenty.",
  },
  {
    title: "We reply with questions",
    body: "About the load, the data and the constraints, so we understand what has to hold.",
  },
  {
    title: "You get a written proposal",
    body: "Scope, team and cost for the first phase, before any work starts.",
  },
];

export default function StartPage() {
  return (
    <section className="container-sheet pt-16 pb-24 sm:pt-20 lg:pb-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="display text-[clamp(2.75rem,6vw,4.75rem)] leading-[1] tracking-[-0.04em]">
            Start a project.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Tell us what you are building and where it strains. We will reply with how we would
            approach it.
          </p>
          <div className="mt-12">
            {/* The plain form is prerendered; the prefilled one replaces it once the query string is read. */}
            <Suspense fallback={<InquiryForm />}>
              <PrefilledInquiryForm />
            </Suspense>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold tracking-[-0.01em]">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong text-sm font-medium tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-sm text-muted">Prefer email?</p>
              <a href={`mailto:${site.email}`} className="mt-1 inline-block font-medium underline underline-offset-4 decoration-line-strong hover:decoration-fg">
                {site.email}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
