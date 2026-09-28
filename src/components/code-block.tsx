import { createHighlighterCore, type HighlighterCore, type ThemeRegistration } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

// Highlighting runs on the server at build time; no highlighter ships to the browser.

const kuraTheme: ThemeRegistration = {
  name: "kura",
  type: "dark",
  colors: {
    "editor.background": "#10233a",
    "editor.foreground": "#e6edf3",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#8ba3ba", fontStyle: "italic" } },
    {
      scope: ["keyword", "storage", "storage.type", "keyword.operator.new", "keyword.control"],
      settings: { foreground: "#7cc4fa" },
    },
    { scope: ["string", "constant.numeric", "constant.language"], settings: { foreground: "#9ed8c8" } },
    {
      scope: ["entity.name.type", "support.type", "entity.name.class", "support.class"],
      settings: { foreground: "#e6edf3", fontStyle: "bold" },
    },
    { scope: ["entity.name.function", "support.function"], settings: { foreground: "#e6edf3" } },
    { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: "#8ba3ba" } },
    // Prisma attributes such as @id and @@index.
    { scope: ["entity.name.function.attribute", "source.prisma support.function"], settings: { foreground: "#7cc4fa" } },
  ],
};

let highlighter: Promise<HighlighterCore> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [kuraTheme],
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
  const html = (await getHighlighter()).codeToHtml(code.trim(), { lang, theme: "kura" });

  return (
    <figure className="flex min-w-0 flex-col border border-line bg-plate">
      <figcaption className="stretch-narrow border-b border-line px-4 py-2.5 text-sm text-graphite">
        {filename}
      </figcaption>
      <div
        className="overflow-x-auto p-4 font-mono text-[0.8125rem] leading-relaxed [&_pre]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
