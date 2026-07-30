import { mkdir, writeFile, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(process.cwd());

export function contentDir(...parts: string[]): string {
  return join(ROOT, "content", ...parts);
}

export async function writeJson(filePath: string, data: unknown): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function clearSyncedModule(
  module: string,
  options?: { preserveExisting?: boolean },
): Promise<void> {
  if (options?.preserveExisting) return;
  // Only clear notion-inbox fully; for mapped modules we merge/overwrite by slug
  // and leave hand-authored files that were not overwritten.
  if (module === "notion-inbox") {
    const dir = contentDir("notion-inbox");
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });
    await writeFile(
      join(dir, ".gitkeep"),
      "",
      "utf8",
    );
  }
}

export async function writeRecord(
  module: string,
  slug: string,
  record: Record<string, unknown>,
): Promise<string> {
  if (module === "relations") {
    // Relations are aggregated into edges.json by the sync runner.
    return contentDir("relations", "edges.json");
  }
  const filePath = contentDir(module, `${slug}.json`);
  await writeJson(filePath, record);
  return filePath;
}
