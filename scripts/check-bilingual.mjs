import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const core = [
  "",
  "about/",
  "thinking/",
  "thinking/how-i-explore/",
  "projects/",
  "signals/",
  "journal/",
];
const failures = [];
let links = 0;
const fileFor = (p) => {
  const f = join("out", decodeURIComponent(p));
  return existsSync(f) && statSync(f).isDirectory() ? join(f, "index.html") : f;
};
for (const prefix of ["/", "/en/"])
  for (const route of core) {
    const file = fileFor(prefix + route);
    if (!existsSync(file)) {
      failures.push(`Missing ${file}`);
      continue;
    }
    const html = readFileSync(file, "utf8"),
      en = prefix === "/en/";
    if (!html.includes(`<html lang="${en ? "en" : "zh-CN"}"`))
      failures.push(`Incorrect html language: ${file}`);
    if (!html.includes('hrefLang="en"') && !html.includes('hreflang="en"'))
      failures.push(`Missing English alternate: ${file}`);
    if (
      !html.includes('hrefLang="zh-CN"') &&
      !html.includes('hreflang="zh-CN"')
    )
      failures.push(`Missing Chinese alternate: ${file}`);
    if ((html.match(/<h1\b/g) || []).length !== 1)
      failures.push(`Expected a single h1: ${file}`);
    for (const match of html.matchAll(
      /<(?:a|img)\b[^>]*?\b(?:href|src)="([^"]+)"/g,
    )) {
      const url = new URL(
        match[1].replaceAll("&amp;", "&"),
        `https://carrylewis.com${prefix}${route}`,
      );
      if (url.origin !== "https://carrylewis.com") continue;
      links++;
      const target = fileFor(url.pathname);
      if (!existsSync(target)) {
        failures.push(`${file}: missing ${url.pathname}`);
        continue;
      }
      if (
        url.hash &&
        target.endsWith(".html") &&
        !readFileSync(target, "utf8").includes(
          `id="${decodeURIComponent(url.hash.slice(1))}"`,
        )
      )
        failures.push(`${file}: missing ${url.pathname}${url.hash}`);
    }
    if (en && !["journal/", "thinking/", "signals/"].includes(route)) {
      const visible = html
        .replace(/<script\b[\s\S]*?<\/script>/g, "")
        .replace(/<style\b[\s\S]*?<\/style>/g, "")
        .replace(/<[^>]*>/g, "")
        .replaceAll("中文", "");
      if (/[\u4e00-\u9fff]/.test(visible))
        failures.push(`Untranslated core text: ${file}`);
    }
  }
// Every authored project has a working counterpart and a correct root language.
const enProjects = join("out/en/projects");
if (existsSync(enProjects))
  for (const status of readdirSync(enProjects)) {
    const dir = join(enProjects, status);
    if (!statSync(dir).isDirectory()) continue;
    for (const slug of readdirSync(dir)) {
      const file = join(dir, slug, "index.html");
      if (!existsSync(file)) continue;
      if (!existsSync(join("out/projects", status, slug, "index.html")))
        failures.push(`Missing Chinese project: ${slug}`);
      if (!readFileSync(file, "utf8").includes('<html lang="en"'))
        failures.push(`Incorrect project language: ${slug}`);
    }
  }
if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Verified ${core.length * 2} bilingual entry pages, ${links} links/images, language metadata and project counterparts.`,
  );
