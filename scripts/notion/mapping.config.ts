/**
 * Notion database → Content OS module mapping.
 *
 * - Title keyword heuristics pick a default module.
 * - `databaseOverrides` wins when you set an explicit database ID → module.
 * - Unmapped DBs land in `notion-inbox`.
 */

export type ContentModule =
  | "focus"
  | "questions"
  | "projects"
  | "concepts"
  | "signals"
  | "timeline"
  | "relations"
  | "notion-inbox";

export type DatabaseOverride = {
  module: ContentModule;
  /** Optional property name overrides (Notion property title → logical field). */
  propertyNames?: Partial<Record<string, string>>;
};

/** Explicit database ID (dashed UUID) → module. Fill after `npm run discover:notion`. */
export const databaseOverrides: Record<string, DatabaseOverride> = {
  // Example:
  // "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee": { module: "projects" },
};

type Rule = { module: ContentModule; patterns: RegExp[] };

const TITLE_RULES: Rule[] = [
  {
    module: "focus",
    patterns: [/focus/i, /焦点/, /探索/, /intellectual\s*focus/i],
  },
  {
    module: "questions",
    patterns: [/question/i, /问题/, /research\s*question/i, /active\s*question/i],
  },
  {
    module: "projects",
    patterns: [/project/i, /项目/, /build\s*lab/i],
  },
  {
    module: "concepts",
    patterns: [/concept/i, /概念/, /knowledge/i, /知识/, /graph\s*node/i],
  },
  {
    module: "signals",
    patterns: [/signal/i, /radar/i, /情报/, /信息雷达/, /intelligence/i],
  },
  {
    module: "timeline",
    patterns: [/timeline/i, /时间线/, /archive\s*event/i, /里程碑/, /milestone/i],
  },
  {
    module: "relations",
    patterns: [/relation/i, /关系/, /edges?/i],
  },
];

export function inferModuleFromTitle(title: string): ContentModule {
  const trimmed = title.trim();
  for (const rule of TITLE_RULES) {
    if (rule.patterns.some((p) => p.test(trimmed))) return rule.module;
  }
  return "notion-inbox";
}

export function resolveModule(
  databaseId: string,
  title: string,
): { module: ContentModule; via: "override" | "heuristic" } {
  const override = databaseOverrides[databaseId];
  if (override) return { module: override.module, via: "override" };
  return { module: inferModuleFromTitle(title), via: "heuristic" };
}
