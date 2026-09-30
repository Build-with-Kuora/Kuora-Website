import type { ReactNode } from "react";

/** A section title with an optional lead paragraph. */
export function SectionHeading({
  id,
  children,
  lead,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 id={id} data-scroll-reveal="up" className="display max-w-3xl text-[clamp(2rem,3.6vw,2.875rem)]">
        {children}
      </h2>
      {lead && (
        <p data-scroll-reveal="up" className="mt-4 max-w-xl text-lg text-muted">
          {lead}
        </p>
      )}
    </div>
  );
}
