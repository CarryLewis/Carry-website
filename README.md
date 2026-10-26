# Carry Lewis — Personal Observatory · v1.0

Personal digital laboratory at [carrylewis.com](https://carrylewis.com):

**个人观测站：认识一个人，发现共同问题，探索真实作品。**

第二版首页、思考与关于页面的结构和内容边界见 [网站蓝图](docs/WEBSITE_V1_BLUEPRINT.md)。第一版首页保留于 `/observatory/`；原有研究、项目、Lab 和知识路径继续可用。

首页编辑文案集中于 `src/data/portrait.ts`。已公开的 GitHub 主页是本轮唯一联系入口。

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- 纸白与青绿色的 Personal Observatory 排版；沿用第一版衬线字体与关系图语言。旧版设计文档 `docs/DESIGN_SYSTEM.md` 保留为历史背景，以 `docs/WEBSITE_V1_BLUEPRINT.md` 和当前 tokens 为准。
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

### Embedded ECG Stimulator

The interactive ECG app from [`CarryLewis/ECG-stimulator`](https://github.com/CarryLewis/ECG-stimulator) is built and copied into `public/ecg-simulator/`, served at `/ecg-simulator/`.

Source tip is pinned in `ecg-embed.ref` (currently **`cursor/pathology-ecg-models-fab9`** — ECG `main` was reverted to anatomy-only).

#### Auto-sync (Method C)

When ECG pushes to `main` or the pinned embed branch, it can notify this repo via `repository_dispatch` (`ecg-updated`), which rebuilds and redeploys Pages automatically.

One-time setup (needs push access to ECG-stimulator + a PAT):

1. Create a GitHub PAT that can access **Carry-website** (classic: `repo` scope).
2. Install the notify workflow + secret:

```bash
export WEBSITE_DISPATCH_TOKEN=ghp_your_token_here
bash scripts/install-ecg-notify-workflow.sh
```

Template only: `docs/templates/ecg-notify-website.yml`

Manual test after setup:

```bash
gh workflow run "Notify website to rebuild ECG embed" --repo CarryLewis/ECG-stimulator
# or:
gh api repos/CarryLewis/Carry-website/dispatches -f event_type='ecg-updated'
```

#### Manual refresh

```bash
bash scripts/sync-ecg-stimulator.sh
# or pin another tip:
# ECG_REF=main bash scripts/sync-ecg-stimulator.sh
```

CI also rebuilds from `ecg-embed.ref` on every site deploy (`push` to `main`, `workflow_dispatch`, or `repository_dispatch`).

### Embedded Research Brief HTML

The MUJI Observatory homepage from [`CarryLewis/research_brief`](https://github.com/CarryLewis/research_brief) (`frontend/`) is copied into `public/research-brief/`, served at `/research-brief/`, and listed at `/knowledge/research-brief/` and `/projects/active/research-brief/`.

The Thinking Vault talk is unpublished until a later HTML replaces it.

Source tip is pinned in `research-brief-embed.ref`.

```bash
bash scripts/sync-research-brief.sh
```

See `docs/RESEARCH_BRIEF_EMBED.md`.

### Embedded HTML Design Lab

Isolated visual experiments from [`CarryLewis/HTML-Design-Lab`](https://github.com/CarryLewis/HTML-Design-Lab) are copied into `public/html-design-lab/` (`/html-design-lab/`).

The designed viewing surface is the **Structure Bench** at `/lab/`: experiments are filed by information structure (relationship, sequence, process, …), not by visual style, with a live specimen stage for iteration.

Source tip is pinned in `html-design-lab-embed.ref`.

#### Manual refresh (type the lab ref)

No PAT. On this repo: **Actions → Deploy to GitHub Pages → Run workflow**. Type the HTML-Design-Lab branch in **html_design_lab_ref** (example: `cursor/design-knowledge-guide-aab1`). Leave it blank to use the pin file.

Until this lands on `main`, run the workflow from branch `cursor/sync-design-guide-aab1` so the input field exists.

Do not type HTML-Design-Lab `main` until that branch holds the lab.

```bash
# local vendor copy (optional):
bash scripts/sync-html-design-lab.sh
```

See `docs/HTML_DESIGN_LAB_EMBED.md`.

## Structure

### Labwise project

Labwise (English lab-report review assistance) is listed at
`/projects/prototype/lab-report-assistant/`, linked from the homepage exploration
and AI practice field. It includes bilingual project notes, fictional interface
specimens and a complete-source ZIP link. The Python application runs locally;
no online grading backend is deployed on this static website.

See `docs/LABWISE_PROJECT.md` for content records, screenshot provenance and updates.

- `docs/CONTENT_OS.md` — content modules, sync rules, update workflow
- `docs/ARCHITECTURE.md` — technical architecture
- `docs/DESIGN_SYSTEM.md` — visual identity
- Knowledge → **Research Brief** — MUJI Observatory homepage at `/research-brief/`
- Knowledge → **medical basement** — Notion Sites embed (`/ebd/…` iframe)
- Lab → **HTML Design Lab** — Structure Bench at `/lab/`, source shell at `/html-design-lab/`

Meaningful content lives in `src/data/*`. UI components only render data.
medical basement is edited in Notion (Share → Publish); the site iframes the embed URL at `/knowledge/medical-basement`.
Research Brief HTML is synced from CarryLewis/research_brief (`docs/RESEARCH_BRIEF_EMBED.md`).
