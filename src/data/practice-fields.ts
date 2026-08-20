import type { PracticeField } from "@/domain/entities";

/**
 * Practice fields — plates currently being worked, each with a site summary page.
 * The Observatory derivation graph is built from this module, not from abstract concepts.
 *
 * Add a field:
 * 1. Copy the template at the bottom of this comment into the array.
 * 2. Set `status: "emerging"` for a new display domain (dashed spoke, New mark).
 * 3. Set `connectedFieldIds` to existing field ids to weave it into the mesh.
 * 4. Omit `layout` to occupy the next free slot on the origin ring.
 * 5. Fill vaults / related* ids when the site has something to show.
 *
 * Example (not loaded — paste into the array when the domain is real):
 *
 * {
 *   id: "field-neuroscience",
 *   slug: "neuroscience",
 *   label: "Neuroscience",
 *   status: "emerging",
 *   summary: "…",
 *   thesis: "…",
 *   connectedFieldIds: ["field-medicine"],
 *   relatedProjectIds: [],
 *   relatedQuestionIds: [],
 *   relatedSignalIds: [],
 *   relatedConceptIds: [],
 *   relatedFocusIds: [],
 *   vaults: [],
 * }
 */
export const practiceFields: PracticeField[] = [
  {
    id: "field-medicine",
    slug: "medicine",
    label: "Medicine",
    status: "active",
    connectedFieldIds: [],
    summary:
      "Clinical study, cardiac electrophysiology, and the medical-basement vault — physiology made inspectable.",
    thesis:
      "Medicine on this site is a working bench: lectures and cases in the basement, a live ECG simulator, and questions about how conduction becomes a waveform.",
    relatedProjectIds: ["proj-ecg-simulator", "proj-clinical-reasoning-ai"],
    relatedQuestionIds: [
      "q-ecg-conduction",
      "q-clinical-reasoning",
      "q-bio-to-compute",
    ],
    relatedSignalIds: ["sig-001", "sig-002"],
    relatedConceptIds: [
      "concept-medicine",
      "concept-biology",
      "concept-ecg-generation",
      "concept-action-potential",
    ],
    relatedFocusIds: ["focus-cardiac-simulation", "focus-clinical-reasoning-ai"],
    vaults: [
      {
        label: "medical basement",
        href: "/knowledge/medical-basement/",
        description:
          "Live Notion mirror — lectures, diseases, drugs, and cases.",
      },
      {
        label: "ECG Simulator",
        href: "/ecg-simulator/",
        description:
          "Interactive physiology and 12-lead projection, including pathology scenarios.",
      },
    ],
    layout: { x: 0.5, y: 0.16 },
  },
  {
    id: "field-ai",
    slug: "ai",
    label: "AI",
    status: "active",
    connectedFieldIds: [],
    summary:
      "Agent architectures for diagnostic traces — reasoning made visible, not only answered.",
    thesis:
      "AI here is not a product surface. It is a research instrument for clinical tutoring, intermediate hypotheses, and the knowledge OS that holds those traces.",
    relatedProjectIds: [
      "proj-clinical-reasoning-ai",
      "proj-knowledge-os",
      "proj-research-brief",
    ],
    relatedQuestionIds: ["q-clinical-reasoning", "q-bio-to-compute"],
    relatedSignalIds: ["sig-002", "sig-003"],
    relatedConceptIds: [
      "concept-ai",
      "concept-philosophy",
      "concept-human-systems",
    ],
    relatedFocusIds: ["focus-clinical-reasoning-ai", "focus-knowledge-os"],
    vaults: [
      {
        label: "Clinical Reasoning AI",
        href: "/projects/prototype/clinical-reasoning-ai/",
        description:
          "Prototype: multi-agent tutor loop that scores intermediate hypotheses.",
      },
    ],
    layout: { x: 0.84, y: 0.46 },
  },
  {
    id: "field-html",
    slug: "html",
    label: "HTML",
    status: "active",
    connectedFieldIds: [],
    summary:
      "Visual form chosen from information structure — isolated HTML experiments on the Structure Bench.",
    thesis:
      "HTML on this site is a laboratory, not a template kit. Experiments are filed by structure (relationship, sequence, process) so interaction can make a mechanism visible.",
    relatedProjectIds: ["proj-html-design-lab"],
    relatedQuestionIds: ["q-bio-to-compute"],
    relatedSignalIds: ["sig-003"],
    relatedConceptIds: [
      "concept-technology",
      "concept-philosophy",
      "concept-human-systems",
    ],
    relatedFocusIds: ["focus-visual-systems"],
    vaults: [
      {
        label: "Structure Bench",
        href: "/lab/",
        description:
          "Designed viewing surface — pick a structure, load a live specimen.",
      },
      {
        label: "HTML Design Lab shell",
        href: "/html-design-lab/",
        description: "Source gallery, constitution, and experiment index.",
      },
    ],
    layout: { x: 0.16, y: 0.46 },
  },
  {
    id: "field-knowledge",
    slug: "systems",
    label: "Knowledge",
    status: "active",
    connectedFieldIds: [],
    summary:
      "A personal operating system for capturing, relating, and projecting intellectual work.",
    thesis:
      "Knowledge work on this site splits input, memory, and public projection: Notion and Obsidian in the vault, this Observatory as the face, Research Brief as a quiet public homepage.",
    relatedProjectIds: ["proj-knowledge-os", "proj-research-brief"],
    relatedQuestionIds: ["q-bio-to-compute"],
    relatedSignalIds: ["sig-003"],
    relatedConceptIds: [
      "concept-human-systems",
      "concept-technology",
      "concept-philosophy",
    ],
    relatedFocusIds: ["focus-knowledge-os"],
    vaults: [
      {
        label: "Research Brief",
        href: "/knowledge/research-brief/",
        description: "MUJI Observatory homepage — public projection of the vault.",
      },
      {
        label: "Personal Knowledge OS",
        href: "/projects/active/personal-knowledge-os/",
        description:
          "Entity graph, adapters, and Observatory surfaces under construction.",
      },
    ],
    layout: { x: 0.5, y: 0.84 },
  },
];

export function getPracticeFieldBySlug(slug: string) {
  return practiceFields.find((field) => field.slug === slug);
}

export function getPracticeFieldById(id: string) {
  return practiceFields.find((field) => field.id === id);
}
