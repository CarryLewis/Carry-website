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
  productName: "Personal Observatory",
  tagline: "学习医学，构建工具，持续追问如何理解人。",
  metaDescription:
    "Carry Lewis 的个人观测站：医学、软件创造、长跑、阅读与信仰。记录作品、问题与逐渐形成的判断。",
  nav: [
    { href: "/", label: "观测站" },
    { href: "/thinking/", label: "思考" },
    { href: "/projects/", label: "作品" },
    { href: "/about/", label: "关于" },
  ],
  footerLinks: [
    { href: "/thinking/", label: "思考" },
    { href: "/about/#contact", label: "交流" },
    { href: "/observatory/", label: "第一版" },
  ],
  versionLabel: "v1.0 · Personal Observatory",
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
    label: "Lab",
    href: "/lab",
    description: "Visual experiments by information structure",
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    description: "Personal knowledge graph",
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
    title: "Practice fields",
    description:
      "An unnamed origin. Fields currently in practice branch from it — each node opens a summary of what exists on this site.",
    figureCaption: "fig.02 — derivation from origin · practice fields",
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
