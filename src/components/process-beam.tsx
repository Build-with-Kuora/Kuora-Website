import { lifecycle } from "@/lib/process";

/** The engagement drawn as one beam, with a joint at every stage. */
export function ProcessBeam({ showOutput = false }: { showOutput?: boolean }) {
  return (
    <ol className="relative mt-14 grid gap-10 pl-9 lg:grid-cols-5 lg:gap-6 lg:pt-10 lg:pl-0">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-fg lg:inset-x-0 lg:top-[7px] lg:bottom-auto lg:h-0.5 lg:w-auto" />
      {lifecycle.map((step, index) => (
        <li key={step.stage} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1 -left-9 size-4 bg-neon-green ring-1 ring-fg lg:-top-10 lg:left-0"
          />
          <p className="label-mono">Stage {String(index + 1).padStart(2, "0")}</p>
          <h3 className="display mt-3 text-2xl">{step.stage}</h3>
          <p className="mt-2 text-[0.9375rem] font-medium">{step.question}</p>
          <p className="mt-2 text-[0.9375rem] text-muted">{step.body}</p>
          {showOutput && (
            <p className="mt-4 border-t border-line-strong pt-3 font-mono text-[0.75rem] [font-variation-settings:'wdth'_85]">
              <span className="text-muted">Output: </span>
              {step.output.toLowerCase()}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
