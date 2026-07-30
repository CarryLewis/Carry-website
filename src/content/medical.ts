/**
 * Medical Basement vault — typed views over Notion inbox sync.
 * Collections map filename prefixes / Notion DB titles → site routes.
 */

import type { MedicalInboxRecord } from "@/content/types";
import { generatedInbox } from "@/content/generated-manifest";

export type MedicalCollectionId =
  | "lectures"
  | "applications"
  | "diseases"
  | "drugs"
  | "cases"
  | "incorrect-questions"
  | "galleries";

export type MedicalCollectionMeta = {
  id: MedicalCollectionId;
  /** Filename prefix before `--` in notion-inbox */
  filePrefix: string;
  notionTitles: string[];
  label: string;
  title: string;
  description: string;
};

export const MEDICAL_COLLECTIONS: MedicalCollectionMeta[] = [
  {
    id: "lectures",
    filePrefix: "medical-lecture",
    notionTitles: ["medical lecture"],
    label: "Lectures",
    title: "Medical lectures",
    description: "Course sessions, notes, and lecture-linked applications.",
  },
  {
    id: "applications",
    filePrefix: "medical-applications",
    notionTitles: ["medical applications"],
    label: "Applications",
    title: "Medical applications",
    description: "Applied topics linked from lectures and study programs.",
  },
  {
    id: "diseases",
    filePrefix: "disease-database",
    notionTitles: ["disease database"],
    label: "Diseases",
    title: "Disease database",
    description: "Disorder overviews, mechanisms, and related clinical links.",
  },
  {
    id: "drugs",
    filePrefix: "drug-database",
    notionTitles: ["Drug database"],
    label: "Drugs",
    title: "Drug database",
    description: "Mechanisms, indications, dosing notes, and adverse effects.",
  },
  {
    id: "cases",
    filePrefix: "case-database",
    notionTitles: ["Case Database"],
    label: "Cases",
    title: "Case database",
    description: "Clinical cases used for reasoning practice.",
  },
  {
    id: "incorrect-questions",
    filePrefix: "incorrect-questions-log",
    notionTitles: ["Incorrect Questions Log"],
    label: "Incorrect questions",
    title: "Incorrect questions log",
    description: "Missed items, takeaways, and review status.",
  },
  {
    id: "galleries",
    filePrefix: "disease-gallary",
    notionTitles: ["disease gallary"],
    label: "Galleries",
    title: "Disease galleries",
    description: "System-level disease groupings.",
  },
];

const collectionById = new Map(
  MEDICAL_COLLECTIONS.map((c) => [c.id, c] as const),
);

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const SUMMARY_KEYS = [
  "disease overview",
  "cases overview",
  "overview",
  "mechanism",
  "Mechanism (MOA)",
  "Stem (brief)",
  "Takeaway (1 sentence)",
  "One-liner (Key concept)",
  "Explanation / Notes",
  "usage",
  "Indications",
];

export type MedicalRecordView = MedicalInboxRecord & {
  collectionId: MedicalCollectionId;
  fileKey: string;
  summary: string;
};

export type MedicalPropertyField = {
  label: string;
  kind: "text" | "list" | "links";
  text?: string;
  items?: string[];
  links?: Array<{ label: string; href: string }>;
};

function filePrefixOf(record: MedicalInboxRecord): string {
  // slug in inbox is page slug only; file key is reconstructed from id pattern
  // Prefer source title mapping; fall back to id prefix after "inbox-"
  const title = record.source.notionDatabaseTitle.trim().toLowerCase();
  for (const meta of MEDICAL_COLLECTIONS) {
    if (meta.notionTitles.some((t) => t.toLowerCase() === title)) {
      return meta.filePrefix;
    }
  }
  // id: inbox-{db-slug}-{page-slug} — recover db slug from known prefixes
  const without = record.id.replace(/^inbox-/, "");
  for (const meta of MEDICAL_COLLECTIONS) {
    if (without.startsWith(`${meta.filePrefix}-`)) return meta.filePrefix;
  }
  return "unknown";
}

export function collectionIdForRecord(
  record: MedicalInboxRecord,
): MedicalCollectionId | null {
  const prefix = filePrefixOf(record);
  const meta = MEDICAL_COLLECTIONS.find((c) => c.filePrefix === prefix);
  return meta?.id ?? null;
}

export function getMedicalCollection(
  id: string,
): MedicalCollectionMeta | undefined {
  return collectionById.get(id as MedicalCollectionId);
}

function asText(value: unknown): string | null {
  if (typeof value === "string") {
    const t = value.trim();
    return t.length ? t : null;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return null;
}

function isUuidList(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => typeof v === "string" && UUID_RE.test(v))
  );
}

function isStringList(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => typeof v === "string" && !UUID_RE.test(v))
  );
}

export function extractSummary(record: MedicalInboxRecord): string {
  const props = record.properties ?? {};
  for (const key of SUMMARY_KEYS) {
    const text = asText(props[key]);
    if (text) return text.length > 280 ? `${text.slice(0, 277)}…` : text;
  }
  for (const [key, value] of Object.entries(props)) {
    if (/overview|summary|mechanism|stem|takeaway|notes/i.test(key)) {
      const text = asText(value);
      if (text) return text.length > 280 ? `${text.slice(0, 277)}…` : text;
    }
  }
  return "";
}

function toView(record: MedicalInboxRecord): MedicalRecordView | null {
  const collectionId = collectionIdForRecord(record);
  if (!collectionId) return null;
  const meta = getMedicalCollection(collectionId)!;
  return {
    ...record,
    collectionId,
    fileKey: `${meta.filePrefix}--${record.slug}`,
    summary: extractSummary(record),
  };
}

const allViews: MedicalRecordView[] = (generatedInbox as MedicalInboxRecord[])
  .map(toView)
  .filter((v): v is MedicalRecordView => Boolean(v))
  .sort((a, b) => a.title.localeCompare(b.title));

/** Notion page UUID → record view (for relation resolution). */
const byNotionPageId = new Map(
  allViews.map((v) => [v.source.notionPageId, v] as const),
);

export function listMedicalCollections(): Array<
  MedicalCollectionMeta & { count: number }
> {
  return MEDICAL_COLLECTIONS.map((meta) => ({
    ...meta,
    count: allViews.filter((v) => v.collectionId === meta.id).length,
  })).filter((c) => c.count > 0);
}

export function listMedicalRecords(
  collectionId?: MedicalCollectionId,
): MedicalRecordView[] {
  if (!collectionId) return allViews;
  return allViews.filter((v) => v.collectionId === collectionId);
}

export function getMedicalRecord(
  collectionId: MedicalCollectionId,
  slug: string,
): MedicalRecordView | null {
  return (
    allViews.find((v) => v.collectionId === collectionId && v.slug === slug) ??
    null
  );
}

export function medicalRecordHref(record: MedicalRecordView): string {
  return `/medical/${record.collectionId}/${record.slug}/`;
}

export function listDisplayFields(
  record: MedicalRecordView,
): MedicalPropertyField[] {
  const fields: MedicalPropertyField[] = [];
  for (const [label, value] of Object.entries(record.properties ?? {})) {
    if (value == null) continue;
    if (typeof value === "object" && !Array.isArray(value)) {
      // skip { type: "files" } stubs etc.
      continue;
    }

    if (isUuidList(value)) {
      const links = value
        .map((id) => byNotionPageId.get(id))
        .filter((v): v is MedicalRecordView => Boolean(v))
        .map((v) => ({
          label: v.title,
          href: medicalRecordHref(v),
        }));
      if (links.length) {
        fields.push({ label, kind: "links", links });
      }
      continue;
    }

    if (isStringList(value)) {
      fields.push({ label, kind: "list", items: value });
      continue;
    }

    const text = asText(value);
    if (text) {
      fields.push({ label, kind: "text", text });
    }
  }
  return fields;
}

export function getMedicalStaticParams() {
  return allViews.map((v) => ({
    collection: v.collectionId,
    slug: v.slug,
  }));
}

export function getMedicalCollectionStaticParams() {
  return listMedicalCollections().map((c) => ({ collection: c.id }));
}
