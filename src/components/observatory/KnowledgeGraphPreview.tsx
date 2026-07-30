"use client";

import type { KnowledgeGraphPreview as GraphData } from "@/domain/entities";

type KnowledgeGraphPreviewProps = {
  graph: GraphData;
};

/**
 * Static neighborhood preview with calm edge-draw motion.
 * Architecture-ready for future interactive / graph-DB backed viz.
 */
export function KnowledgeGraphPreview({ graph }: KnowledgeGraphPreviewProps) {
  const width = 640;
  const height = 360;
  const pad = 48;

  const positioned = graph.nodes.map((node) => ({
    ...node,
    px: pad + node.x * (width - pad * 2),
    py: pad + node.y * (height - pad * 2),
  }));

  const byId = Object.fromEntries(positioned.map((n) => [n.id, n]));

  return (
    <div className="overflow-hidden border border-rule bg-surface-sunken">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Knowledge graph preview centered on Human Systems"
      >
        <defs>
          <pattern
            id="lab-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="var(--color-grid)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#lab-grid)" />

        {graph.edges.map((edge, i) => {
          const from = byId[edge.from];
          const to = byId[edge.to];
          if (!from || !to) return null;
          const length = Math.hypot(to.px - from.px, to.py - from.py);
          return (
            <line
              key={edge.id}
              x1={from.px}
              y1={from.py}
              x2={to.px}
              y2={to.py}
              stroke="var(--color-rule-strong)"
              strokeWidth="1"
              strokeDasharray={length}
              strokeDashoffset={length}
              className="constellation-edge"
              style={{ animationDelay: `${150 + i * 100}ms` }}
            />
          );
        })}

        {positioned.map((node, i) => {
          const isCenter = node.id === graph.centerId;
          const r = isCenter ? 10 : 6 + node.weight * 2;
          return (
            <g
              key={node.id}
              className="constellation-node"
              style={{ animationDelay: `${280 + i * 90}ms` }}
            >
              <circle
                cx={node.px}
                cy={node.py}
                r={r}
                fill={
                  isCenter ? "var(--color-accent-soft)" : "var(--color-panel)"
                }
                stroke={
                  isCenter ? "var(--color-accent)" : "var(--color-rule-strong)"
                }
                strokeWidth="1.5"
              />
              <text
                x={node.px}
                y={node.py + r + 16}
                textAnchor="middle"
                fill="var(--color-ink-secondary)"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: isCenter ? 13 : 11,
                  letterSpacing: "0.04em",
                }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
