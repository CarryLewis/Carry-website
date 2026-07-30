import type { Signal } from "@/domain/entities";

/**
 * Information Radar — external information signals.
 * Compatible with future RSS / AI ingest adapters.
 */
export const signals: Signal[] = [
  {
    id: "sig-001",
    slug: "cardiac-digital-twins",
    title: "Cardiac digital twins move closer to bedside decision support",
    summary:
      "Recent work links patient-specific electrophysiology models with clinical imaging pipelines.",
    category: "medical-intelligence",
    importance: "high",
    source: "Literature radar",
    date: "2026-07-24",
    relatedTopicIds: [
      "concept-ecg-generation",
      "concept-medicine",
      "proj-cardiac-simulation",
      "q-ecg-conduction",
    ],
    createdAt: "2026-07-24",
    updatedAt: "2026-07-24",
  },
  {
    id: "sig-002",
    slug: "agentic-clinical-tutors",
    title: "Agentic tutors begin evaluating multi-step diagnostic traces",
    summary:
      "New prototypes score intermediate clinical hypotheses, not only final answers.",
    category: "ai-intelligence",
    importance: "high",
    source: "AI development watch",
    date: "2026-07-21",
    relatedTopicIds: [
      "concept-ai",
      "concept-medicine",
      "proj-clinical-reasoning-ai",
      "q-clinical-reasoning",
    ],
    createdAt: "2026-07-21",
    updatedAt: "2026-07-21",
  },
  {
    id: "sig-003",
    slug: "local-knowledge-graphs",
    title: "Personal knowledge graphs re-emerge as research infrastructure",
    summary:
      "Tooling trends favor local-first graphs with exportable relation schemas.",
    category: "technology",
    importance: "medium",
    source: "Technology trends",
    date: "2026-07-18",
    relatedTopicIds: [
      "concept-technology",
      "concept-human-systems",
      "proj-knowledge-os",
    ],
    createdAt: "2026-07-18",
    updatedAt: "2026-07-18",
  },
];
