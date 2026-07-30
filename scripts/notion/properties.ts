import { richTextToMarkdown, richTextToPlain } from "./rich-text";

export type NotionProperty = {
  id?: string;
  type: string;
  name?: string;
  title?: Array<{ plain_text?: string }>;
  rich_text?: Array<{ plain_text?: string; href?: string | null; annotations?: object; text?: object }>;
  number?: number | null;
  select?: { name?: string } | null;
  status?: { name?: string } | null;
  multi_select?: Array<{ name?: string }>;
  date?: { start?: string | null; end?: string | null } | null;
  checkbox?: boolean;
  url?: string | null;
  email?: string | null;
  phone_number?: string | null;
  formula?: { type?: string; string?: string | null; number?: number | null; boolean?: boolean | null };
  relation?: Array<{ id: string }>;
  rollup?: { type?: string; array?: unknown[]; number?: number | null };
  people?: Array<{ name?: string }>;
  files?: Array<{ name?: string; file?: { url?: string }; external?: { url?: string } }>;
  created_time?: string;
  last_edited_time?: string;
  unique_id?: { prefix?: string | null; number?: number };
};

export type PropertyMap = Record<string, NotionProperty>;

const TITLE_ALIASES = ["name", "title", "标题", "名称", "项目", "问题", "概念"];
const SUMMARY_ALIASES = [
  "summary",
  "description",
  "desc",
  "概述",
  "摘要",
  "描述",
  "简介",
];
const STATUS_ALIASES = ["status", "状态"];
const PRIORITY_ALIASES = ["priority", "优先级", "prio"];
const CATEGORY_ALIASES = ["category", "domain", "分类", "领域", "类型", "kind"];
const DATE_ALIASES = ["date", "occurred", "occurredat", "when", "日期", "时间"];
const SOURCE_ALIASES = ["source", "来源"];
const URL_ALIASES = ["url", "link", "sourceurl", "href", "链接"];
const TECH_ALIASES = ["technology", "tech", "stack", "技术"];
const FIELDS_ALIASES = ["fields", "tags", "标签", "字段"];
const IMPORTANCE_ALIASES = ["importance", "重要度", "权重"];
const PROBLEM_ALIASES = ["problem", "问题描述", "痛点"];
const ARCH_ALIASES = ["architecture", "架构"];
const BODY_ALIASES = ["body", "notes", "content", "内容", "正文", "笔记"];

function propEntries(properties: PropertyMap): Array<[string, NotionProperty]> {
  return Object.entries(properties);
}

function findByAliases(
  properties: PropertyMap,
  aliases: string[],
  types?: string[],
): NotionProperty | undefined {
  const lowered = aliases.map((a) => a.toLowerCase());
  for (const [name, prop] of propEntries(properties)) {
    if (!lowered.includes(name.toLowerCase())) continue;
    if (types && !types.includes(prop.type)) continue;
    return prop;
  }
  // fuzzy: alias contained in property name
  for (const [name, prop] of propEntries(properties)) {
    const n = name.toLowerCase();
    if (!aliases.some((a) => n.includes(a.toLowerCase()))) continue;
    if (types && !types.includes(prop.type)) continue;
    return prop;
  }
  return undefined;
}

export function getTitleProperty(properties: PropertyMap): NotionProperty | undefined {
  const titled = propEntries(properties).find(([, p]) => p.type === "title");
  if (titled) return titled[1];
  return findByAliases(properties, TITLE_ALIASES);
}

export function readTitle(properties: PropertyMap): string {
  const prop = getTitleProperty(properties);
  if (!prop) return "";
  if (prop.type === "title") return richTextToPlain(prop.title as never);
  return readString(prop);
}

export function readString(prop: NotionProperty | undefined): string {
  if (!prop) return "";
  switch (prop.type) {
    case "title":
      return richTextToPlain(prop.title as never);
    case "rich_text":
      return richTextToMarkdown(prop.rich_text as never);
    case "select":
      return prop.select?.name ?? "";
    case "status":
      return prop.status?.name ?? "";
    case "url":
      return prop.url ?? "";
    case "email":
      return prop.email ?? "";
    case "phone_number":
      return prop.phone_number ?? "";
    case "number":
      return prop.number == null ? "" : String(prop.number);
    case "formula":
      if (prop.formula?.type === "string") return prop.formula.string ?? "";
      if (prop.formula?.type === "number")
        return prop.formula.number == null ? "" : String(prop.formula.number);
      return "";
    case "unique_id": {
      const prefix = prop.unique_id?.prefix ?? "";
      const num = prop.unique_id?.number;
      return num == null ? prefix : `${prefix}${num}`;
    }
    default:
      return "";
  }
}

export function readStrings(prop: NotionProperty | undefined): string[] {
  if (!prop) return [];
  if (prop.type === "multi_select") {
    return (prop.multi_select ?? []).map((t) => t.name ?? "").filter(Boolean);
  }
  if (prop.type === "rich_text" || prop.type === "title") {
    const text = readString(prop);
    return text
      ? text.split(/[,，;；\n]/).map((s) => s.trim()).filter(Boolean)
      : [];
  }
  if (prop.type === "select" || prop.type === "status") {
    const one = readString(prop);
    return one ? [one] : [];
  }
  return [];
}

export function readDate(prop: NotionProperty | undefined): string | undefined {
  if (!prop) return undefined;
  if (prop.type === "date") {
    const start = prop.date?.start;
    return start ? start.slice(0, 10) : undefined;
  }
  if (prop.type === "created_time" && prop.created_time) {
    return prop.created_time.slice(0, 10);
  }
  if (prop.type === "last_edited_time" && prop.last_edited_time) {
    return prop.last_edited_time.slice(0, 10);
  }
  const asString = readString(prop);
  if (/^\d{4}-\d{2}-\d{2}/.test(asString)) return asString.slice(0, 10);
  return undefined;
}

export function readRelationIds(prop: NotionProperty | undefined): string[] {
  if (!prop || prop.type !== "relation") return [];
  return (prop.relation ?? []).map((r) => r.id);
}

export function findProp(
  properties: PropertyMap,
  aliases: string[],
  types?: string[],
): NotionProperty | undefined {
  return findByAliases(properties, aliases, types);
}

export function readByAliases(
  properties: PropertyMap,
  aliases: string[],
  types?: string[],
): string {
  return readString(findProp(properties, aliases, types));
}

export function readListByAliases(
  properties: PropertyMap,
  aliases: string[],
): string[] {
  return readStrings(findProp(properties, aliases));
}

export function readDateByAliases(
  properties: PropertyMap,
  aliases: string[],
): string | undefined {
  return readDate(findProp(properties, aliases));
}

export function readRelationsByAliases(
  properties: PropertyMap,
  aliases: string[],
): string[] {
  return readRelationIds(findProp(properties, aliases, ["relation"]));
}

export const ALIASES = {
  title: TITLE_ALIASES,
  summary: SUMMARY_ALIASES,
  status: STATUS_ALIASES,
  priority: PRIORITY_ALIASES,
  category: CATEGORY_ALIASES,
  date: DATE_ALIASES,
  source: SOURCE_ALIASES,
  url: URL_ALIASES,
  technology: TECH_ALIASES,
  fields: FIELDS_ALIASES,
  importance: IMPORTANCE_ALIASES,
  problem: PROBLEM_ALIASES,
  architecture: ARCH_ALIASES,
  body: BODY_ALIASES,
  relatedProjects: [
    "relatedprojectids",
    "projects",
    "project",
    "相关项目",
    "项目",
  ],
  relatedQuestions: [
    "relatedquestionids",
    "questions",
    "question",
    "相关问题",
    "问题",
  ],
  relatedConcepts: [
    "relatedconceptids",
    "connectednodeids",
    "concepts",
    "concept",
    "相关概念",
    "概念",
  ],
  relatedSignals: ["relatedsignalids", "signals", "signal", "相关情报"],
  relatedFocus: ["relatedfocusids", "focus", "相关焦点"],
  relatedResearch: [
    "relatedresearchids",
    "research",
    "relatedtopicids",
    "topics",
    "相关研究",
  ],
  relatedEntities: [
    "relatedentityids",
    "related",
    "entities",
    "关联",
    "相关",
  ],
};
