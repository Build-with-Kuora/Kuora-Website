import type { ReactNode } from "react";
import { reveal } from "@/lib/reveal";

/** Opening block for inner pages: the title, a lead and an optional figure. */
export function PageIntro({
  title,
  lead,
  aside,
}: {
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="container-sheet pt-16 pb-16 sm:pt-24 lg:pb-24">
      <div className={aside ? "grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16" : ""}>
        <div>
          <h1 {...reveal(200)} className="display max-w-5xl text-[clamp(2.75rem,7vw,6rem)]">{title}</h1>
          {lead && <div {...reveal(360)} className="mt-8 max-w-2xl space-y-4 text-lg text-muted sm:text-xl">{lead}</div>}
        </div>
        {aside && <div {...reveal(500)}>{aside}</div>}
      </div>
    </section>
  );
}
