import type { Exploration } from "@/domain/entities";

/**
 * Current intellectual focus for the Observatory.
 * Shape is CMS/Notion-ready: stable ids, slugs, status, domains.
 */
export const explorations: Exploration[] = [
  {
    id: "exp-cardiac-simulation",
    kind: "exploration",
    slug: "cardiac-simulation-engine",
    title: "Cardiac Simulation Engine",
    domain: "Computational Medicine",
    summary:
      "Modeling cardiac electrophysiology to connect cellular mechanisms with clinical ECG signals.",
    projectStatus: "active",
    status: "active",
    fields: ["Electrophysiology", "Simulation", "ECG"],
    href: "/projects/active/cardiac-simulation-engine",
    createdAt: "2025-09-01",
    updatedAt: "2026-07-20",
  },
  {
    id: "exp-clinical-reasoning-ai",
    kind: "exploration",
    slug: "clinical-reasoning-ai",
    title: "Clinical Reasoning AI",
    domain: "Medical Education + AI Agents",
    summary:
      "Investigating how agent architectures can approximate diagnostic reasoning for medical learning.",
    projectStatus: "prototype",
    status: "prototype",
    fields: ["Clinical Reasoning", "Agents", "Education"],
    href: "/projects/prototype/clinical-reasoning-ai",
    createdAt: "2025-11-12",
    updatedAt: "2026-07-18",
  },
  {
    id: "exp-knowledge-os",
    kind: "exploration",
    slug: "personal-knowledge-os",
    title: "Personal Knowledge OS",
    domain: "Information Systems",
    summary:
      "A personal operating system for accumulating, relating, and retrieving intellectual work over time.",
    projectStatus: "active",
    status: "active",
    fields: ["Knowledge Graphs", "Systems Design", "Research Ops"],
    href: "/projects/active/personal-knowledge-os",
    createdAt: "2025-06-01",
    updatedAt: "2026-07-22",
  },
];
