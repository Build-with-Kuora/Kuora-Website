import { createHighlighterCore, type HighlighterCore, type ThemeRegistration } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

// Highlighting runs on the server at build time; no highlighter ships to the browser.

const kouraTheme: ThemeRegistration = {
  name: "koura",
  type: "dark",
  colors: {
    "editor.background": "#06101f",
    "editor.foreground": "#e6f1ff",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#7f97b8", fontStyle: "italic" } },
    {
      scope: ["keyword", "storage", "storage.type", "keyword.operator.new", "keyword.control"],
      settings: { foreground: "#22e4ff" },
    },
    { scope: ["string", "constant.numeric", "constant.language"], settings: { foreground: "#39ff88" } },
    {
      scope: ["entity.name.type", "support.type", "entity.name.class", "support.class"],
      settings: { foreground: "#e6f1ff", fontStyle: "bold" },
    },
    { scope: ["entity.name.function", "support.function"], settings: { foreground: "#e6f1ff" } },
    { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#7f97b8" } },
    // Prisma attributes such as @id and @@index.
    { scope: ["entity.name.function.attribute", "source.prisma support.function"], settings: { foreground: "#22e4ff" } },
  ],
};

let highlighter: Promise<HighlighterCore> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [kouraTheme],
    langs: [import("shiki/langs/prisma.mjs"), import("shiki/langs/typescript.mjs")],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighter;
}

export async function CodeBlock({
  code,
  lang,
  filename,
}: {
  code: string;
  lang: "prisma" | "typescript";
  filename: string;
}) {
  const html = (await getHighlighter()).codeToHtml(code.trim(), { lang, theme: "koura" });

  return (
    <figure className="flex min-w-0 flex-col border border-panel-line bg-panel">
      <figcaption className="flex items-center gap-2 border-b border-panel-line px-4 py-3 label text-panel-muted">
        <span aria-hidden="true" className="status-dot size-1.5 bg-neon-green" />
        {filename}
      </figcaption>
      <div
        className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed text-panel-fg [&_pre]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
