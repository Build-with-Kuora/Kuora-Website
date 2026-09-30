import { lifecycle } from "@/lib/process";

/** The stages of an engagement, in order. */
export function ProcessBeam({ showOutput = false }: { showOutput?: boolean }) {
  return (
    <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {lifecycle.map((step, index) => (
        <li key={step.stage} data-scroll-reveal="up" className="border-t border-line-strong pt-5">
          <p className="label">{index + 1}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em]">{step.stage}</h3>
          <p className="mt-2 text-[0.9375rem] font-medium">{step.question}</p>
          <p className="mt-1.5 text-[0.9375rem] text-muted">{step.body}</p>
          {showOutput && (
            <p className="mt-4 border-t border-line pt-3 text-sm">
              <span className="text-muted">Output: </span>
              {step.output.toLowerCase()}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
