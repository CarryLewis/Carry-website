import { translate, htmlLanguage, type Locale } from "@/i18n";
import { localizedProject } from "@/i18n/projects";
import type { Metadata } from "next";
import Link from "@/components/ui/LocalizedLink";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { contentRepository } from "@/data";

export const metadata: Metadata = {
  title: "作品",
  description: "从问题出发的工具与实验：心电模拟、AI 辅助评阅与知识系统。",
};

export default async function ProjectsContent({
  locale = "zh",
}: { locale?: Locale } = {}) {
  const t = (text: string) => translate(locale, text);
  const projects = (await contentRepository.listProjects()).map((project) =>
    localizedProject(project, locale),
  );

  return (
    <section
      lang={htmlLanguage(locale)}
      className="mx-auto max-w-shell px-margin py-lab-9"
    >
      <p className="font-sans text-label uppercase text-ink-tertiary">
        {t("WORK / 作品")}
      </p>
      <h1 className="mt-lab-3 font-serif text-page text-ink">
        {t("把理解，付诸实践。")}
      </h1>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        {t(
          "每个作品从一个具体问题出发。项目记录保留实现方式与取舍；开发中和原型代表当前阶段， 不等于已经完成的产品。可运行的项目提供演示，其余入口通向项目说明或源码。",
        )}
      </p>

      <ul className="mt-lab-8 grid gap-lab-5">
        {projects.map((project) => (
          <li
            key={project.id}
            className="border border-rule bg-surface-raised p-lab-5"
          >
            <div className="flex flex-wrap items-center gap-lab-3">
              <Link
                href={`/projects/${project.status}/${project.slug}/`}
                className="font-serif text-section text-ink hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {project.title}
              </Link>
              <StatusIndicator status={project.status} locale={locale} />
            </div>
            <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
              {project.summary}
            </p>
            <div className="mt-lab-4 flex flex-wrap gap-lab-3">
              <Link
                href={`/projects/${project.status}/${project.slug}/`}
                className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {t("项目记录 →")}
              </Link>
              {project.downloadUrl ? (
                <a
                  href={project.downloadUrl}
                  className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t("下载源码 ZIP ↓")}
                </a>
              ) : null}
              {project.showcaseUrl ? (
                <Link
                  href={project.showcaseUrl}
                  className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t("打开作品展示 →")}
                </Link>
              ) : project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  className="font-sans text-meta text-ink-secondary hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t("打开演示")}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
