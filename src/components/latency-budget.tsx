import type { CSSProperties } from "react";

// An example of the latency budget we agree on day one, split across the layers.
const TARGET_MS = 200;
const segments = [
  { layer: "Edge and CDN", ms: 15, color: "bg-neon-blue/50" },
  { layer: "Interface render", ms: 55, color: "bg-neon-blue" },
  { layer: "Service logic", ms: 50, color: "bg-neon-green/70" },
  { layer: "Database query", ms: 40, color: "bg-neon-green" },
  {
    layer: "Headroom",
    ms: 40,
    color: "bg-[repeating-linear-gradient(135deg,var(--color-panel-muted)_0_1px,transparent_1px_5px)]",
  },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function LatencyBudget() {
  return (
    <div className="font-mono text-[0.75rem] text-panel-fg [font-variation-settings:'wdth'_85]">
      <div className="flex items-baseline justify-between gap-4">
        <p className="label-mono text-panel-muted">Fig. 02 · Latency budget</p>
        <p className="label-mono text-neon-green">p95 ≤ {TARGET_MS} ms</p>
      </div>

      <div className="mt-5 flex h-3 gap-px" aria-hidden="true">
        {segments.map((segment, index) => (
          <span
            key={segment.layer}
            className={`fill-bar block h-full ${segment.color}`}
            style={{ width: `${(segment.ms / TARGET_MS) * 100}%`, ...delay(300 + index * 120) }}
          />
        ))}
      </div>

      <table className="mt-5 w-full">
        <caption className="sr-only">
          Example latency budget of {TARGET_MS} milliseconds at the 95th percentile, split by layer
        </caption>
        <tbody>
          {segments.map((segment) => (
            <tr key={segment.layer} className="border-t border-panel-line">
              <th scope="row" className="py-2 text-left font-normal">
                <span className="flex items-center gap-2.5">
                  <span aria-hidden="true" className={`size-2 ${segment.color}`} />
                  {segment.layer}
                </span>
              </th>
              <td className="py-2 text-right text-panel-muted tabular-nums">{segment.ms} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 border-t border-panel-line pt-4 text-panel-muted">
        Set before the first line of code. Checked on every pull request.
      </p>
    </div>
  );
}
