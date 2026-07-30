"use client";

/**
 * Subtle information constellation for the Observatory hero.
 * Slow edge-draw + node settle — scientific, not decorative spectacle.
 */
export function HeroConstellation() {
  const nodes = [
    { cx: 80, cy: 70, r: 3.5 },
    { cx: 160, cy: 40, r: 2.5 },
    { cx: 240, cy: 90, r: 4 },
    { cx: 120, cy: 150, r: 2.5 },
    { cx: 200, cy: 170, r: 3 },
    { cx: 280, cy: 130, r: 2.5 },
    { cx: 60, cy: 200, r: 2 },
    { cx: 300, cy: 50, r: 2 },
    { cx: 180, cy: 110, r: 5 },
  ];

  const edges: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [2, 5],
    [4, 5],
    [3, 6],
    [1, 8],
    [8, 4],
    [2, 7],
    [8, 2],
  ];

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden border border-rule bg-surface-sunken"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <svg
        viewBox="0 0 360 240"
        className="relative h-full w-full"
        role="presentation"
      >
        {edges.map(([a, b], i) => {
          const from = nodes[a];
          const to = nodes[b];
          const length = Math.hypot(to.cx - from.cx, to.cy - from.cy);
          return (
            <line
              key={`e-${i}`}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="var(--color-rule-strong)"
              strokeWidth="1"
              strokeDasharray={length}
              strokeDashoffset={length}
              className="constellation-edge"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          );
        })}
        {nodes.map((node, i) => (
          <circle
            key={`n-${i}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={i === 8 ? "var(--color-accent)" : "var(--color-panel)"}
            stroke={
              i === 8 ? "var(--color-accent)" : "var(--color-rule-strong)"
            }
            strokeWidth="1"
            className="constellation-node"
            style={{ animationDelay: `${200 + i * 80}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}
