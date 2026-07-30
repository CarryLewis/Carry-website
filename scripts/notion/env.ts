import { config as loadDotenv } from "dotenv";
import { resolve } from "node:path";

loadDotenv({ path: resolve(process.cwd(), ".env") });
loadDotenv({ path: resolve(process.cwd(), ".env.local") });

const DEFAULT_ROOT_PAGE_ID = "574ee033-c41d-83bd-828f-8118c9820b27";

/** Normalize Notion IDs that may omit dashes. */
export function normalizeNotionId(raw: string): string {
  const compact = raw.replace(/-/g, "").trim();
  if (!/^[a-f0-9]{32}$/i.test(compact)) {
    throw new Error(`Invalid Notion ID: ${raw}`);
  }
  return [
    compact.slice(0, 8),
    compact.slice(8, 12),
    compact.slice(12, 16),
    compact.slice(16, 20),
    compact.slice(20),
  ].join("-");
}

export type NotionEnv = {
  token: string;
  rootPageId: string;
};

export function getNotionEnv(options?: { requireToken?: boolean }): NotionEnv | null {
  const requireToken = options?.requireToken ?? true;
  const token = process.env.NOTION_TOKEN?.trim();
  const rootRaw =
    process.env.NOTION_ROOT_PAGE_ID?.trim() || DEFAULT_ROOT_PAGE_ID;

  if (!token) {
    if (requireToken) return null;
    return { token: "", rootPageId: normalizeNotionId(rootRaw) };
  }

  return {
    token,
    rootPageId: normalizeNotionId(rootRaw),
  };
}

export function requireNotionEnv(): NotionEnv {
  const env = getNotionEnv({ requireToken: true });
  if (!env?.token) {
    throw new Error(
      "NOTION_TOKEN is required. Create a read-only Internal Integration, share the medical-basement page with it, then set NOTION_TOKEN in .env (see .env.example).",
    );
  }
  return env;
}
