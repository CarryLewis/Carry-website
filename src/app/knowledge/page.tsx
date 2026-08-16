import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knowledge",
  description:
    "Personal knowledge graph, Research Brief observatory, medical basement vault, and HTML Design Lab atlas.",
};

export default function KnowledgeIndexPage() {
  return (
    <section className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        Knowledge
      </p>
      <h1 className="mt-lab-3 font-serif text-page text-ink">
        Knowledge graph
      </h1>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        Concept nodes and linked study vaults in the laboratory graph.
      </p>

      <div className="mt-lab-9 border-t border-rule pt-lab-8">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Vault
        </p>
        <Link
          href="/knowledge/research-brief/"
          className="group mt-lab-4 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <h2 className="font-serif text-section text-ink transition-colors duration-fast group-hover:text-accent">
            Research Brief
          </h2>
          <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
            Latest HTML from CarryLewis/research_brief — MUJI Observatory
            homepage. Quiet knowledge objects rendered from the vault.
          </p>
        </Link>
        <Link
          href="/knowledge/medical-basement/"
          className="group mt-lab-7 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <h2 className="font-serif text-section text-ink transition-colors duration-fast group-hover:text-accent">
            medical basement
          </h2>
          <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
            Live mirror of the Notion medical-basement workspace — databases,
            views, and notes as published on the web.
          </p>
        </Link>
        <Link
          href="/lab/"
          className="group mt-lab-7 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <h2 className="font-serif text-section text-ink transition-colors duration-fast group-hover:text-accent">
            HTML Design Lab
          </h2>
          <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
            Structure Atlas — experiments filed by information structure.
            Form follows the shape of the knowledge, not fashion.
          </p>
        </Link>
      </div>
    </section>
  );
}
