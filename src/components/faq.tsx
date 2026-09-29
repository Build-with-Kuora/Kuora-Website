export type Question = { q: string; a: string };

/** Questions as an accordion: each one opens in place. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <div className="border-t border-fg">
      {questions.map((item, index) => (
        <details key={item.q} className="group border-b border-line-strong" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium tracking-[-0.01em] transition-colors hover:text-muted">
            <span className="flex gap-4">
              <span className="label-mono pt-1.5">Q{String(index + 1).padStart(2, "0")}</span>
              {item.q}
            </span>
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center border border-fg text-base leading-none transition-colors group-open:bg-neon-green group-open:text-on-neon"
            >
              <span className="transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="max-w-2xl pb-6 pl-12 text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
