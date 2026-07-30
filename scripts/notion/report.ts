import type { ContentModule } from "./mapping.config";
import type { DiscoveredDatabase } from "./discover";

export type SyncReportEntry = {
  databaseId: string;
  databaseTitle: string;
  module: ContentModule;
  via: "override" | "heuristic";
  pagesSynced: number;
  pagesFailed: number;
  warnings: string[];
  errors: string[];
};

export type SyncReport = {
  rootPageId: string;
  startedAt: string;
  finishedAt: string;
  databases: SyncReportEntry[];
  discovered: DiscoveredDatabase[];
  totals: {
    databases: number;
    mapped: number;
    inbox: number;
    pagesSynced: number;
    pagesFailed: number;
  };
};

export function printReport(report: SyncReport): void {
  console.log("\n=== Notion → Content OS sync report ===");
  console.log(`Root page: ${report.rootPageId}`);
  console.log(
    `Databases: ${report.totals.databases} (mapped ${report.totals.mapped}, inbox ${report.totals.inbox})`,
  );
  console.log(
    `Pages: synced ${report.totals.pagesSynced}, failed ${report.totals.pagesFailed}`,
  );
  console.log("");

  for (const entry of report.databases) {
    const flag = entry.module === "notion-inbox" ? "inbox" : "ok";
    console.log(
      `[${flag}] ${entry.databaseTitle} → ${entry.module} (${entry.via}) · ${entry.pagesSynced} rows`,
    );
    for (const w of entry.warnings.slice(0, 5)) {
      console.log(`  warn: ${w}`);
    }
    for (const e of entry.errors.slice(0, 5)) {
      console.log(`  error: ${e}`);
    }
  }
  console.log("=======================================\n");
}
