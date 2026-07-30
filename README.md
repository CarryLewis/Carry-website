# Carry Lewis — Digital Laboratory

Personal digital laboratory at [carrylewis.com](https://carrylewis.com):

**Digital Laboratory + Scientific Journal + Personal Knowledge Observatory**

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Dark-first Laboratory Editorial design system (`docs/DESIGN_SYSTEM.md`)
- Content via local mock repository (Notion/CMS adapters later)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Static export output: `out/` (GitHub Pages).

## Structure

- `docs/CONTENT_OS.md` — content modules, sync rules, update workflow
- `docs/ARCHITECTURE.md` — technical architecture
- `docs/DESIGN_SYSTEM.md` — visual identity
- Knowledge → **medical basement** — public Notion site embed

Meaningful content lives in `src/data/*`. UI components only render data.
medical basement content is edited in Notion and mirrored at `/knowledge/medical-basement`.
