import type { Diagram, DiagramNode, NodeKind } from "@/lib/projects";

// Every project cover is its own architecture, drawn on a 5 × 3 grid.
const COLS = 5;
const ROWS = 3;
const CELL_W = 124;
const CELL_H = 76;
const NODE_W = 104;
const NODE_H = 38;
const PAD = 16;
const WIDTH = PAD * 2 + COLS * CELL_W;
const HEIGHT = PAD * 2 + ROWS * CELL_H;

type Tone = "paper" | "panel";

function center(node: DiagramNode) {
  return {
    x: PAD + node.x * CELL_W + CELL_W / 2,
    y: PAD + node.y * CELL_H + CELL_H / 2,
  };
}

// Orthogonal routing: straight when aligned, one elbow otherwise.
function route(from: DiagramNode, to: DiagramNode) {
  const a = center(from);
  const b = center(to);

  if (from.x === to.x) {
    const down = to.y > from.y;
    const y1 = a.y + (down ? NODE_H / 2 : -NODE_H / 2);
    const y2 = b.y + (down ? -NODE_H / 2 : NODE_H / 2);
    return { d: `M${a.x} ${y1}V${y2}`, end: { x: b.x, y: y2 } };
  }

  const right = to.x > from.x;
  const x1 = a.x + (right ? NODE_W / 2 : -NODE_W / 2);
  const x2 = b.x + (right ? -NODE_W / 2 : NODE_W / 2);
  if (from.y === to.y) {
    return { d: `M${x1} ${a.y}H${x2}`, end: { x: x2, y: b.y } };
  }
  const mid = (x1 + x2) / 2;
  return { d: `M${x1} ${a.y}H${mid}V${b.y}H${x2}`, end: { x: x2, y: b.y } };
}

const palette: Record<
  Tone,
  { nodes: Record<NodeKind, string>; edge: string; joint: string; text: string; rule: string }
> = {
  paper: {
    nodes: {
      client: "fill-surface stroke-fg",
      service: "fill-canvas stroke-fg/70",
      queue: "fill-surface stroke-fg/70",
      data: "fill-fg/10 stroke-fg/70",
      external: "fill-none stroke-muted",
    },
    edge: "stroke-muted",
    joint: "fill-fg",
    text: "fill-fg",
    rule: "stroke-fg/70",
  },
  panel: {
    nodes: {
      client: "fill-panel stroke-panel-fg",
      service: "fill-panel stroke-neon-cyan",
      queue: "fill-panel stroke-neon-green",
      data: "fill-neon-cyan/15 stroke-neon-cyan",
      external: "fill-none stroke-panel-muted",
    },
    edge: "stroke-neon-cyan/60",
    joint: "fill-neon-green",
    text: "fill-panel-fg",
    rule: "stroke-neon-cyan",
  },
};

const dashes: Partial<Record<NodeKind, string>> = {
  queue: "5 4",
  external: "1.5 3.5",
};

export const nodeKindLabels: Record<NodeKind, string> = {
  client: "Client",
  service: "Service",
  queue: "Queue or log",
  data: "Data store",
  external: "External system",
};

function NodeShape({ kind, x, y, tone }: { kind: NodeKind; x: number; y: number; tone: Tone }) {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        className={palette[tone].nodes[kind]}
        strokeWidth="1.25"
        strokeDasharray={dashes[kind]}
        vectorEffect="non-scaling-stroke"
      />
      {kind === "data" && (
        <path
          d={`M${x} ${y + NODE_H - 6}h${NODE_W}`}
          className={palette[tone].rule}
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </>
  );
}

export function SystemDiagram({
  diagram,
  label,
  tone = "paper",
  className,
}: {
  diagram: Diagram;
  label: string;
  tone?: Tone;
  className?: string;
}) {
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  const colors = palette[tone];

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={label} className={className} fill="none">
      {diagram.edges.map(([fromId, toId]) => {
        const { d, end } = route(byId.get(fromId)!, byId.get(toId)!);
        return (
          <g key={`${fromId}-${toId}`}>
            <path d={d} className={colors.edge} strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
            <rect x={end.x - 3} y={end.y - 3} width="6" height="6" className={colors.joint} />
          </g>
        );
      })}
      {diagram.nodes.map((node) => {
        const c = center(node);
        return (
          <g key={node.id}>
            <NodeShape kind={node.kind} tone={tone} x={c.x - NODE_W / 2} y={c.y - NODE_H / 2} />
            <text
              x={c.x}
              y={c.y - (node.kind === "data" ? 2 : 0)}
              textAnchor="middle"
              dominantBaseline="central"
              className={colors.text}
              fontSize="15"
              letterSpacing="-0.2"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DiagramLegend({ tone = "paper" }: { tone?: Tone }) {
  return (
    <ul
      className={`flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6875rem] tracking-[0.1em] uppercase ${
        tone === "panel" ? "text-panel-muted" : "text-muted"
      }`}
    >
      {(Object.keys(nodeKindLabels) as NodeKind[]).map((kind) => (
        <li key={kind} className="flex items-center gap-2">
          <svg viewBox={`-2 -2 ${NODE_W + 4} ${NODE_H + 4}`} className="h-3.5 w-10" aria-hidden="true" fill="none">
            <NodeShape kind={kind} tone={tone} x={0} y={0} />
          </svg>
          {nodeKindLabels[kind]}
        </li>
      ))}
    </ul>
  );
}
