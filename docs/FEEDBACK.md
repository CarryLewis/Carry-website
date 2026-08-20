# Laboratory correspondence

The public site is a static GitHub Pages export. Forms therefore POST to a
separate Cloudflare Worker, which writes tagged notes into D1. The Worker
HTML inbox is the receiving backend.

```
Visitor  →  FeedbackPanel  →  POST Worker  →  D1 submissions
                                   ↓
                             GET /inbox?token=
```

## Site forms

Entrances (each tagged with a `target`):

| Surface | Route | Default regarding |
|---|---|---|
| Observatory | `/` below Information radar | Information radar (selector open) |
| Project record | `/projects/<status>/<slug>/` | that project |
| Lab | `/lab/` after the specimen bench | HTML Design Lab + current specimen |
| Knowledge | `/knowledge/research-brief/`, `/knowledge/medical-basement/` | that vault |
| Correspondence | `/contact/` and footer | Site-wide (selector open) |

Build-time endpoint: `NEXT_PUBLIC_FEEDBACK_ENDPOINT` (no trailing slash).

Set it as a GitHub Actions **variable** on this repository so Pages builds
point at the Worker:

```
NEXT_PUBLIC_FEEDBACK_ENDPOINT=https://laboratory-feedback.<account>.workers.dev
```

If the variable is empty, the form renders but stays disabled.

## Worker

Code: [`workers/feedback/`](../workers/feedback/).

D1 `laboratory-feedback` already exists in the Cloudflare account
(`0a59e66a-cd6e-425a-b2a7-935db528c60f`); `schema.sql` is applied.

| Route | Role |
|---|---|
| `POST /` | Accept JSON notes. CORS limited to carrylewis.com, GitHub Pages, and localhost. Honeypot field `hp` is dropped silently. ~8 notes / 10 min / IP. |
| `GET /inbox?token=` | Token-gated HTML table, newest first. Filter visually by the Regarding column. |
| `GET /health` | `{ ok: true }` |

### Deploy

From `workers/feedback/`, while logged into Wrangler:

```bash
npx wrangler deploy
openssl rand -hex 24 | npx wrangler secret put INBOX_TOKEN
```

Or from GitHub: **Actions → Deploy feedback worker → Run workflow**, after
these repository secrets exist:

- `CLOUDFLARE_API_TOKEN` — token with Workers and D1 edit
- `CLOUDFLARE_ACCOUNT_ID`
- `FEEDBACK_INBOX_TOKEN` — the inbox password (optional on first run; required for `/inbox`)

Open the inbox:

```
https://laboratory-feedback.<account>.workers.dev/inbox?token=<INBOX_TOKEN>
```

Optional: bind a custom host such as `feedback.carrylewis.com` in the
Cloudflare dashboard if DNS already sits on Cloudflare.

To re-apply the schema:

```bash
npx wrangler d1 execute laboratory-feedback --remote --file=./schema.sql
```

### Local Worker

```bash
cd workers/feedback
printf 'INBOX_TOKEN=dev-inbox\n' > .dev.vars
npx wrangler dev
```

Point the Next app at it:

```
NEXT_PUBLIC_FEEDBACK_ENDPOINT=http://127.0.0.1:8787
```

## Payload

```json
{
  "targetId": "proj-ecg-simulator",
  "targetTitle": "ECG Simulator",
  "surface": "project",
  "pagePath": "/projects/active/ecg-simulator/",
  "specimenId": "mechanism-v01",
  "specimenName": "Labeled control loop",
  "name": "optional",
  "email": "optional@example.com",
  "message": "required",
  "hp": ""
}
```

`surface` is one of `observatory | project | lab | knowledge | site`.
