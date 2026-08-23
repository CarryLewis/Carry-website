import { projects } from "@/data/projects";

export type FeedbackSurface =
  | "observatory"
  | "project"
  | "lab"
  | "knowledge"
  | "site";

export type FeedbackTarget = {
  id: string;
  title: string;
  surface: FeedbackSurface;
  group: string;
};

export const DEFAULT_OBSERVATORY_TARGET_ID = "observatory-information-radar";
export const DEFAULT_SITE_TARGET_ID = "site";
export const LAB_TARGET_ID = "lab-html-design-lab";
export const RESEARCH_BRIEF_TARGET_ID = "knowledge-research-brief";
export const MEDICAL_BASEMENT_TARGET_ID = "knowledge-medical-basement";

export const FEEDBACK_TARGETS: FeedbackTarget[] = [
  {
    id: DEFAULT_OBSERVATORY_TARGET_ID,
    title: "Information radar",
    surface: "observatory",
    group: "Observatory",
  },
  ...projects.map((project) => ({
    id: project.id,
    title: project.title,
    surface: "project" as const,
    group: "Projects",
  })),
  {
    id: LAB_TARGET_ID,
    title: "HTML Design Lab",
    surface: "lab",
    group: "Lab",
  },
  {
    id: RESEARCH_BRIEF_TARGET_ID,
    title: "Research Brief",
    surface: "knowledge",
    group: "Knowledge",
  },
  {
    id: MEDICAL_BASEMENT_TARGET_ID,
    title: "medical basement",
    surface: "knowledge",
    group: "Knowledge",
  },
  {
    id: DEFAULT_SITE_TARGET_ID,
    title: "Site-wide",
    surface: "site",
    group: "Laboratory",
  },
];

export function getFeedbackTarget(id: string): FeedbackTarget | undefined {
  return FEEDBACK_TARGETS.find((target) => target.id === id);
}

export function feedbackTargetGroups(): Array<{
  group: string;
  targets: FeedbackTarget[];
}> {
  const groups: Array<{ group: string; targets: FeedbackTarget[] }> = [];
  for (const target of FEEDBACK_TARGETS) {
    const existing = groups.find((entry) => entry.group === target.group);
    if (existing) {
      existing.targets.push(target);
    } else {
      groups.push({ group: target.group, targets: [target] });
    }
  }
  return groups;
}
