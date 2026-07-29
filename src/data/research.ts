import type { ResearchThread } from "@/domain/entities";

/**
 * Active research questions — threads, not finished achievements.
 * href targets future Research article routes.
 */
export const researchThreads: ResearchThread[] = [
  {
    id: "thread-ecg-conduction",
    question: "How does electrical conduction create ECG signals?",
    category: "computational-medicine",
    href: "/research/computational-medicine/ecg-conduction",
    status: "active",
  },
  {
    id: "thread-clinical-reasoning",
    question: "How can AI simulate clinical reasoning?",
    category: "future-medicine",
    href: "/research/future-medicine/clinical-reasoning-ai",
    status: "active",
  },
  {
    id: "thread-bio-to-compute",
    question: "How can biological mechanisms become computational models?",
    category: "biomedical-systems",
    href: "/research/biomedical-systems/mechanism-to-model",
    status: "active",
  },
];
