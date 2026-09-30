"use client";

/** Switches between the light and dark themes and remembers the choice. */
const tones = {
  canvas: "rounded-lg border-line text-muted hover:border-line-strong hover:text-fg",
  panel: "rounded-lg border-panel-line text-panel-muted hover:text-panel-fg",
  // Inside the floating nav pill: round, borderless until hovered.
  pill: "rounded-full border-transparent text-muted hover:border-line hover:text-fg",
};

export function ThemeToggle({ tone = "canvas" }: { tone?: keyof typeof tones }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={`grid size-9 place-items-center border transition-colors ${tones[tone]}`}
    >
      {/* Both icons render; CSS shows the one for the current theme. */}
      <svg
        viewBox="0 0 20 20"
        className="size-[1.125rem] dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="3.25" />
        <path d="M10 1.75v2M10 16.25v2M1.75 10h2M16.25 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" strokeLinecap="round" />
      </svg>
      <svg
        viewBox="0 0 20 20"
        className="hidden size-[1.125rem] dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M16.5 12.2A6.75 6.75 0 0 1 7.8 3.5a6.75 6.75 0 1 0 8.7 8.7Z" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
