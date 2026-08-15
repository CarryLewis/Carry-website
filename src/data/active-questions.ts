import type { ActiveQuestion } from "@/domain/entities";

/**
 * Active Questions — current research questions (not finished achievements).
 * Displayed on Homepage, Research, Knowledge graph.
 */
export const activeQuestions: ActiveQuestion[] = [
  {
    id: "q-ecg-conduction",
    slug: "ecg-conduction",
    question: "How does electrical conduction create ECG signals?",
    category: "computational-medicine",
    relatedConceptIds: [
      "concept-action-potential",
      "concept-sa-node",
      "concept-av-node",
      "concept-ecg-generation",
      "concept-medicine",
      "concept-biology",
    ],
    relatedProjectIds: ["proj-ecg-simulator"],
    createdAt: "2025-09-15",
    status: "active",
    href: "/research/computational-medicine/ecg-conduction",
  },
  {
    id: "q-clinical-reasoning",
    slug: "clinical-reasoning-ai",
    question: "How can AI simulate clinical reasoning?",
    category: "future-medicine",
    relatedConceptIds: [
      "concept-ai",
      "concept-medicine",
      "concept-philosophy",
      "concept-human-systems",
    ],
    relatedProjectIds: ["proj-clinical-reasoning-ai", "proj-knowledge-os"],
    createdAt: "2025-11-20",
    status: "active",
    href: "/research/future-medicine/clinical-reasoning-ai",
  },
  {
    id: "q-bio-to-compute",
    slug: "mechanism-to-model",
    question: "How can biological mechanisms become computational models?",
    category: "biomedical-systems",
    relatedConceptIds: [
      "concept-biology",
      "concept-medicine",
      "concept-ai",
      "concept-human-systems",
    ],
    relatedProjectIds: ["proj-ecg-simulator", "proj-knowledge-os", "proj-research-brief"],
    createdAt: "2025-08-01",
    status: "active",
    href: "/research/biomedical-systems/mechanism-to-model",
  },
];
