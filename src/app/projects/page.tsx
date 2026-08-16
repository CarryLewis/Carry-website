import type { Metadata } from "next";
import Link from "next/link";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { contentRepository } from "@/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Active builds, prototypes, experiments, and archived systems.",
};

export default async function ProjectsIndexPage() {
  const projects = await contentRepository.listProjects();

  return (
    <section className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        Projects
      </p>
      <h1 className="mt-lab-3 font-serif text-page text-ink">
        Build laboratory
      </h1>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        Things under construction — each record links problem, architecture,
        and (when available) a runnable demo.
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
              <StatusIndicator status={project.status} />
            </div>
            <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
              {project.summary}
            </p>
            <div className="mt-lab-4 flex flex-wrap gap-lab-3">
              <Link
                href={`/projects/${project.status}/${project.slug}/`}
                className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Project record →
              </Link>
              {project.showcaseUrl ? (
                <Link
                  href={project.showcaseUrl}
                  className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Open atlas →
                </Link>
              ) : project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  className="font-sans text-meta text-ink-secondary hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Open demo
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
