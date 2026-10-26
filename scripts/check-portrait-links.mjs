import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, join } from "node:path";

// Verify the actual exported documents, including cross-page fragments and images.
// This catches static-export path regressions that a TypeScript build cannot.
const root = resolve("out");
const routes = [
  "/",
  "/thinking/",
  "/thinking/how-i-explore/",
  "/about/",
  "/projects/",
  "/observatory/",
  "/signals/",
];
const failures = [];
let checked = 0;
function fileFor(pathname) {
  const path = join(root, decodeURIComponent(pathname));
  return existsSync(path) && statSync(path).isDirectory()
    ? join(path, "index.html")
    : path;
}
for (const route of routes) {
  const file = fileFor(route);
  if (!existsSync(file)) {
    failures.push(`${route}: missing exported page`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  if ((html.match(/<h1\b/g) || []).length !== 1)
    failures.push(`${route}: expected one h1`);
  for (const match of html.matchAll(
    /<(?:a|img)\b[^>]*?\b(?:href|src)="([^"]+)"/g,
  )) {
    const url = new URL(
      match[1].replaceAll("&amp;", "&"),
      `https://carrylewis.com${route}`,
    );
    if (url.origin !== "https://carrylewis.com") continue;
    const target = fileFor(url.pathname);
    checked++;
    if (!existsSync(target)) {
      failures.push(`${route}: missing ${url.pathname}`);
      continue;
    }
    if (url.hash && target.endsWith(".html")) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!readFileSync(target, "utf8").includes(`id="${id}"`))
        failures.push(`${route}: missing fragment ${url.pathname}${url.hash}`);
    }
  }
}
if (readFileSync(join(root, "CNAME"), "utf8").trim() !== "carrylewis.com")
  failures.push("Custom domain changed");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${routes.length} exported pages, ${checked} local links/images, page headings, fragments and CNAME.`,
  );
