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
        Concept nodes, relations, and reading notes will be mapped here.
      </p>
      <p className="mt-lab-6 font-mono text-code text-ink-faint">
        Route scaffolded · concept graph forthcoming
      </p>

      <div className="mt-lab-9 border-t border-rule pt-lab-8">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Vault
        </p>
        <Link
          href="/knowledge/medical-basement/"
          className="group mt-lab-4 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <h2 className="font-serif text-section text-ink transition-colors duration-fast group-hover:text-accent">
            medical basement
          </h2>
          <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
            Notion-synced medical study vault — lectures, diseases, drugs,
            cases, and incorrect-question logs.
          </p>
          <p className="mt-lab-3 font-mono text-meta text-ink-faint">
            {medicalCount} records · {collections.length} collections
          </p>
        </Link>
      </div>
    </section>
  );
}
