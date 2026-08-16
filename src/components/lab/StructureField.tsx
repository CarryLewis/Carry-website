"use client";

import { cn } from "@/lib/cn";
import {
  STRUCTURE_EDGES,
  STRUCTURES,
  type InformationStructure,
} from "@/data/lab-catalog";

type StructureFieldProps = {
  active: InformationStructure;
  onSelect: (id: InformationStructure) => void;
};

const W = 640;
const H = 280;

/**
 * Neighborhood map of information structures.
 * Distance is relatedness; the selected node lights its edges.
 * This is the atlas overview — the table below is the readable index.
 */
export function StructureField({ active, onSelect }: StructureFieldProps) {
  const nodeById = Object.fromEntries(STRUCTURES.map((n) => [n.id, n]));

  return (
    <div className="relative overflow-hidden border border-rule bg-surface-sunken">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative h-[220px] w-full md:h-[280px]"
        role="img"
        aria-label="Map of information structures. Selecting a node focuses its specimen."
      >
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
                lit ? "var(--color-accent-muted)" : "var(--color-rule)"
              }
              strokeWidth={lit ? 1.25 : 1}
            />
          );
        })}
        {STRUCTURES.map((node) => {
          const cx = node.x * W;
          const cy = node.y * H;
          const selected = node.id === active;
          return (
            <g key={node.id}>
              <circle
                cx={cx}
                cy={cy}
                r={selected ? 14 : 11}
                fill="transparent"
                className="cursor-pointer"
                onClick={() => onSelect(node.id)}
              >
                <title>{`${node.label} → ${node.form}`}</title>
              </circle>
              <circle
                cx={cx}
                cy={cy}
                r={selected ? 6 : 4}
                fill={
                  selected ? "var(--color-accent)" : "var(--color-panel)"
                }
                stroke={
                  selected
                    ? "var(--color-accent)"
                    : "var(--color-rule-strong)"
                }
                strokeWidth="1"
                className="pointer-events-none"
              />
              <text
                x={cx + 10}
                y={cy - 10}
                fill={
                  selected ? "var(--color-ink)" : "var(--color-ink-tertiary)"
                }
                fontSize="10"
                fontFamily="var(--font-sans)"
                letterSpacing="0.06em"
                className="pointer-events-none uppercase"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-lab-2 border-t border-rule px-lab-4 py-lab-3">
        {STRUCTURES.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => onSelect(node.id)}
            className={cn(
              "font-sans text-label uppercase transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              node.id === active
                ? "text-accent"
                : "text-ink-tertiary hover:text-ink",
            )}
          >
            {node.label}
          </button>
        ))}
      </div>
    </div>
  );
}
