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

const W = 320;
const H = 260;

/**
 * Neighborhood map of information structures.
 * Distance is relatedness; selecting a node lights its neighborhood
 * and dims the rest — the atlas overview, not decoration.
 */
export function StructureField({
  active,
  onSelect,
  available,
}: StructureFieldProps) {
  const nodeById = Object.fromEntries(STRUCTURES.map((n) => [n.id, n]));
  const neighborhood = neighboringStructures(active);

  return (
    <div className="relative overflow-hidden bg-surface-sunken">
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
        className="relative h-[200px] w-full lg:h-[220px]"
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
              opacity={lit ? 1 : 0.35}
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
          const labelX = side === "left" ? cx - 10 : cx + 10;
          const textAnchor = side === "left" ? "end" : "start";
          const fill = selected
            ? "var(--color-accent)"
            : near
              ? "var(--color-panel)"
              : "var(--color-surface)";
          const stroke = selected
            ? "var(--color-accent)"
            : near
              ? "var(--color-rule-strong)"
              : "var(--color-rule)";
          const labelFill = selected
            ? "var(--color-ink)"
            : near
              ? "var(--color-ink-secondary)"
              : "var(--color-ink-faint)";

          return (
            <g
              key={node.id}
              opacity={inFilter ? 1 : 0.28}
              className={cn(inFilter ? "cursor-pointer" : "cursor-default")}
              onClick={() => {
                if (inFilter) onSelect(node.id);
              }}
            >
              <circle cx={cx} cy={cy} r={16} fill="transparent">
                <title>{`${node.label} → ${node.form}`}</title>
              </circle>
              <circle
                cx={cx}
                cy={cy}
                r={selected ? 6 : 4}
                fill={fill}
                stroke={stroke}
                strokeWidth="1"
                className="pointer-events-none"
              />
              <text
                x={labelX}
                y={cy - 8}
                fill={labelFill}
                fontSize="9"
                fontFamily="var(--font-sans)"
                letterSpacing="0.06em"
                textAnchor={textAnchor}
                className="pointer-events-none uppercase"
              >
                {node.label}
              </text>
              <text
                x={labelX}
                y={cy + 5}
                fill={
                  selected
                    ? "var(--color-accent)"
                    : "var(--color-ink-faint)"
                }
                fontSize="8"
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
        className="flex flex-wrap gap-lab-2 border-t border-rule px-lab-3 py-lab-2"
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
                "font-sans text-label uppercase transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40",
                selected ? "text-accent" : "text-ink-tertiary hover:text-ink",
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
