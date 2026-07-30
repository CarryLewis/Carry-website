/**
 * Sync Notion medical-basement databases → /content Content OS (read-only).
 * Usage: npm run sync:notion
 *
 * Uses Notion API 2025+ dataSources.query (via collectAllDataSourceRows).
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Client } from "@notionhq/client";
import { collectAllDataSourceRows, isFullDatabase, isFullPage } from "@notionhq/client";
import { createNotionClient } from "./client";
import { discoverDatabases } from "./discover";
import { requireNotionEnv } from "./env";
import { resolveModule, type ContentModule } from "./mapping.config";
import { mapPage, type MapContext, type SyncPage } from "./mappers";
import { printReport, type SyncReport, type SyncReportEntry } from "./report";
import { clearSyncedModule, contentDir, writeJson, writeRecord } from "./write";

async function resolveDataSourceId(
  client: Client,
  databaseId: string,
): Promise<string> {
  const db = await client.databases.retrieve({ database_id: databaseId });
  if (!isFullDatabase(db)) {
    throw new Error(`Incomplete database response for ${databaseId}`);
  }
  const source = db.data_sources[0];
  if (!source?.id) {
    throw new Error(`No data_sources on database ${databaseId}`);
  }
  return source.id;
}

async function queryAllPages(
  client: Client,
  databaseId: string,
): Promise<SyncPage[]> {
  const dataSourceId = await resolveDataSourceId(client, databaseId);
  const rows = await collectAllDataSourceRows(client, {
    data_source_id: dataSourceId,
  });

  const pages: SyncPage[] = [];
  for (const item of rows) {
    if (!isFullPage(item)) continue;
    pages.push({
      id: item.id,
      created_time: item.created_time,
      last_edited_time: item.last_edited_time,
      url: item.url,
      properties: item.properties as SyncPage["properties"],
    });
  }
  return pages;
}

async function main() {
  const env = requireNotionEnv();
  const client = createNotionClient(env.token);
  const startedAt = new Date().toISOString();

  console.log(`Syncing Notion page ${env.rootPageId} (read-only)…`);
  const discovered = await discoverDatabases(client, env.rootPageId);
  if (discovered.length === 0) {
    console.warn(
      "No databases found. Ensure the integration is invited to the page and its child databases.",
    );
  }

  await clearSyncedModule("notion-inbox");

  const idIndex = new Map<string, string>();
  const relationEdges: Array<Record<string, unknown>> = [];
  const entries: SyncReportEntry[] = [];
  let pagesSynced = 0;
  let pagesFailed = 0;

  type Pending = {
    module: ContentModule;
    via: "override" | "heuristic";
    databaseId: string;
    databaseTitle: string;
    pages: SyncPage[];
  };
  const pending: Pending[] = [];

  for (const db of discovered) {
    const { module, via } = resolveModule(db.id, db.title);
    let pages: SyncPage[] = [];
    try {
      pages = await queryAllPages(client, db.id);
    } catch (err) {
      entries.push({
        databaseId: db.id,
        databaseTitle: db.title,
        module,
        via,
        pagesSynced: 0,
        pagesFailed: 0,
        warnings: [],
        errors: [`query failed: ${String(err)}`],
      });
      continue;
    }
    pending.push({
      module,
      via,
      databaseId: db.id,
      databaseTitle: db.title,
      pages,
    });
  }

  // Pass 1: register Notion page id → content id
  for (const item of pending) {
    const ctx: MapContext = {
      idIndex,
      module: item.module,
      databaseTitle: item.databaseTitle,
    };
    for (const page of item.pages) {
      try {
        mapPage(item.module, page, ctx, {
          databaseId: item.databaseId,
          databaseTitle: item.databaseTitle,
        });
      } catch {
        // registration best-effort
      }
    }
  }

  // Pass 2: map with full idIndex and write files
  for (const item of pending) {
    const warnings: string[] = [];
    const errors: string[] = [];
    let synced = 0;
    let failed = 0;
    const ctx: MapContext = {
      idIndex,
      module: item.module,
      databaseTitle: item.databaseTitle,
    };

    for (const page of item.pages) {
      try {
        const mapped = mapPage(item.module, page, ctx, {
          databaseId: item.databaseId,
          databaseTitle: item.databaseTitle,
        });
        warnings.push(...mapped.warnings.map((w) => `${mapped.slug}: ${w}`));

        if (item.module === "relations") {
          if (
            mapped.record.from &&
            mapped.record.to &&
            mapped.record.from !== "unknown" &&
            mapped.record.to !== "unknown"
          ) {
            relationEdges.push(mapped.record);
            synced += 1;
            pagesSynced += 1;
          } else {
            failed += 1;
            pagesFailed += 1;
            errors.push(`${mapped.slug}: skipped incomplete relation`);
          }
          continue;
        }

        await writeRecord(item.module, mapped.slug, mapped.record);
        synced += 1;
        pagesSynced += 1;
      } catch (err) {
        failed += 1;
        pagesFailed += 1;
        errors.push(`${page.id}: ${String(err)}`);
      }
    }

    entries.push({
      databaseId: item.databaseId,
      databaseTitle: item.databaseTitle,
      module: item.module,
      via: item.via,
      pagesSynced: synced,
      pagesFailed: failed,
      warnings,
      errors,
    });
  }

  if (relationEdges.length > 0) {
    const edgesPath = contentDir("relations", "edges.json");
    let existing: {
      version?: number;
      edges?: Array<Record<string, unknown>>;
    } = { version: 1, edges: [] };
    try {
      existing = JSON.parse(await readFile(edgesPath, "utf8"));
    } catch {
      // start from empty shell
    }

    const byId = new Map<string, Record<string, unknown>>();
    for (const edge of existing.edges ?? []) {
      if (edge.id) byId.set(String(edge.id), edge);
    }
    for (const edge of relationEdges) {
      byId.set(String(edge.id), edge);
    }

    await writeJson(edgesPath, {
      $schema: "../schemas/relations-collection.schema.json",
      version: existing.version ?? 1,
      edges: [...byId.values()],
    });
  }

  const { generateContentManifest } = await import("../content/generate-manifest");
  await generateContentManifest();

  const finishedAt = new Date().toISOString();
  const mappedCount = entries.filter((e) => e.module !== "notion-inbox").length;
  const inboxCount = entries.filter((e) => e.module === "notion-inbox").length;

  const report: SyncReport = {
    rootPageId: env.rootPageId,
    startedAt,
    finishedAt,
    databases: entries,
    discovered,
    totals: {
      databases: entries.length,
      mapped: mappedCount,
      inbox: inboxCount,
      pagesSynced,
      pagesFailed,
    },
  };

  const reportPath = resolve(
    process.cwd(),
    "content/notion-inbox/_sync-report.json",
  );
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  printReport(report);
  console.log(`Report written to ${reportPath}`);

  const hardFail =
    pagesFailed > 0 &&
    pagesSynced === 0 &&
    entries.some((e) => e.module !== "notion-inbox");
  if (hardFail) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
