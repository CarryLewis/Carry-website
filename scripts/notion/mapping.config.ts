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

/**
 * Explicit database ID (dashed UUID) → module.
 * medical-basement DBs are medical study vaults → notion-inbox until promoted.
 */
export const databaseOverrides: Record<string, DatabaseOverride> = {
  // Named medical-basement databases (discovered 2026-07-30)
  "7f2ee033-c41d-8294-b8c9-01b833fd7013": { module: "notion-inbox" }, // Case Database
  "4c1ee033-c41d-83bd-bfab-0116847a8a69": { module: "notion-inbox" }, // disease database
  "aa0ee033-c41d-82c5-875d-01c5362cf918": { module: "notion-inbox" }, // disease gallary
  "631ffa28-fc5d-4fbc-8205-2fbd3cfb81e4": { module: "notion-inbox" }, // Drug database
  "3a6ee033-c41d-8038-a6c8-fe1a3435de49": { module: "notion-inbox" }, // Incorrect Questions Log
  "b67ee033-c41d-82c8-9173-0188157db110": { module: "notion-inbox" }, // medical applications
  "75fee033-c41d-8242-ac46-014d564f81d8": { module: "notion-inbox" }, // medical lecture
};

type Rule = { module: ContentModule; patterns: RegExp[] };

const TITLE_RULES: Rule[] = [
  {
    module: "focus",
    patterns: [/focus/i, /焦点/, /探索/, /intellectual\s*focus/i],
  },
  {
    module: "questions",
    // Avoid matching study logs like "Incorrect Questions Log"
    patterns: [
      /^questions?$/i,
      /active\s*questions?/i,
      /research\s*questions?/i,
      /^问题$/,
      /研究问题/,
    ],
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
