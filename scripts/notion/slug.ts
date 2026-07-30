/** Stable kebab-case slug from a title or id fragment. */
export function toSlug(input: string, fallback = "untitled"): string {
  const slug = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return slug || fallback;
}

export function entityId(prefix: string, slug: string): string {
  const clean = toSlug(slug);
  if (clean.startsWith(`${prefix}-`)) return clean;
  return `${prefix}-${clean}`;
}
