import type { Metadata } from "next";
import Link from "next/link";

type StubPageProps = {
  title: string;
  label: string;
  description: string;
};

export function StubPage({ title, label, description }: StubPageProps) {
  return (
    <section className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">{label}</p>
      <h1 className="mt-lab-3 font-serif text-page text-ink">{title}</h1>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        {description}
      </p>
      <p className="mt-lab-6 font-mono text-code text-ink-faint">
        Route scaffolded · content forthcoming
      </p>
      <Link
        href="/"
        className="mt-lab-7 inline-flex font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        ← Return to Observatory
      </Link>
    </section>
  );
}

export function stubMetadata(title: string, description: string): Metadata {
  return { title, description };
}
