/**
 * HTML Design Lab — visualization catalog for the Structure Bench.
 *
 * Editorial overlay on the vendored experiments: each specimen is filed
 * by the *structure of its information*, not by visual style.
 * Source experiments live in public/html-design-lab/ (synced from
 * CarryLewis/HTML-Design-Lab).
 */

export type InformationStructure =
  | "relationship"
  | "sequence"
  | "process"
  | "mechanism"
  | "comparison"
  | "spatial"
  | "overview-detail"
  | "emergence"
  | "structure-in-image"
  | "hierarchy-in-language";

export type LabUseCaseId =
  | "knowledge"
  | "medical"
  | "research"
  | "exhibition"
  | "systems";

export type LabPattern = {
  id: string;
  name: string;
  principle: string;
};

export type LabSpecimen = {
  id: string;
  name: string;
  version: string;
  structure: InformationStructure;
  form: string;
  formRationale: string;
  category: string;
  interaction: string;
  motion: string;
  information: string;
  complexity: "low" | "medium" | "high";
  reusability: "low" | "medium" | "high";
  visualLanguage: string;
  problem: string;
  short: string;
  tags: string[];
  recommendedFor: string[];
  /** Coarse product-iteration filters, derived from recommendedFor. */
  useCaseIds: LabUseCaseId[];
  /** Extracted pattern from HTML Design Lab knowledge.json. */
  pattern: LabPattern;
  /** Same-origin path to the isolated experiment (trailing slash). */
  embedUrl: string;
  featured?: boolean;
};

export type StructureNode = {
  id: InformationStructure;
  label: string;
  form: string;
  question: string;
  /** Field layout in 0–1, used by the structure graph. */
  x: number;
  y: number;
  /** Place the structure→form caption left of dense right-edge nodes. */
  labelSide?: "left" | "right";
};

export type LabUseCase = {
  id: LabUseCaseId;
  label: string;
};

export const USE_CASES: LabUseCase[] = [
  { id: "knowledge", label: "Knowledge systems" },
  { id: "medical", label: "Medical education" },
  { id: "research", label: "Research explanation" },
  { id: "exhibition", label: "Exhibition" },
  { id: "systems", label: "System maps" },
];

export const STRUCTURES: StructureNode[] = [
  {
    id: "relationship",
    label: "Relationship",
    form: "Graph",
    question: "What touches what, and what should stay quiet?",
    x: 0.16,
    y: 0.32,
    labelSide: "right",
  },
  {
    id: "sequence",
    label: "Sequence",
    form: "Timeline",
    question: "In what order did this happen, and what is the next grain of detail?",
    x: 0.46,
    y: 0.2,
    labelSide: "right",
  },
  {
    id: "process",
    label: "Process",
    form: "Flow",
    question: "How does a signal travel, activate, and leave a result?",
    x: 0.3,
    y: 0.52,
    labelSide: "right",
  },
  {
    id: "mechanism",
    label: "Mechanism",
    form: "Simulation",
    question: "Which parts sense, compute, act, and return toward a setpoint?",
    x: 0.58,
    y: 0.78,
    labelSide: "left",
  },
  {
    id: "comparison",
    label: "Comparison",
    form: "Shared axis",
    question: "What is different when two systems share a frame?",
    x: 0.5,
    y: 0.58,
    labelSide: "right",
  },
  {
    id: "spatial",
    label: "Spatial relation",
    form: "Map",
    question: "What does neighborhood mean when distance is relatedness?",
    x: 0.74,
    y: 0.48,
    labelSide: "left",
  },
  {
    id: "overview-detail",
    label: "Overview → detail",
    form: "Zoomable canvas",
    question: "How do you read a field without forcing a single order?",
    x: 0.86,
    y: 0.28,
    labelSide: "left",
  },
  {
    id: "emergence",
    label: "Emergence",
    form: "Progressive construction",
    question: "What should appear only when the argument needs it?",
    x: 0.66,
    y: 0.16,
    labelSide: "left",
  },
  {
    id: "structure-in-image",
    label: "Structure in image",
    form: "In-situ annotation",
    question: "How do you point at structure that lives inside a picture?",
    x: 0.34,
    y: 0.82,
    labelSide: "right",
  },
  {
    id: "hierarchy-in-language",
    label: "Hierarchy in language",
    form: "Syntactic entrance",
    question: "Can the order type appears encode the argument itself?",
    x: 0.14,
    y: 0.66,
    labelSide: "right",
  },
];

/** Quiet relatedness among information structures — neighborhood, not decoration. */
export const STRUCTURE_EDGES: Array<[InformationStructure, InformationStructure]> =
  [
    ["relationship", "process"],
    ["relationship", "spatial"],
    ["process", "mechanism"],
    ["process", "sequence"],
    ["process", "comparison"],
    ["sequence", "emergence"],
    ["spatial", "overview-detail"],
    ["spatial", "structure-in-image"],
    ["sequence", "hierarchy-in-language"],
    ["mechanism", "structure-in-image"],
    ["emergence", "overview-detail"],
  ];

export const LAB_THESIS =
  "Choose the form from the structure of the information, not from what looks sophisticated.";

export const LAB_PROTOCOL = [
  {
    step: "01",
    label: "Structure",
    body: "Name what the information is made of — relationship, sequence, process, comparison, space.",
  },
  {
    step: "02",
    label: "Form",
    body: "Pick the visual system that matches that structure. Style is a later language, not the decision.",
  },
  {
    step: "03",
    label: "Specimen",
    body: "Test whether interaction makes the mechanism visible. Display without understanding is failure.",
  },
] as const;

export const specimens: LabSpecimen[] = [
  {
    id: "knowledge-graph-v01",
    name: "Interactive Knowledge Graph",
    version: "v01",
    structure: "relationship",
    form: "Quiet graph until neighborhood focus",
    formRationale:
      "Relationship networks go unreadable when every node is equally present. The graph stays dim; hover isolates a neighborhood; click opens a dossier.",
    category: "visualization",
    interaction: "hover + click",
    motion: "neighborhood emphasis",
    information: "relationships",
    complexity: "high",
    reusability: "high",
    visualLanguage: "scientific",
    problem:
      "Relationship networks are unreadable when every node is equally present.",
    short:
      "An SVG graph that stays quiet until hover focuses a neighborhood and click opens a dossier.",
    tags: ["graph", "network", "hover", "click", "relationships"],
    recommendedFor: [
      "knowledge systems",
      "research mapping",
      "Thinking Database",
    ],
    useCaseIds: ["knowledge", "research"],
    pattern: {
      id: "neighborhood-focus",
      name: "Neighborhood Focus",
      principle: "Ask what is near this without deleting the map.",
    },
    embedUrl:
      "/html-design-lab/experiments/visualization/knowledge-graph-v01/",
    featured: true,
  },
  {
    id: "progressive-timeline-v01",
    name: "Progressive Timeline",
    version: "v01",
    structure: "sequence",
    form: "Overview → event → detail",
    formRationale:
      "A chronology shown all at once flattens sequence. Overview first, then the event, then a replacing detail panel — never a stacked dump.",
    category: "visualization",
    interaction: "scrub + click",
    motion: "events emerge along the axis",
    information: "chronology",
    complexity: "medium",
    reusability: "high",
    visualLanguage: "data",
    problem:
      "Chronologies shown all at once flatten sequence and overwhelm detail.",
    short: "Overview → event → detail. Scrub or scroll reveals events in time.",
    tags: ["timeline", "scrub", "overview-detail", "sequence"],
    recommendedFor: [
      "project histories",
      "disease progression",
      "research chronologies",
    ],
    useCaseIds: ["research", "medical"],
    pattern: {
      id: "overview-event-detail",
      name: "Overview → Event → Detail",
      principle: "Time is an axis you sample.",
    },
    embedUrl:
      "/html-design-lab/experiments/visualization/progressive-timeline-v01/",
    featured: true,
  },
  {
    id: "process-diagram-v01",
    name: "Animated Process Diagram",
    version: "v01",
    structure: "process",
    form: "Animation as explanation",
    formRationale:
      "A → B → C hides activation. The animation is the explanation: a signal travels, a node activates, a result emerges.",
    category: "visualization",
    interaction: "play / step / reset",
    motion: "signal travel, activation, state morph",
    information: "causality",
    complexity: "medium",
    reusability: "high",
    visualLanguage: "scientific",
    problem:
      "Processes described as A → B → C hide activation, change, and emergence.",
    short:
      "The animation is the explanation: signal propagates, a node activates, a result emerges.",
    tags: ["process", "flow", "causality", "animation"],
    recommendedFor: [
      "system demonstrations",
      "scientific mechanisms",
      "onboarding",
    ],
    useCaseIds: ["systems", "medical", "research"],
    pattern: {
      id: "animation-as-explanation",
      name: "Animation as Explanation",
      principle: "The motion is the causal claim.",
    },
    embedUrl: "/html-design-lab/experiments/visualization/process-diagram-v01/",
  },
  {
    id: "mechanism-v01",
    name: "Negative-Feedback Loop",
    version: "v01",
    structure: "mechanism",
    form: "Labeled control loop",
    formRationale:
      "A pretty circle is not a mechanism. Sensor, integrator, effector, and variable must be labeled — then a disturbance should be opposed.",
    category: "scientific",
    interaction: "disturb + play",
    motion: "variable drift, error, effector, return",
    information: "sensor → integrator → effector → variable",
    complexity: "high",
    reusability: "high",
    visualLanguage: "simulator",
    problem:
      "Feedback is often drawn as a pretty circle that does not encode sensor, integrator, effector, or variable.",
    short:
      "A labeled control loop. Disturb the variable and watch the effector oppose the change.",
    tags: ["mechanism", "feedback", "physiology", "simulation"],
    recommendedFor: [
      "physiology explainers",
      "control systems",
      "medical education patterns",
    ],
    useCaseIds: ["medical", "systems"],
    pattern: {
      id: "labeled-control-loop",
      name: "Labeled Control Loop",
      principle: "Name sensor, integrator, effector, and variable.",
    },
    embedUrl: "/html-design-lab/experiments/scientific/mechanism-v01/",
    featured: true,
  },
  {
    id: "comparison-v01",
    name: "Interactive Comparison",
    version: "v01",
    structure: "comparison",
    form: "Shared-axis matrix",
    formRationale:
      "Adjacent paragraphs cannot be compared. Two models on one frame; a slider isolates difference.",
    category: "visualization",
    interaction: "slider + toggle",
    motion: "corresponding parts align or peel apart",
    information: "difference on shared structure",
    complexity: "medium",
    reusability: "high",
    visualLanguage: "data",
    problem:
      "Two systems described in adjacent paragraphs cannot be compared on shared structure.",
    short: "Two models on shared axes; a slider isolates difference.",
    tags: ["comparison", "slider", "overlay", "matrix"],
    recommendedFor: [
      "before/after protocols",
      "competing architectures",
      "language comparison",
    ],
    useCaseIds: ["systems", "research"],
    pattern: {
      id: "shared-axis-comparison",
      name: "Shared-Axis Comparison",
      principle: "Difference needs one frame and named properties.",
    },
    embedUrl: "/html-design-lab/experiments/visualization/comparison-v01/",
  },
  {
    id: "spatial-map-v01",
    name: "Spatial Information Map",
    version: "v01",
    structure: "spatial",
    form: "Pan-and-zoom field",
    formRationale:
      "Menus hide neighborhood. Distance implies relatedness; zoom is reading, not a table of contents.",
    category: "layout",
    interaction: "pan + zoom + click",
    motion: "camera; labels resolve with scale",
    information: "neighborhood and hierarchy",
    complexity: "high",
    reusability: "high",
    visualLanguage: "spatial",
    problem:
      "Hierarchical menus hide neighborhood and make overview feel like a table of contents.",
    short:
      "A pan-and-zoom field of concepts. Distance implies relatedness; zoom is reading.",
    tags: ["spatial", "pan", "zoom", "overview-detail"],
    recommendedFor: [
      "knowledge observatories",
      "system maps",
      "exhibition plans",
    ],
    useCaseIds: ["knowledge", "exhibition", "systems"],
    pattern: {
      id: "distance-as-relatedness",
      name: "Distance as Relatedness",
      principle: "Proximity is meaning; zoom is reading.",
    },
    embedUrl: "/html-design-lab/experiments/layout/spatial-map-v01/",
  },
  {
    id: "infinite-canvas-v01",
    name: "Infinite Canvas",
    version: "v01",
    structure: "overview-detail",
    form: "Unbounded cluster canvas",
    formRationale:
      "Page scroll forces one reading order onto clustered material. Clusters emerge as you pan; there is no page end.",
    category: "layout",
    interaction: "pan + click",
    motion: "inertial pan; cluster focus",
    information: "spatial clusters without a forced reading order",
    complexity: "high",
    reusability: "high",
    visualLanguage: "notebook",
    problem:
      "Page scroll forces a single reading order onto material that is spatial and clustered.",
    short:
      "An unbounded canvas of notes and diagrams. Clusters emerge as you pan.",
    tags: ["canvas", "pan", "clusters", "spatial-navigation"],
    recommendedFor: [
      "research boards",
      "digital notebooks",
      "exhibition backrooms",
    ],
    useCaseIds: ["knowledge", "research", "exhibition"],
    pattern: {
      id: "unbounded-cluster-canvas",
      name: "Unbounded Cluster Canvas",
      principle: "A board, not a chapter.",
    },
    embedUrl: "/html-design-lab/experiments/layout/infinite-canvas-v01/",
  },
  {
    id: "scroll-narrative-v01",
    name: "Scroll Narrative",
    version: "v01",
    structure: "emergence",
    form: "Causal scroll construction",
    formRationale:
      "A wall of text loses causal order. Stages pin while a diagram is constructed in the order the argument needs.",
    category: "storytelling",
    interaction: "scroll",
    motion: "staged reveal",
    information: "causal sequence",
    complexity: "medium",
    reusability: "high",
    visualLanguage: "editorial",
    problem: "Sequential ideas dumped as a wall of text lose causal order.",
    short:
      "A vertical essay whose stages pin while a diagram is constructed in causal order.",
    tags: ["scroll", "narrative", "pin", "progressive-construction"],
    recommendedFor: [
      "interactive essays",
      "research explanations",
      "system onboarding",
    ],
    useCaseIds: ["research", "systems"],
    pattern: {
      id: "causal-scroll-construction",
      name: "Causal Scroll Construction",
      principle: "Reading order is construction order.",
    },
    embedUrl: "/html-design-lab/experiments/storytelling/scroll-narrative-v01/",
    featured: true,
  },
  {
    id: "layered-annotation-v01",
    name: "Layered Image Annotation",
    version: "v01",
    structure: "structure-in-image",
    form: "In-situ hotspot callouts",
    formRationale:
      "A caption under an image cannot point. Numbered hotspots live on the figure; unused regions dim.",
    category: "images",
    interaction: "hover + click",
    motion: "focus dimming; callout fade",
    information: "structure inside an image",
    complexity: "medium",
    reusability: "high",
    visualLanguage: "exhibition",
    problem: "A caption under an image cannot point at structure inside the image.",
    short:
      "Numbered hotspots on one image; callouts layer on; unused regions dim.",
    tags: ["annotation", "hotspot", "image", "focus"],
    recommendedFor: [
      "anatomy",
      "scientific figures",
      "screenshot evidence",
      "museum labels",
    ],
    useCaseIds: ["medical", "exhibition"],
    pattern: {
      id: "in-situ-annotation",
      name: "In-situ Annotation",
      principle: "Point into the plate, not under it.",
    },
    embedUrl: "/html-design-lab/experiments/images/layered-annotation-v01/",
  },
  {
    id: "kinetic-type-v01",
    name: "Kinetic Typography",
    version: "v01",
    structure: "hierarchy-in-language",
    form: "Syntactic entrance",
    formRationale:
      "Motion on type often decorates. Entrance order and emphasis should be the argument, staggered by syntactic role.",
    category: "typography",
    interaction: "replay",
    motion: "staggered reveal by syntactic role",
    information: "hierarchy and sequence",
    complexity: "medium",
    reusability: "medium",
    visualLanguage: "kinetic",
    problem:
      "Motion applied to type often decorates instead of encoding hierarchy and sequence.",
    short:
      "A short statement whose entrance order and emphasis are the argument.",
    tags: ["kinetic", "typography", "sequence", "hierarchy"],
    recommendedFor: [
      "essay openings",
      "exhibition titles",
      "conceptual framing",
    ],
    useCaseIds: ["research", "exhibition"],
    pattern: {
      id: "syntactic-entrance",
      name: "Syntactic Entrance",
      principle: "Entrance order is the argument.",
    },
    embedUrl: "/html-design-lab/experiments/typography/kinetic-type-v01/",
  },
];

export const DEFAULT_SPECIMEN_ID = "knowledge-graph-v01";

export function getSpecimen(id: string) {
  return specimens.find((item) => item.id === id);
}

export function getStructure(id: InformationStructure) {
  return STRUCTURES.find((item) => item.id === id);
}

export function specimensForStructure(id: InformationStructure) {
  return specimens.filter((item) => item.structure === id);
}

export function neighboringStructures(id: InformationStructure) {
  const next = new Set<InformationStructure>([id]);
  for (const [from, to] of STRUCTURE_EDGES) {
    if (from === id) next.add(to);
    if (to === id) next.add(from);
  }
  return next;
}

export function specimensForUseCase(id: LabUseCaseId) {
  return specimens.filter((item) => item.useCaseIds.includes(id));
}

export function filterSpecimens(useCase: LabUseCaseId | null) {
  if (!useCase) return specimens;
  return specimensForUseCase(useCase);
}

export function getLabStaticParams() {
  return specimens.map((item) => ({ slug: item.id }));
}
