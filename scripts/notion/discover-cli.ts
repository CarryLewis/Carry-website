/**
 * Discover child databases under NOTION_ROOT_PAGE_ID (medical-basement).
 * Usage: npm run discover:notion
 */
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createNotionClient } from "./client";
import { discoverDatabases } from "./discover";
import { requireNotionEnv } from "./env";
import { resolveModule } from "./mapping.config";

async function main() {
  const env = requireNotionEnv();
  const client = createNotionClient(env.token);
  console.log(`Discovering databases under ${env.rootPageId}…`);
  const databases = await discoverDatabases(client, env.rootPageId);

  const rows = databases.map((db) => {
    const { module, via } = resolveModule(db.id, db.title);
    return { ...db, inferredModule: module, via };
  });

  console.log(`Found ${rows.length} database(s):\n`);
  for (const row of rows) {
    console.log(
      `- ${row.title}\n  id: ${row.id}\n  module: ${row.inferredModule} (${row.via})\n  url: ${row.url}`,
    );
  }

  const outPath = resolve(process.cwd(), "content/notion-inbox/_discovery.json");
  await writeFile(
    outPath,
    `${JSON.stringify({ rootPageId: env.rootPageId, databases: rows }, null, 2)}\n`,
    "utf8",
  );
  console.log(`\nWrote ${outPath}`);
  console.log(
    "Tip: copy database ids into scripts/notion/mapping.config.ts → databaseOverrides for explicit mapping.",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
