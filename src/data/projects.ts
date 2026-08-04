import type { Project } from "@/domain/entities";

/**
 * Projects — things being built.
 * Source of truth for project routes and related Focus / Questions / Concepts.
 */
export const projects: Project[] = [
  {
    id: "proj-ecg-simulator",
    slug: "ecg-simulator",
    title: "ECG Simulator",
    summary:
      "Interactive physiology & ECG learning simulator — 3D cardiac anatomy as the biological source model for ECG generation.",
    problem:
      "How can we connect ion-channel and tissue-level conduction models to interpretable ECG waveforms?",
    architecture:
      "Modular simulation pipeline: cell models → tissue conduction → body-surface potential → ECG synthesis. Interactive 3D anatomy viewport in the browser.",
    status: "active",
    technology: [
      "TypeScript",
      "React",
      "Three.js",
      "Vite",
      "Numerical simulation",
      "Electrophysiology models",
    ],
    relatedResearchIds: ["q-ecg-conduction", "q-bio-to-compute"],
    relatedConceptIds: [
      "concept-action-potential",
      "concept-sa-node",
      "concept-av-node",
      "concept-ecg-generation",
      "concept-medicine",
      "concept-biology",
    ],
    relatedSignalIds: ["sig-001"],
    designPhilosophy:
      "Prefer mechanistic clarity over black-box accuracy; every waveform stage must be inspectable.",
    demoUrl: "/ecg-simulator/",
    repoUrl: "https://github.com/CarryLewis/ECG-stimulator",
    createdAt: "2025-09-01",
    updatedAt: "2026-08-04",
  },
  {
    id: "proj-clinical-reasoning-ai",
    slug: "clinical-reasoning-ai",
    title: "Clinical Reasoning AI",
    summary:
      "Investigating how agent architectures can approximate diagnostic reasoning for medical learning.",
    problem:
      "How can AI systems expose intermediate clinical hypotheses rather than only final answers?",
    architecture:
      "Multi-agent tutor loop: case intake → differential generation → evidence critique → teaching trace.",
    status: "prototype",
    technology: ["LLM agents", "Medical education", "Trace evaluation"],
    relatedResearchIds: ["q-clinical-reasoning"],
    relatedConceptIds: [
      "concept-ai",
      "concept-medicine",
      "concept-philosophy",
      "concept-human-systems",
    ],
    relatedSignalIds: ["sig-002"],
    createdAt: "2025-11-12",
    updatedAt: "2026-07-18",
  },
  {
    id: "proj-knowledge-os",
    slug: "personal-knowledge-os",
    title: "Personal Knowledge OS",
    summary:
      "A personal operating system for accumulating, relating, and retrieving intellectual work over time.",
    problem:
      "How can long-term intellectual work stay connected across research, projects, and signals?",
    architecture:
      "Entity graph + repository adapters + Observatory surfaces; Notion/CMS/agent writes later.",
    status: "active",
    technology: ["Next.js", "Knowledge graphs", "Content adapters"],
    relatedResearchIds: ["q-bio-to-compute", "q-clinical-reasoning"],
    relatedConceptIds: [
      "concept-human-systems",
      "concept-ai",
      "concept-philosophy",
      "concept-technology",
    ],
    relatedSignalIds: ["sig-003"],
    createdAt: "2025-06-01",
    updatedAt: "2026-07-22",
  },
];

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
