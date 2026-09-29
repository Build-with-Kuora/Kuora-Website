import type { ReactNode } from "react";

/** Opening block for inner pages, headed like a drawing sheet. */
export function PageIntro({
  sheet,
  label,
  title,
  lead,
  aside,
}: {
  sheet: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="container-sheet pt-10 pb-16 sm:pt-14 lg:pb-24">
      <div className="flex items-center justify-between gap-4 border-b border-line-strong pb-3">
        <p className="label text-fg">Sheet {sheet}</p>
        <p className="label">{label}</p>
      </div>
      <div className={aside ? "grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16" : ""}>
        <div>
          <h1 className="display mt-12 max-w-5xl text-[clamp(2.75rem,7vw,6rem)] sm:mt-16">{title}</h1>
          {lead && <div className="mt-8 max-w-2xl space-y-4 text-lg text-muted sm:text-xl">{lead}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
