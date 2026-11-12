import type { Project } from "@/domain/entities";
import labwiseProject from "../../content/projects/lab-report-assistant.json";

/**
 * Projects — things being built.
 * Source of truth for project routes and related Focus / Questions / Concepts.
 */
export const projects: Project[] = [
  labwiseProject as Project,
  {
    id: "proj-ecg-simulator",
    slug: "ecg-simulator",
    title: "ECG Simulator 2.0",
    summary:
      "ECG Simulator 2.0 connects 3D cardiac anatomy with live 12-lead ECG and pathology scenarios. It preserves the 1.0 settings and layout, with synchronized pause/resume, lead selection and clearer feedback.",
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
      "Version 2.0 is live on this website. All 1.0 settings, defaults and layout are preserved. Click the live status badge to pause or resume the heart and ECG together; select a lead or structure to locate it in the linked view. Rhythm-specific feedback has been corrected. The original 1.0 source remains available separately.",
    demoUrl: "/ecg-simulator/",
    repoUrl: "https://github.com/CarryLewis/ECG-stimulator",
    resourceLinks: [
      { label: "2.0 source", href: "https://github.com/CarryLewis/ECG-stimulator/tree/release/2.0" },
      { label: "1.0 original source", href: "https://github.com/CarryLewis/ECG-stimulator/tree/release/1.0" },
    ],
    createdAt: "2025-09-01",
    updatedAt: "2026-11-12",
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
    id: "proj-knowledge-bridge",
    slug: "personal-knowledge-bridge",
    title: "Personal Knowledge Bridge",
    summary: "A personal note workflow: capture thinking in Notion, keep reading excerpts in Yinxiang Biji, and revisit explicit connections in Obsidian.",
    problem: "How can a new reading help me return to an earlier question and reconsider what I thought?",
    architecture: "A read-only Notion integration turns saved records into local Obsidian Markdown. Explicit themes and confirmed note relationships become links. Excerpt selection and reflection remain human steps.",
    status: "active",
    technology: ["Python", "Notion API", "Obsidian", "Markdown", "SQLite"],
    relatedResearchIds: [],
    relatedConceptIds: ["concept-human-systems", "concept-technology", "concept-philosophy"],
    designPhilosophy: "Keep my own words and the sources I read. Use links to find material, then reread it to decide whether the connection is meaningful. Return new understanding to the original record.",
    implementation: "One-way Notion → Obsidian sync is implemented. The website offers an illustrative interactive walkthrough; it does not access private notes or run the sync tool. Bulk import, continuous sync and Obsidian → Notion writeback remain planned.",
    showcaseUrl: "/knowledge-bridge/",
    repoUrl: "https://github.com/CarryLewis/personal-knowledge-bridge",
    createdAt: "2026-11-09",
    updatedAt: "2026-11-12",
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
      "Versioned HTML/CSS/JS experiments by category; patterns extracted from references; a Structure Bench on this site maps structure → form → live specimen. Source lab shell is copied from CarryLewis/HTML-Design-Lab.",
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
      "Structure Bench at /lab/ (field → live specimen → dossier). Isolated experiments vendored to /html-design-lab/ from the HTML-Design-Lab tip pinned in html-design-lab-embed.ref. Constitution as HTML: /html-design-lab/guide.html.",
    demoUrl: "/html-design-lab/",
    showcaseUrl: "/lab/",
    repoUrl: "https://github.com/CarryLewis/HTML-Design-Lab",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-20",
  },
];

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id);
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
