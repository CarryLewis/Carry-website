import type { IntellectualFocus } from "@/domain/entities";

/**
 * Intellectual Focus — current major areas of exploration.
 * Displayed on Homepage, About, Research overview.
 */
export const intellectualFocus: IntellectualFocus[] = [
  {
    id: "focus-cardiac-simulation",
    slug: "cardiac-simulation-engine",
    title: "Cardiac Simulation Engine",
    description:
      "Modeling cardiac electrophysiology to connect cellular mechanisms with clinical ECG signals.",
    domain: "Computational Medicine",
    status: "active",
    priority: "p0",
    relatedProjectIds: ["proj-ecg-simulator"],
    relatedQuestionIds: ["q-ecg-conduction", "q-bio-to-compute"],
    relatedConceptIds: [
      "concept-ecg-generation",
      "concept-action-potential",
      "concept-medicine",
    ],
    fields: ["Electrophysiology", "Simulation", "ECG"],
    createdAt: "2025-09-01",
    updatedAt: "2026-07-20",
  },
  {
    id: "focus-clinical-reasoning-ai",
    slug: "clinical-reasoning-ai",
    title: "Clinical Reasoning AI",
    description:
      "Investigating how agent architectures can approximate diagnostic reasoning for medical learning.",
    domain: "Medical Education + AI Agents",
    status: "prototype",
    priority: "p0",
    relatedProjectIds: ["proj-clinical-reasoning-ai"],
    relatedQuestionIds: ["q-clinical-reasoning"],
    relatedConceptIds: ["concept-ai", "concept-medicine", "concept-human-systems"],
    fields: ["Clinical Reasoning", "Agents", "Education"],
    createdAt: "2025-11-12",
    updatedAt: "2026-07-18",
  },
  {
    id: "focus-knowledge-os",
    slug: "personal-knowledge-os",
    title: "Personal Knowledge OS",
    description:
      "A personal operating system for accumulating, relating, and retrieving intellectual work over time.",
    domain: "Information Systems",
    status: "active",
    priority: "p1",
    relatedProjectIds: ["proj-knowledge-os"],
    relatedQuestionIds: ["q-bio-to-compute"],
    relatedConceptIds: [
      "concept-human-systems",
      "concept-technology",
      "concept-philosophy",
    ],
    fields: ["Knowledge Graphs", "Systems Design", "Research Ops"],
    createdAt: "2025-06-01",
    updatedAt: "2026-07-22",
  },
];
