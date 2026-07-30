# Carry Lewis — Digital Laboratory

Personal digital laboratory at [carrylewis.com](https://carrylewis.com):

**Digital Laboratory + Scientific Journal + Personal Knowledge Observatory**

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Dark-first Laboratory Editorial design system (`docs/DESIGN_SYSTEM.md`)
- Content OS: `/content/*.json` → `ContentRepository` (LocalJSON)
- Optional Notion sync (read-only, build-time)

## Develop

```bash
npm install
npm run content:manifest
npm run dev
```

## Build

```bash
npm run build
```

Static export output: `out/` (GitHub Pages).

## Notion sync (read-only)

Maps databases under the [medical-basement](https://app.notion.com/p/medical-basement-574ee033c41d83bd828f8118c9820b27) page into Content OS modules.

1. Create a Notion **Internal Integration** with **Read content** only.
2. Share the medical-basement page (and child databases) with that integration.
3. Copy `.env.example` → `.env` and set `NOTION_TOKEN`.
4. Discover databases, then sync:

```bash
npm run discover:notion
npm run sync:notion
```

Unmapped databases are preserved under `content/notion-inbox/`.  
Override mappings in `scripts/notion/mapping.config.ts` (`databaseOverrides`).

CI: if `NOTION_TOKEN` is set as a GitHub Actions secret, deploy runs sync before build.

## Structure

- `docs/CONTENT_OS.md` — content modules, sync rules, update workflow
- `docs/ARCHITECTURE.md` — technical architecture
- `docs/DESIGN_SYSTEM.md` — visual identity
- `content/` — single source of truth (JSON)
- `scripts/notion/` — read-only Notion → Content OS sync

Meaningful entity content lives in `/content`. UI components only render data.
