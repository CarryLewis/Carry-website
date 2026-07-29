import type { PersonProfile, SystemLink } from "@/domain/entities";

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
    label: "Archive",
    href: "/archive",
    description: "Long-term memory",
  },
];
