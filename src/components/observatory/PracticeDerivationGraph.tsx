"use client";

import Link from "next/link";
import { useCallback, useState, type FocusEvent, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import type { PracticeGraph, PracticeGraphNode } from "@/domain/entities";

type PracticeDerivationGraphProps = {
  graph: PracticeGraph;
  figureCaption: string;
};

const WIDTH = 640;
const HEIGHT = 400;
const PAD_X = 88;
const PAD_Y = 72;

function toPx(node: Pick<PracticeGraphNode, "x" | "y">) {
  return {
    px: PAD_X + node.x * (WIDTH - PAD_X * 2),
    py: PAD_Y + node.y * (HEIGHT - PAD_Y * 2),
  };
}

function percent(node: Pick<PracticeGraphNode, "x" | "y">) {
  const { px, py } = toPx(node);
  return {
    left: `${(px / WIDTH) * 100}%`,
    top: `${(py / HEIGHT) * 100}%`,
  };
}

function touches(edge: { from: string; to: string }, id: string | null) {
  return Boolean(id && (edge.from === id || edge.to === id));
}

/**
 * Interactive derivation: unnamed origin appears, then branches to practice fields.
 * New (emerging) fields join last, with dashed spokes and optional mesh edges.
 */
export function PracticeDerivationGraph({
  graph,
  figureCaption,
}: PracticeDerivationGraphProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const origin = graph.nodes.find((n) => n.id === graph.originId);
  const fields = graph.nodes.filter((n) => n.kind === "field");
  const byId = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
  const active = fields.find((n) => n.id === activeId) ?? null;
  const deriveEdges = graph.edges.filter((edge) => edge.kind !== "mesh");
  const meshEdges = graph.edges.filter((edge) => edge.kind === "mesh");

  const clearIfLeaving = useCallback(
    (event: FocusEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
      const next = event.relatedTarget;
      if (next instanceof Node && event.currentTarget.contains(next)) return;
      setActiveId(null);
    },
    [],
  );

  if (!origin) return null;

  const originPx = toPx(origin);
  const meshDelayBase = 280 + deriveEdges.length * 140 + 200;

  return (
    <div onMouseLeave={clearIfLeaving} onBlur={clearIfLeaving}>
      <div
        className="relative overflow-hidden border border-rule bg-surface-sunken"
        role="group"
        aria-label="Practice field derivation"
      >
        <div className="relative aspect-[8/5] w-full">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <pattern
                id="practice-field-grid"
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
            <rect width={WIDTH} height={HEIGHT} fill="url(#practice-field-grid)" />

            {deriveEdges.map((edge, i) => {
              const from = byId[edge.from];
              const to = byId[edge.to];
              if (!from || !to) return null;
              const a = toPx(from);
              const b = toPx(to);
              const length = Math.hypot(b.px - a.px, b.py - a.py);
              const lit = touches(edge, activeId);
              const emerging = to.status === "emerging";
              return (
                <line
                  key={edge.id}
                  x1={a.px}
                  y1={a.py}
                  x2={b.px}
                  y2={b.py}
                  stroke={
                    lit ? "var(--color-accent)" : "var(--color-rule-strong)"
                  }
                  strokeWidth={lit ? 1.5 : 1}
                  strokeDasharray={emerging ? "5 4" : length}
                  strokeDashoffset={length}
                  className="derive-edge"
                  style={{ animationDelay: `${280 + i * 140}ms` }}
                />
              );
            })}

            {meshEdges.map((edge, i) => {
              const from = byId[edge.from];
              const to = byId[edge.to];
              if (!from || !to) return null;
              const a = toPx(from);
              const b = toPx(to);
              const length = Math.hypot(b.px - a.px, b.py - a.py);
              const lit = touches(edge, activeId);
              return (
                <line
                  key={edge.id}
                  x1={a.px}
                  y1={a.py}
                  x2={b.px}
                  y2={b.py}
                  stroke={lit ? "var(--color-accent)" : "var(--color-rule)"}
                  strokeWidth={lit ? 1.25 : 1}
                  strokeDasharray="3 5"
                  strokeDashoffset={length}
                  className="mesh-edge"
                  style={{ animationDelay: `${meshDelayBase + i * 100}ms` }}
                />
              );
            })}

            {fields.map((node, i) => {
              const { px, py } = toPx(node);
              const lit = activeId === node.id;
              const emerging = node.status === "emerging";
              const r = emerging ? (lit ? 7 : 5) : lit ? 8 : 6;
              return (
                <circle
                  key={node.id}
                  cx={px}
                  cy={py}
                  r={r}
                  fill={
                    lit ? "var(--color-accent-soft)" : "var(--color-panel)"
                  }
                  stroke={
                    lit || emerging
                      ? "var(--color-accent)"
                      : "var(--color-rule-strong)"
                  }
                  strokeWidth="1.5"
                  className="derive-node"
                  style={{ animationDelay: `${680 + i * 140}ms` }}
                />
              );
            })}

            <g className="origin-core">
              <circle
                cx={originPx.px}
                cy={originPx.py}
                r="14"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1"
                className="origin-pulse"
              />
              <circle
                cx={originPx.px}
                cy={originPx.py}
                r="5.5"
                fill="var(--color-accent-soft)"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
              />
            </g>
          </svg>

          <ul className="pointer-events-none absolute inset-0 z-10 m-0 list-none p-0">
            {fields.map((node, i) => {
              const pos = percent(node);
              const lit = activeId === node.id;
              if (!node.href || !node.label) return null;
              const emerging = node.status === "emerging";
              return (
                <li
                  key={node.id}
                  className="derive-label absolute"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    animationDelay: `${820 + i * 140}ms`,
                  }}
                >
                  <Link
                    href={node.href}
                    aria-label={
                      emerging
                        ? `${node.label} field summary, new`
                        : `${node.label} field summary`
                    }
                    aria-describedby={lit ? "practice-field-probe" : undefined}
                    onMouseEnter={() => setActiveId(node.id)}
                    onFocus={() => setActiveId(node.id)}
                    className="pointer-events-auto absolute left-0 top-0 flex -translate-x-1/2 -translate-y-6 cursor-pointer flex-col items-center px-lab-2 pb-lab-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <span className="block size-12 shrink-0" aria-hidden />
                    <span
                      className={cn(
                        "whitespace-nowrap font-sans text-meta tracking-[0.06em] transition-colors duration-fast ease-lab",
                        lit ? "text-ink" : "text-ink-secondary",
                      )}
                    >
                      {node.label}
                    </span>
                    {emerging ? (
                      <span className="mt-lab-1 font-sans text-label uppercase tracking-[0.08em] text-accent">
                        new
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="mt-lab-3 font-mono text-code text-ink-faint">
        {figureCaption}
      </p>

      <div
        id="practice-field-probe"
        className="mt-lab-5 min-h-[7.5rem] border border-rule bg-surface-raised px-lab-5 py-lab-4"
        aria-live="polite"
      >
        {active ? (
          <div>
            <p className="font-sans text-label uppercase text-ink-tertiary">
              {active.label}
              {active.status === "emerging" ? " · new" : ""}
            </p>
            <p className="mt-lab-2 max-w-prose font-sans text-body-ui text-ink">
              {active.summary}
            </p>
            {active.href ? (
              <Link
                href={active.href}
                className="mt-lab-3 inline-flex font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Open {active.label} summary →
              </Link>
            ) : null}
          </div>
        ) : (
          <p className="font-sans text-meta text-ink-tertiary">
            Hover or focus a field. The origin has no name — only the plates in
            practice do. Click a node to enter its summary. New domains join as
            dashed nodes on the ring.
          </p>
        )}
      </div>
    </div>
  );
}
