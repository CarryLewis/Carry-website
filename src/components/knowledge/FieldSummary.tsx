import Link from "next/link";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import type { PracticeFieldRecord } from "@/data";
import { cn } from "@/lib/cn";

function withSlash(href: string) {
  return href.endsWith("/") ? href : `${href}/`;
}

type FieldSummaryProps = {
  record: PracticeFieldRecord;
  className?: string;
};

/**
 * Aggregated view of a practice field: vaults, projects, questions, signals.
 * Content is resolved by the repository — this component only renders.
 */
export function FieldSummary({ record, className }: FieldSummaryProps) {
  const { field, projects, questions, signals, focus, concepts, connectedFields } =
    record;
  const primaryVault = field.vaults[0];
  const hasBody =
    field.vaults.length > 0 ||
    projects.length > 0 ||
    focus.length > 0 ||
    questions.length > 0 ||
    signals.length > 0 ||
    connectedFields.length > 0;

  return (
    <article className={cn("mx-auto max-w-shell px-margin py-lab-9", className)}>
      <p className="font-sans text-label uppercase text-ink-tertiary">
        <Link
          href="/knowledge/"
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Knowledge
        </Link>
        {" / "}
        {field.label}
      </p>

      <div className="mt-lab-3 flex flex-wrap items-center gap-lab-3">
        <h1 className="font-serif text-page text-ink">{field.label}</h1>
        <StatusIndicator status={field.status} />
      </div>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        {field.thesis}
      </p>

      {primaryVault ? (
        <div className="mt-lab-6 flex flex-wrap gap-lab-3">
          <Link
            href={primaryVault.href}
            className="inline-flex h-10 items-center justify-center bg-accent px-lab-4 font-sans text-meta text-ink-inverse transition-colors duration-fast ease-lab hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open {primaryVault.label}
          </Link>
          {field.vaults.slice(1).map((vault) => (
            <Link
              key={vault.href}
              href={vault.href}
              className="inline-flex h-10 items-center justify-center border border-rule px-lab-4 font-sans text-meta text-ink transition-colors duration-fast ease-lab hover:border-rule-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {vault.label}
            </Link>
          ))}
        </div>
      ) : null}

      {concepts.length > 0 ? (
        <div className="mt-lab-6 flex flex-wrap gap-lab-2">
          {concepts.map((concept) => (
            <span
              key={concept.id}
              className="border border-rule px-lab-2 py-1 font-mono text-code text-ink-secondary"
            >
              {concept.name}
            </span>
          ))}
        </div>
      ) : null}

      {hasBody ? (
      <dl className="mt-lab-8 grid gap-lab-8 border-t border-rule pt-lab-8">
        {connectedFields.length > 0 ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              Joins
            </dt>
            <dd className="mt-lab-4 flex flex-wrap gap-lab-3">
              {connectedFields.map((item) => (
                <Link
                  key={item.id}
                  href={`/knowledge/${item.slug}/`}
                  className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              ))}
            </dd>
          </div>
        ) : null}

        {field.vaults.length > 0 ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              On this site
            </dt>
            <dd className="mt-lab-4 grid gap-lab-4">
              {field.vaults.map((vault) => (
                <Link
                  key={vault.href}
                  href={vault.href}
                  className="group block border border-rule bg-surface-raised p-lab-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <p className="font-serif text-section text-ink transition-colors duration-fast group-hover:text-accent">
                    {vault.label}
                  </p>
                  <p className="mt-lab-2 max-w-prose font-sans text-body-ui text-ink-secondary">
                    {vault.description}
                  </p>
                </Link>
              ))}
            </dd>
          </div>
        ) : null}

        {projects.length > 0 ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              Projects
            </dt>
            <dd className="mt-lab-4 grid gap-lab-4">
              {projects.map((project) => (
                <div
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
                </div>
              ))}
            </dd>
          </div>
        ) : null}

        {focus.length > 0 ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              Intellectual focus
            </dt>
            <dd className="mt-lab-4 grid gap-lab-3">
              {focus.map((item) => (
                <p key={item.id} className="max-w-prose font-sans text-body-ui">
                  <span className="text-ink">{item.title}</span>
                  <span className="text-ink-secondary"> — {item.description}</span>
                </p>
              ))}
            </dd>
          </div>
        ) : null}

        {questions.length > 0 ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              Active questions
            </dt>
            <dd className="mt-lab-4 grid gap-lab-3">
              {questions.map((question) => (
                <Link
                  key={question.id}
                  href={
                    question.href
                      ? withSlash(question.href)
                      : `/research/${question.category}/${question.slug}/`
                  }
                  className="font-sans text-body-ui text-ink hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {question.question}
                </Link>
              ))}
            </dd>
          </div>
        ) : null}

        {signals.length > 0 ? (
          <div>
            <dt className="font-sans text-label uppercase text-ink-tertiary">
              Related signals
            </dt>
            <dd className="mt-lab-4 grid gap-lab-3">
              {signals.map((signal) => (
                <p key={signal.id} className="max-w-prose font-sans text-body-ui">
                  <span className="text-ink">{signal.title}</span>
                  <span className="text-ink-secondary"> — {signal.summary}</span>
                </p>
              ))}
            </dd>
          </div>
        ) : null}
      </dl>
      ) : (
        <p className="mt-lab-8 max-w-prose font-sans text-body-ui text-ink-tertiary">
          This plate is on the graph. Vaults, projects, and questions will
          appear here as they are recorded.
        </p>
      )}
    </article>
  );
}
