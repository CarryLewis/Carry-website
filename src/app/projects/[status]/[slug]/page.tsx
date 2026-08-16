import type { Metadata } from "next";
import Link from "next/link";
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
  const { slug } = await params;
  const project = await contentRepository.getProject(slug);
  if (!project) {
    return { title: "Project", description: "Project documentation." };
  }
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { status, slug } = await params;
  const project = await contentRepository.getProject(slug);

  if (!project || project.status !== status) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        <Link
          href="/projects/"
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Projects
        </Link>
        {" / "}
        {project.status}
      </p>

      <div className="mt-lab-3 flex flex-wrap items-center gap-lab-3">
        <h1 className="font-serif text-page text-ink">{project.title}</h1>
        <StatusIndicator status={project.status} />
      </div>

      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        {project.summary}
      </p>

      {(project.demoUrl || project.repoUrl || project.showcaseUrl) && (
        <div className="mt-lab-6 flex flex-wrap gap-lab-3">
          {project.showcaseUrl ? (
            <a
              href={project.showcaseUrl}
              className="inline-flex h-10 items-center justify-center bg-accent px-lab-4 font-sans text-meta text-ink-inverse transition-colors duration-fast ease-lab hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open showcase
            </a>
          ) : project.demoUrl ? (
            <a
              href={project.demoUrl}
              className="inline-flex h-10 items-center justify-center bg-accent px-lab-4 font-sans text-meta text-ink-inverse transition-colors duration-fast ease-lab hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open live demo
            </a>
          ) : null}
          {project.showcaseUrl && project.demoUrl ? (
            <a
              href={project.demoUrl}
              className="inline-flex h-10 items-center justify-center border border-rule px-lab-4 font-sans text-meta text-ink transition-colors duration-fast ease-lab hover:border-rule-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open source gallery
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center border border-rule px-lab-4 font-sans text-meta text-ink transition-colors duration-fast ease-lab hover:border-rule-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View source ↗
            </a>
          ) : null}
        </div>
      )}

      <dl className="mt-lab-8 grid gap-lab-7 border-t border-rule pt-lab-7">
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Problem
          </dt>
          <dd className="mt-lab-2 max-w-prose font-sans text-body-ui text-ink">
            {project.problem}
          </dd>
        </div>
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Architecture
          </dt>
          <dd className="mt-lab-2 max-w-prose font-sans text-body-ui text-ink">
            {project.architecture}
          </dd>
        </div>
        {project.designPhilosophy ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              Design philosophy
            </dt>
            <dd className="mt-lab-2 max-w-prose font-sans text-body-ui text-ink">
              {project.designPhilosophy}
            </dd>
          </div>
        ) : null}
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Technology
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

      {project.demoUrl && project.demoUrl !== project.showcaseUrl ? (
        <section className="mt-lab-9 border border-rule bg-surface-sunken">
          <div className="flex flex-wrap items-center justify-between gap-lab-3 border-b border-rule px-lab-4 py-lab-3">
            <p className="font-sans text-label uppercase text-ink-tertiary">
              Demo
            </p>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open fullscreen ↗
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
