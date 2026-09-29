const corners = [
  "-top-[5.5px] -left-[5.5px]",
  "-top-[5.5px] -right-[5.5px]",
  "-bottom-[5.5px] -left-[5.5px]",
  "-bottom-[5.5px] -right-[5.5px]",
];

/** Crosshair marks on the four corners of the parent, as printed on a drawing sheet. */
export function RegistrationMarks({ className = "text-fg" }: { className?: string }) {
  return (
    <>
      {corners.map((corner) => (
        <svg
          key={corner}
          aria-hidden="true"
          viewBox="0 0 11 11"
          className={`pointer-events-none absolute z-10 size-[11px] ${corner} ${className}`}
        >
          <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}
