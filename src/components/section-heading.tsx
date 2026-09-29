import type { ReactNode } from "react";

/**
 * Opens a section like a cut line on a drawing: a heavy rule carrying the
 * section's label and reference, then the title.
 */
export function SectionHeading({
  id,
  label,
  index,
  children,
  lead,
  className = "",
}: {
  id?: string;
  label: string;
  index?: string;
  children: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4 border-t-2 border-fg pt-3">
        <p className="label-mono flex items-center gap-2 text-fg">
          <span aria-hidden="true" className="size-2 bg-neon-green ring-1 ring-fg" />
          {label}
        </p>
        {index && <p className="label-mono">{index}</p>}
      </div>
      <h2 id={id} className="display mt-8 max-w-4xl text-[clamp(2.25rem,4.8vw,3.875rem)]">
        {children}
      </h2>
      {lead && <p className="mt-5 max-w-xl text-lg text-muted">{lead}</p>}
    </div>
  );
}
