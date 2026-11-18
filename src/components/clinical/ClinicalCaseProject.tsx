import { readFileSync } from "node:fs";
import { join } from "node:path";
import postcss from "postcss";
import ClinicalCaseArticle from "./ClinicalCaseArticle";

/** Build-time reuse of our reviewed HTML; no remote or user-supplied markup. */
export default function ClinicalCaseProject() {
  const html = readFileSync(join(process.cwd(), "public/clinical-case-workspace/index.html"), "utf8");
  const main = html.match(/<main class="shell">([\s\S]*?)<\/main>/)?.[1];
  const dialog = html.match(/<dialog\b[\s\S]*?<\/dialog>/)?.[0];
  const originalCss = html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  if (!main || !dialog || !originalCss) throw new Error("Clinical project dossier structure is missing");
  const markup = `<div class="shell">${main.replace(/<footer>[\s\S]*?<\/footer>/, "")}</div>${dialog}`
    .replace(/\b(src|data-image)="assets\//g, '$1="/clinical-case-workspace/assets/');
  if (/<script\b|\bon\w+\s*=/i.test(markup)) throw new Error("Executable markup is not allowed in the project body");

  // Scope every selector so the original design cannot style the site navigation.
  const styles = postcss.parse(originalCss);
  styles.walkRules((rule) => {
    rule.selectors = rule.selectors.map((selector) =>
      [":root", "html", "body"].includes(selector)
        ? ".clinical-case-article"
        : `.clinical-case-article ${selector}`,
    );
  });
  const css = styles.toString() + "\n.clinical-case-article{display:block;width:100%;min-width:0}.clinical-case-article ul{list-style:disc}.clinical-case-article .hero{padding-top:40px}";
  return <ClinicalCaseArticle markup={markup} css={css} />;
}
