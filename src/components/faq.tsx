export type Question = { q: string; a: string };

/** Questions as an accordion: each one opens in place. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <div className="border-t border-line-strong">
      {questions.map((item, index) => (
        <details key={item.q} className="group border-b border-line-strong" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-[-0.01em]">
            {item.q}
            <span
              aria-hidden="true"
              className="text-2xl leading-none font-light text-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
