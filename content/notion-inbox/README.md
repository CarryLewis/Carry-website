# Notion inbox

Unmapped Notion databases land here during `npm run sync:notion`.

- Entity payloads: `*.json` (one row per file)
- Reports (ignored by content manifest): `_discovery.json`, `_sync-report.json`

To promote a database into a Content OS module, add its ID to
`scripts/notion/mapping.config.ts` → `databaseOverrides`, then re-sync.
