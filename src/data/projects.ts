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
      "Interactive physiology & ECG learning simulator — 3D cardiac anatomy, bilingual UI, shared dipole → 12-lead projection, and pathology scenarios (block, AF/flutter, VF/flutter, MI).",
    problem:
      "How can we connect tissue-level conduction models to interpretable clinical ECG waveforms — including disease states — without hardcoding lead millivolts?",
    architecture:
      "Physiology packs emit effects → PhysiologicalModel → CyclePlan → shared dipole sampler that drives both 3D heart glow and live 12-lead ECG. Bilingual 中文/English chrome. Scenarios: sinus, conduction block, AF/flutter, VF/flutter, MI.",
    status: "active",
    technology: [
      "TypeScript",
      "React",
      "Three.js",
      "Vite",
      "Dipole → 12-lead ECG",
      "Disease simulation packs",
      "i18n (中文 / English)",
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
      "Prefer mechanistic clarity over black-box accuracy; diseases never hardcode waveforms — they alter physiology once, and glow + ECG update together.",
    implementation:
      "Embedded build from CarryLewis/ECG-stimulator @ cursor/pathology-ecg-models-fab9 (fd2a781). ECG main was reverted to anatomy-only (#23); site tracks the pathology tip until a new consolidation lands.",
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
  {
    id: "proj-research-brief",
    slug: "research-brief",
    title: "Research Brief",
    summary:
      "Personal observatory pipeline — Notion Thinking Vault as input, Obsidian as memory/graph, public MUJI homepage as the projection on this site.",
    problem:
      "How can captured reading and thinking become a durable, public, graph-linked research memory?",
    architecture:
      "Content Lake + Knowledge Objects + one-way Notion → vault/Thinking sync. Public HTML is the MUJI Observatory homepage in frontend/, copied onto carrylewis.com.",
    status: "active",
    technology: [
      "Python",
      "Notion API",
      "Obsidian",
      "Quartz",
      "GitHub Actions",
      "Static HTML/CSS",
    ],
    relatedResearchIds: ["q-bio-to-compute"],
    relatedConceptIds: [
      "concept-human-systems",
      "concept-technology",
      "concept-ai",
      "concept-philosophy",
    ],
    relatedSignalIds: ["sig-003"],
    designPhilosophy:
      "Notion is the input layer; Obsidian is the memory/graph layer; the website is the public projection.",
    implementation:
      "Embedded MUJI homepage from CarryLewis/research_brief frontend/. Source tip pinned in research-brief-embed.ref (cursor/muji-homepage-prototype-5c8e @ 8bfa32e).",
    demoUrl: "/research-brief/",
    repoUrl: "https://github.com/CarryLewis/research_brief",
    createdAt: "2026-07-01",
    updatedAt: "2026-08-15",
  },
  {
    id: "proj-html-design-lab",
    slug: "html-design-lab",
    title: "HTML Design Lab",
    summary:
      "A laboratory of isolated HTML visual systems — experiments filed by information structure, so form can be chosen from the shape of the knowledge rather than from fashion.",
    problem:
      "How should the structure of information determine its visual form — so that interaction makes a mechanism visible, instead of decorating a page?",
    architecture:
      "Versioned HTML/CSS/JS experiments by category; patterns extracted from references; a Structure Atlas on this site maps structure → form → live specimen. Source lab shell is copied from CarryLewis/HTML-Design-Lab.",
    status: "active",
    technology: [
      "HTML",
      "CSS",
      "JavaScript",
      "SVG",
      "Design tokens",
      "Pattern library",
    ],
    relatedResearchIds: ["q-bio-to-compute"],
    relatedConceptIds: [
      "concept-human-systems",
      "concept-technology",
      "concept-philosophy",
      "concept-ai",
    ],
    relatedSignalIds: ["sig-003"],
    designPhilosophy:
      "Form follows information structure. Visualization is a decision protocol — name the structure, choose the matching form, then test whether doing makes the mechanism visible. Display is not enough.",
    implementation:
      "Structure Atlas at /lab/ (overview → event → detail). Isolated experiments vendored to /html-design-lab/ from the HTML-Design-Lab foundation tip pinned in html-design-lab-embed.ref.",
    demoUrl: "/html-design-lab/",
    showcaseUrl: "/lab/",
    repoUrl: "https://github.com/CarryLewis/HTML-Design-Lab",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-16",
  },
];

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
