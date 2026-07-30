import type {
  ObservatoryCopy,
  PersonProfile,
  SiteChrome,
  SystemLink,
} from "@/domain/entities";

export const profile: PersonProfile = {
  kind: "profile",
  name: "Carry Lewis",
  role: "Medical student exploring biological complexity through computation.",
  subtitle: "Medicine × Artificial Intelligence × Human Systems",
  thesis:
    "Building computational models and knowledge systems to understand complex biological systems.",
  focusAreas: [
    "Medicine",
    "Artificial Intelligence",
    "Computational Biology",
    "Human Systems",
  ],
};

export const siteChrome: SiteChrome = {
  brandName: "Carry Lewis",
  productName: "Digital Laboratory",
  tagline:
    "Scientific journal · Knowledge observatory · Personal research system",
  metaDescription:
    "Personal digital laboratory: scientific research, computational medicine, knowledge systems, and intellectual exploration.",
  nav: [
    { href: "/", label: "Observatory" },
    { href: "/research", label: "Research" },
    { href: "/projects", label: "Projects" },
    { href: "/knowledge", label: "Knowledge" },
    { href: "/medical", label: "Medical" },
    { href: "/signals", label: "Signals" },
    { href: "/archive", label: "Archive" },
    { href: "/about", label: "About" },
  ],
  footerLinks: [
    { href: "/about", label: "About" },
    { href: "/medical", label: "Medical" },
    { href: "/signals", label: "Signals" },
  ],
  versionLabel: "v0.1 · Observatory",
};

export const systemLinks: SystemLink[] = [
  {
    label: "Research",
    href: "/research",
    description: "Scientific exploration records",
  },
  {
    label: "Projects",
    href: "/projects",
    description: "Things under construction",
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    description: "Personal knowledge graph",
  },
  {
    label: "Medical",
    href: "/medical",
    description: "Medical basement vault from Notion",
  },
  {
    label: "Archive",
    href: "/archive",
    description: "Long-term memory",
  },
];

/** Section / CTA copy for Observatory — not entity content, but still data-driven. */
export const observatoryCopy: ObservatoryCopy = {
  heroEyebrow: "Observatory",
  heroPrimaryCta: { label: "Explore Research", href: "/research" },
  heroSecondaryCta: { label: "View Projects", href: "/projects" },
  heroFigureCaption: "fig.01 — information constellation",
  exploration: {
    label: "Current Exploration",
    title: "Intellectual focus",
    description:
      "Active lines of inquiry across medicine, computation, and knowledge systems.",
  },
  questions: {
    label: "Research Threads",
    title: "Active questions",
    description: "Exploration begins with questions — not polished outcomes.",
  },
  knowledge: {
    label: "Knowledge Observatory",
    title: "Connected concepts",
    description:
      "A preview of the personal knowledge graph — relations first, pages second.",
    figureCaption:
      "fig.02 — neighborhood around Human Systems · derived from concept graph",
    ctaLabel: "Enter knowledge →",
  },
  signals: {
    label: "Latest Signals",
    title: "Information radar",
    description:
      "Recent observations across medical research, AI development, and technology.",
    ctaLabel: "Open signals →",
  },
  closing: {
    label: "Continue",
    title: "Explore the system",
    description:
      "Enter any subsystem of the laboratory. Each surface shares the same entity graph and design language.",
  },
};
