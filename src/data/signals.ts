import type { Signal } from "@/domain/entities";

/**
 * Latest observations for the Signals radar preview.
 * Compatible with future RSS / AI ingest adapters.
 */
export const signals: Signal[] = [
  {
    id: "sig-001",
    kind: "signal",
    slug: "cardiac-digital-twins",
    title: "Cardiac digital twins move closer to bedside decision support",
    summary:
      "Recent work links patient-specific electrophysiology models with clinical imaging pipelines.",
    category: "medical-intelligence",
    importance: "high",
    source: "Literature radar",
    observedAt: "2026-07-24",
    createdAt: "2026-07-24",
    updatedAt: "2026-07-24",
    status: "active",
  },
  {
    id: "sig-002",
    kind: "signal",
    slug: "agentic-clinical-tutors",
    title: "Agentic tutors begin evaluating multi-step diagnostic traces",
    summary:
      "New prototypes score intermediate clinical hypotheses, not only final answers.",
    category: "ai-intelligence",
    importance: "high",
    source: "AI development watch",
    observedAt: "2026-07-21",
    createdAt: "2026-07-21",
    updatedAt: "2026-07-21",
    status: "active",
  },
  {
    id: "sig-003",
    kind: "signal",
    slug: "local-knowledge-graphs",
    title: "Personal knowledge graphs re-emerge as research infrastructure",
    summary:
      "Tooling trends favor local-first graphs with exportable relation schemas.",
    category: "technology",
    importance: "medium",
    source: "Technology trends",
    observedAt: "2026-07-18",
    createdAt: "2026-07-18",
    updatedAt: "2026-07-18",
    status: "active",
  },
];
