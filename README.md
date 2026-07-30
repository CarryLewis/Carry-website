# Carry Lewis — Digital Laboratory

Personal digital laboratory at [carrylewis.com](https://carrylewis.com):

**Digital Laboratory + Scientific Journal + Personal Knowledge Observatory**

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Dark-first Laboratory Editorial design system (`docs/DESIGN_SYSTEM.md`)
- Content OS: `/content/*.json` → `ContentRepository` (LocalJSON)
- medical basement: public Notion site embed under Knowledge

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

## medical basement

Mirrored Notion page (Share to web), not imported as JSON:

- Site entry: `/knowledge/medical-basement`
- Source: https://serious-fireplace-18e.notion.site/medical-basement-574ee033c41d83bd828f8118c9820b27

## Structure

- `docs/CONTENT_OS.md` — content modules and update workflow
- `docs/ARCHITECTURE.md` — technical architecture
- `docs/DESIGN_SYSTEM.md` — visual identity
- `content/` — Content OS JSON for laboratory entities

Meaningful entity content for Research / Projects / etc. lives in `/content`.  
medical basement content is edited in Notion and mirrored via embed.
