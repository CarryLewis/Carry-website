import { htmlLanguage, pageMetadata, type Locale } from "@/i18n";
import { localizedProject } from "@/i18n/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/LocalizedLink";
import { notFound } from "next/navigation";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { contentRepository, getProjectsForStaticParams } from "@/data";

type Props = {
  params: Promise<{ status: string; slug: string }>;
};

export async function generateStaticParams() {
  return getProjectsForStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { status, slug } = await params;
  const project = await contentRepository.getProject(slug);
  if (!project) {
    return { title: "Project", description: "Project documentation." };
  }
  const translated = localizedProject(project, "zh");
  return pageMetadata(
    "zh",
    `/projects/${status}/${slug}/`,
    translated.title,
    translated.summary,
  );
}

export default async function ProjectContent({
  params,
  locale = "zh",
}: Props & { locale?: Locale }) {
  const { status, slug } = await params;
  const source = await contentRepository.getProject(slug);
  const project = source ? localizedProject(source, locale) : null;
  const t = (zh: string, en: string) => (locale === "en" ? en : zh);

  if (!project || project.status !== status) {
    notFound();
  }

  return (
    <article
      lang={htmlLanguage(locale)}
      className="mx-auto max-w-shell px-margin py-lab-9"
    >
      <p className="font-sans text-label uppercase text-ink-tertiary">
        <Link
          href="/projects/"
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t("作品", "Projects")}
        </Link>
        {" / "}
        {project.status}
      </p>

      <div className="mt-lab-3 flex flex-wrap items-center gap-lab-3">
        <h1 className="font-serif text-page text-ink">{project.title}</h1>
        <StatusIndicator status={project.status} locale={locale} />
      </div>

      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        {project.summary}
      </p>
      <p className="mt-lab-3 font-mono text-meta text-ink-tertiary">
        {t("更新于", "Updated")}
        {project.updatedAt}
      </p>

      {(project.demoUrl ||
        project.repoUrl ||
        project.showcaseUrl ||
        project.downloadUrl) && (
        <div className="mt-lab-6 flex flex-wrap gap-lab-3">
          {project.showcaseUrl ? (
            <a
              href={
                project.showcaseUrl === "/lab/"
                  ? locale === "en"
                    ? "/en/lab/"
                    : "/lab/"
                  : project.showcaseUrl
              }
              className="inline-flex h-10 items-center justify-center bg-accent px-lab-4 font-sans text-meta text-ink-inverse transition-colors duration-fast ease-lab hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("打开作品展示", "Open showcase")}
            </a>
          ) : project.demoUrl ? (
            <a
              href={project.demoUrl}
              className="inline-flex h-10 items-center justify-center bg-accent px-lab-4 font-sans text-meta text-ink-inverse transition-colors duration-fast ease-lab hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("打开演示", "Open live demo")}
            </a>
          ) : null}
          {project.showcaseUrl && project.demoUrl ? (
            <a
              href={project.demoUrl}
              className="inline-flex h-10 items-center justify-center border border-rule px-lab-4 font-sans text-meta text-ink transition-colors duration-fast ease-lab hover:border-rule-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("打开实验原站", "Open source gallery")}
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center border border-rule px-lab-4 font-sans text-meta text-ink transition-colors duration-fast ease-lab hover:border-rule-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("查看源码 ↗", "View source \u2197")}
            </a>
          ) : null}
          {project.downloadUrl ? (
            <a
              href={project.downloadUrl}
              className="inline-flex h-10 items-center justify-center border border-rule px-lab-4 font-sans text-meta text-ink transition-colors duration-fast ease-lab hover:border-rule-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("下载源码 ZIP ↓", "Download source ZIP \u2193")}
            </a>
          ) : null}
        </div>
      )}
      {project.downloadNotes ? (
        <p className="mt-lab-3 max-w-prose font-sans text-meta text-ink-secondary">
          {project.downloadNotes}
        </p>
      ) : null}
      {project.resourceLinks?.length ? (
        <nav
          aria-label="Project resources"
          className="mt-lab-4 flex flex-wrap gap-lab-4"
        >
          {project.resourceLinks.map((resource) => (
            <a
              key={resource.href}
              href={resource.href}
              className="font-sans text-meta text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {resource.label} ↗
            </a>
          ))}
        </nav>
      ) : null}

      <dl className="mt-lab-8 grid gap-lab-7 border-t border-rule pt-lab-7">
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            {t("问题", "Problem")}
          </dt>
          <dd className="mt-lab-2 max-w-prose whitespace-pre-line font-sans text-body-ui text-ink">
            {project.problem}
          </dd>
        </div>
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            {t("实现结构", "Architecture")}
          </dt>
          <dd className="mt-lab-2 max-w-prose whitespace-pre-line font-sans text-body-ui text-ink">
            {project.architecture}
          </dd>
        </div>
        {project.designPhilosophy ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              {t("设计取舍", "Design philosophy")}
            </dt>
            <dd className="mt-lab-2 max-w-prose whitespace-pre-line font-sans text-body-ui text-ink">
              {project.designPhilosophy}
            </dd>
          </div>
        ) : null}
        {project.workflow?.length ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              {t("使用流程", "Workflow")}
            </dt>
            <dd className="mt-lab-4 max-w-prose">
              <ol className="list-decimal space-y-lab-3 pl-lab-5 font-sans text-body-ui text-ink">
                {project.workflow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </dd>
          </div>
        ) : null}
        {project.implementation ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              {t("当前实现", "Implementation")}
            </dt>
            <dd className="mt-lab-2 max-w-prose whitespace-pre-line font-sans text-body-ui text-ink">
              {project.implementation}
            </dd>
          </div>
        ) : null}
        {project.reflection ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              {t("反思与后续", "Reflection & next steps")}
            </dt>
            <dd className="mt-lab-2 max-w-prose whitespace-pre-line font-sans text-body-ui text-ink">
              {project.reflection}
            </dd>
          </div>
        ) : null}
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            {t("技术", "Technology")}
          </dt>
          <dd className="mt-lab-2 flex flex-wrap gap-lab-2">
            {project.technology.map((tech) => (
              <span
                key={tech}
                className="border border-rule px-lab-2 py-1 font-mono text-code text-ink-secondary"
              >
                {tech}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      {project.screenshots?.length ? (
        <section
          className="mt-lab-9 border-t border-rule pt-lab-7"
          aria-labelledby="project-specimens"
        >
          <h2
            id="project-specimens"
            className="font-sans text-label uppercase text-ink-tertiary"
          >
            {t("界面记录", "Interface specimens")}
          </h2>
          <div className="mt-lab-5 grid gap-lab-7">
            {project.screenshots.map((specimen) => (
              <figure key={specimen.src}>
                <a
                  href={specimen.src}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-rule focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Image
                    src={specimen.src}
                    alt={specimen.alt}
                    width={specimen.width}
                    height={specimen.height}
                    className="block h-auto w-full"
                  />
                </a>
                <figcaption className="mt-lab-3 max-w-prose font-sans text-meta text-ink-secondary">
                  {specimen.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {project.demoUrl && project.demoUrl !== project.showcaseUrl ? (
        <section className="mt-lab-9 border border-rule bg-surface-sunken">
          <div className="flex flex-wrap items-center justify-between gap-lab-3 border-b border-rule px-lab-4 py-lab-3">
            <p className="font-sans text-label uppercase text-ink-tertiary">
              {t("演示", "Demo")}
            </p>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t("全屏打开 ↗", "Open fullscreen \u2197")}
            </a>
          </div>
          <iframe
            title={`${project.title} demo`}
            src={project.demoUrl}
            className="w-full border-0 bg-void"
            style={{ minHeight: "70vh" }}
            loading="lazy"
            allow="fullscreen"
          />
        </section>
      ) : null}
    </article>
  );
}
