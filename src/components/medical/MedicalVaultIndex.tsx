import Link from "next/link";
import type { MedicalCollectionMeta } from "@/content/medical";

type Props = {
  collections: Array<MedicalCollectionMeta & { count: number }>;
};

export function MedicalVaultIndex({ collections }: Props) {
  const total = collections.reduce((sum, c) => sum + c.count, 0);

  return (
    <section className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        <Link
          href="/knowledge/"
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Knowledge
        </Link>
        {" / Medical basement"}
      </p>
      <h1 className="mt-lab-3 font-serif text-page text-ink">
        medical basement
      </h1>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        Read-only mirror of the Notion medical-basement databases — lectures,
        diseases, drugs, cases, and study logs.
      </p>
      <p className="mt-lab-3 font-mono text-code text-ink-faint">
        {total} records · {collections.length} collections · synced from Notion
      </p>

      <ul className="mt-lab-8 divide-y divide-rule border-y border-rule">
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link
              href={`/knowledge/medical-basement/${collection.id}/`}
              className="group flex items-baseline justify-between gap-lab-4 py-lab-5 transition-colors duration-fast hover:bg-surface-raised/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <div className="min-w-0">
                <p className="font-sans text-label uppercase text-ink-tertiary">
                  {collection.label}
                </p>
                <h2 className="mt-lab-2 font-serif text-section text-ink group-hover:text-accent">
                  {collection.title}
                </h2>
                <p className="mt-lab-2 max-w-prose font-sans text-body-ui text-ink-secondary">
                  {collection.description}
                </p>
              </div>
              <span className="shrink-0 font-mono text-meta text-ink-faint">
                {collection.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
