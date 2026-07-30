import type { Metadata } from "next";
import Link from "next/link";
import { contentRepository } from "@/data";

export const metadata: Metadata = {
  title: "Knowledge",
  description:
    "Personal knowledge graph and medical basement vault across medicine, AI, biology, and philosophy.",
};

export default async function KnowledgeIndexPage() {
  const collections = await contentRepository.listMedicalCollections();
  const medicalCount = collections.reduce((sum, c) => sum + c.count, 0);

  return (
    <section className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        Knowledge
      </p>
      <h1 className="mt-lab-3 font-serif text-page text-ink">
        Knowledge graph
      </h1>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        Concept nodes and medical study vaults connected through the same
        laboratory graph.
      </p>

      <div className="mt-lab-9 border-t border-rule pt-lab-8">
        <div className="flex flex-col gap-lab-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-label uppercase text-ink-tertiary">
              Vault
            </p>
            <h2 className="mt-lab-3 font-serif text-section text-ink">
              medical basement
            </h2>
            <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
              Notion-synced medical study vault — lectures, diseases, drugs,
              cases, and incorrect-question logs.
            </p>
          </div>
          <p className="shrink-0 font-mono text-meta text-ink-faint">
            {medicalCount} records · {collections.length} collections
          </p>
        </div>

        <ul className="mt-lab-7 divide-y divide-rule border-y border-rule">
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
                  <h3 className="mt-lab-2 font-serif text-section text-ink group-hover:text-accent">
                    {collection.title}
                  </h3>
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

        <Link
          href="/knowledge/medical-basement/"
          className="mt-lab-6 inline-flex font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Open medical basement overview →
        </Link>
      </div>
    </section>
  );
}
