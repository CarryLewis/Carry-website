"use client";

import { cn } from "@/lib/cn";
import {
  STRUCTURE_EDGES,
  STRUCTURES,
  neighboringStructures,
  type InformationStructure,
} from "@/data/lab-catalog";

type StructureFieldProps = {
  active: InformationStructure;
  onSelect: (id: InformationStructure) => void;
  available?: Set<InformationStructure>;
};

const W = 640;
const H = 320;

/**
 * Neighborhood map of information structures.
 * Same sunken-figure language as the Observatory knowledge graph.
 */
export function StructureField({
  active,
  onSelect,
  available,
}: StructureFieldProps) {
  const nodeById = Object.fromEntries(STRUCTURES.map((n) => [n.id, n]));
  const neighborhood = neighboringStructures(active);

  return (
    <div className="overflow-hidden border border-rule bg-surface-sunken">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Map of information structures. Selecting a node opens its specimen."
      >
        <defs>
          <pattern
            id="lab-structure-grid"
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
        <rect width={W} height={H} fill="url(#lab-structure-grid)" />
        {STRUCTURE_EDGES.map(([fromId, toId]) => {
          const from = nodeById[fromId];
          const to = nodeById[toId];
          const lit = fromId === active || toId === active;
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x * W}
              y1={from.y * H}
              x2={to.x * W}
              y2={to.y * H}
              stroke={
                lit ? "var(--color-accent-muted)" : "var(--color-rule-strong)"
              }
              strokeWidth={lit ? 1.5 : 1}
              opacity={lit ? 1 : 0.45}
            />
          );
        })}
        {STRUCTURES.map((node) => {
          const cx = node.x * W;
          const cy = node.y * H;
          const selected = node.id === active;
          const near = neighborhood.has(node.id);
          const inFilter = !available || available.has(node.id);
          const side = node.labelSide ?? "right";
          const labelX = side === "left" ? cx - 12 : cx + 12;
          const textAnchor = side === "left" ? "end" : "start";

          return (
            <g
              key={node.id}
              opacity={inFilter ? 1 : 0.28}
              className={cn(inFilter ? "cursor-pointer" : "cursor-default")}
              onClick={() => {
                if (inFilter) onSelect(node.id);
              }}
            >
              <circle cx={cx} cy={cy} r={18} fill="transparent">
                <title>{`${node.label} → ${node.form}`}</title>
              </circle>
              <circle
                cx={cx}
                cy={cy}
                r={selected ? 8 : 5}
                fill={
                  selected
                    ? "var(--color-accent-soft)"
                    : near
                      ? "var(--color-panel)"
                      : "var(--color-surface)"
                }
                stroke={
                  selected
                    ? "var(--color-accent)"
                    : near
                      ? "var(--color-rule-strong)"
                      : "var(--color-rule)"
                }
                strokeWidth="1.5"
                className="pointer-events-none"
              />
              <text
                x={labelX}
                y={cy - 6}
                fill={
                  selected
                    ? "var(--color-ink)"
                    : near
                      ? "var(--color-ink-secondary)"
                      : "var(--color-ink-faint)"
                }
                fontSize="11"
                fontFamily="var(--font-sans)"
                letterSpacing="0.04em"
                textAnchor={textAnchor}
                className="pointer-events-none"
              >
                {node.label}
              </text>
              <text
                x={labelX}
                y={cy + 9}
                fill={
                  selected ? "var(--color-accent)" : "var(--color-ink-faint)"
                }
                fontSize="10"
                fontFamily="var(--font-mono)"
                textAnchor={textAnchor}
                className="pointer-events-none"
              >
                {node.form}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        className="flex flex-wrap gap-lab-4 border-t border-rule px-lab-4 py-lab-3"
        role="toolbar"
        aria-label="Information structures"
      >
        {STRUCTURES.map((node) => {
          const inFilter = !available || available.has(node.id);
          const selected = node.id === active;
          return (
            <button
              key={node.id}
              type="button"
              disabled={!inFilter}
              onClick={() => onSelect(node.id)}
              className={cn(
                "font-sans text-meta transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40",
                selected ? "text-ink" : "text-ink-secondary hover:text-ink",
              )}
            >
              {node.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
