/**
 * Laboratory correspondence inbox.
 * POST /        — accept a tagged note from the static site
 * GET  /inbox   — token-gated HTML table of submissions
 * GET  /health  — liveness
 */

type Env = {
  DB: D1Database;
  INBOX_TOKEN: string;
};

type FeedbackSurface =
  | "observatory"
  | "project"
  | "lab"
  | "knowledge"
  | "site";

type SubmissionRow = {
  id: string;
  created_at: string;
  surface: string;
  target_id: string;
  target_title: string;
  page_path: string;
  specimen_id: string | null;
  specimen_name: string | null;
  name: string | null;
  email: string | null;
  message: string;
  user_agent: string | null;
};

const SURFACES = new Set<FeedbackSurface>([
  "observatory",
  "project",
  "lab",
  "knowledge",
  "site",
]);

const ALLOWED_ORIGINS = new Set([
  "https://carrylewis.com",
  "https://www.carrylewis.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 8;
const hits = new Map<string, number[]>();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true }, 200, cors);
    }

    if (request.method === "GET" && url.pathname === "/inbox") {
      return handleInbox(url, env);
    }

    if (request.method === "POST" && (url.pathname === "/" || url.pathname === "")) {
      return handleSubmit(request, env, cors);
    }

    if (request.method === "GET" && (url.pathname === "/" || url.pathname === "")) {
      return json(
        {
          service: "laboratory-feedback",
          routes: ["POST /", "GET /inbox?token=", "GET /health"],
        },
        200,
        cors,
      );
    }

    return json({ error: "not found" }, 404, cors);
  },
};

async function handleSubmit(
  request: Request,
  env: Env,
  cors: Headers,
): Promise<Response> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (!allowRequest(ip)) {
    return json({ error: "rate limited" }, 429, cors);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid json" }, 400, cors);
  }

  const parsed = parsePayload(body);
  if (!parsed.ok) {
    return json({ error: parsed.error }, 400, cors);
  }

  if (parsed.value.hp) {
    return json({ ok: true }, 200, cors);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const userAgent = (request.headers.get("User-Agent") ?? "").slice(0, 300);

  await env.DB.prepare(
    `INSERT INTO submissions (
      id, created_at, surface, target_id, target_title, page_path,
      specimen_id, specimen_name, name, email, message, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      createdAt,
      parsed.value.surface,
      parsed.value.targetId,
      parsed.value.targetTitle,
      parsed.value.pagePath,
      parsed.value.specimenId,
      parsed.value.specimenName,
      parsed.value.name,
      parsed.value.email,
      parsed.value.message,
      userAgent || null,
    )
    .run();

  return json({ ok: true }, 200, cors);
}

async function handleInbox(url: URL, env: Env): Promise<Response> {
  const token = url.searchParams.get("token") ?? "";
  if (!env.INBOX_TOKEN || !safeEqual(token, env.INBOX_TOKEN)) {
    return new Response("unauthorized", {
      status: 401,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const { results } = await env.DB.prepare(
    `SELECT id, created_at, surface, target_id, target_title, page_path,
            specimen_id, specimen_name, name, email, message, user_agent
     FROM submissions
     ORDER BY created_at DESC
     LIMIT 500`,
  ).all<SubmissionRow>();

  return new Response(renderInbox(results ?? []), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function parsePayload(body: unknown):
  | { ok: true; value: NormalizedPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "invalid body" };
  }
  const raw = body as Record<string, unknown>;
  const surface = asString(raw.surface);
  if (!SURFACES.has(surface as FeedbackSurface)) {
    return { ok: false, error: "invalid surface" };
  }
  const targetId = clip(asString(raw.targetId), 80);
  const targetTitle = clip(asString(raw.targetTitle), 200);
  const pagePath = clip(asString(raw.pagePath), 300) || "/";
  const message = clip(asString(raw.message), 4000);
  if (!targetId || !targetTitle || !message) {
    return { ok: false, error: "missing fields" };
  }
  const email = clip(asString(raw.email), 200);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid email" };
  }
  return {
    ok: true,
    value: {
      surface: surface as FeedbackSurface,
      targetId,
      targetTitle,
      pagePath,
      specimenId: clip(asString(raw.specimenId), 80) || null,
      specimenName: clip(asString(raw.specimenName), 200) || null,
      name: clip(asString(raw.name), 120) || null,
      email: email || null,
      message,
      hp: asString(raw.hp),
    },
  };
}

type NormalizedPayload = {
  surface: FeedbackSurface;
  targetId: string;
  targetTitle: string;
  pagePath: string;
  specimenId: string | null;
  specimenName: string | null;
  name: string | null;
  email: string | null;
  message: string;
  hp: string;
};

function allowRequest(ip: string): boolean {
  const now = Date.now();
  const times = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (times.length >= RATE_LIMIT) {
    hits.set(ip, times);
    return false;
  }
  times.push(now);
  hits.set(ip, times);
  return true;
}

function corsHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    vary: "Origin",
  });
  if (origin && isAllowedOrigin(origin)) {
    headers.set("access-control-allow-origin", origin);
  }
  return headers;
}

function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (isLocalhost(origin)) return true;
  try {
    return new URL(origin).hostname === "carrylewis.github.io";
  } catch {
    return false;
  }
}

function isLocalhost(origin: string): boolean {
  try {
    const url = new URL(origin);
    return url.hostname === "localhost" || url.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function json(
  data: unknown,
  status: number,
  cors: Headers,
): Response {
  const headers = new Headers(cors);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(data), { status, headers });
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function clip(value: string, max: number): string {
  return value.length > max ? value.slice(0, max) : value;
}

function safeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  if (left.byteLength !== right.byteLength) return false;
  let diff = 0;
  for (let i = 0; i < left.byteLength; i += 1) {
    diff |= left[i] ^ right[i];
  }
  return diff === 0;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function renderInbox(rows: SubmissionRow[]): string {
  const body =
    rows.length === 0
      ? `<p class="empty">No notes yet.</p>`
      : `<table>
          <thead>
            <tr>
              <th>When</th>
              <th>Regarding</th>
              <th>Page</th>
              <th>From</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(renderRow).join("")}
          </tbody>
        </table>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Laboratory correspondence</title>
  <style>
    :root {
      --void: #07090c;
      --surface: #0d1117;
      --raised: #151b24;
      --ink: #e8eef6;
      --secondary: #a7b3c5;
      --tertiary: #6b7a90;
      --faint: #3d4a5c;
      --accent: #3d8f8c;
      --rule: #243041;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--void);
      color: var(--ink);
      font-family: "IBM Plex Sans", "Helvetica Neue", sans-serif;
    }
    header {
      border-bottom: 1px solid var(--rule);
      padding: 32px 40px;
    }
    .label {
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--tertiary);
      margin: 0;
    }
    h1 {
      font-family: Georgia, "Source Serif 4", serif;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.015em;
      margin: 12px 0 0;
    }
    .meta {
      margin: 12px 0 0;
      color: var(--secondary);
      font-size: 13px;
    }
    main { padding: 24px 40px 64px; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td {
      border-bottom: 1px solid var(--rule);
      text-align: left;
      vertical-align: top;
      padding: 14px 12px 14px 0;
    }
    th {
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--tertiary);
      font-weight: 500;
    }
    td { font-size: 14px; color: var(--ink); }
    .regarding { color: var(--accent); }
    .page, .when, .from { color: var(--secondary); font-size: 13px; }
    .note { white-space: pre-wrap; max-width: 42rem; }
    .empty { color: var(--tertiary); }
    code {
      font-family: "IBM Plex Mono", Menlo, monospace;
      font-size: 12px;
      color: var(--faint);
    }
  </style>
</head>
<body>
  <header>
    <p class="label">Inbox</p>
    <h1>Laboratory correspondence</h1>
    <p class="meta">${rows.length} note${rows.length === 1 ? "" : "s"} · tagged by surface and record</p>
  </header>
  <main>${body}</main>
</body>
</html>`;
}

function renderRow(row: SubmissionRow): string {
  const regarding = `${escapeHtml(row.surface)} · ${escapeHtml(row.target_title)}`;
  const specimen = row.specimen_name
    ? `<br /><code>specimen · ${escapeHtml(row.specimen_name)}</code>`
    : "";
  const from = [row.name, row.email].filter(Boolean).map((value) => escapeHtml(value as string));
  return `<tr>
    <td class="when">${escapeHtml(row.created_at.replace("T", " ").replace("Z", " UTC"))}</td>
    <td class="regarding">${regarding}${specimen}</td>
    <td class="page"><code>${escapeHtml(row.page_path)}</code></td>
    <td class="from">${from.length ? from.join("<br />") : "—"}</td>
    <td class="note">${escapeHtml(row.message)}</td>
  </tr>`;
}
