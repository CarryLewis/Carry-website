import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knowledge",
  description:
    "Personal knowledge graph, medical basement vault, and Thinking Vault talk.",
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
          href="/knowledge/medical-basement/"
          className="group mt-lab-4 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
          href="/knowledge/thinking-vault/"
          className="group mt-lab-7 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <h2 className="font-serif text-section text-ink transition-colors duration-fast group-hover:text-accent">
            Thinking Vault
          </h2>
          <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
            HTML talk from Research Brief — Notion as the input layer, Obsidian
            as the memory/graph. Arrow keys or space to advance.
          </p>
        </Link>
      </div>
    </section>
  );
}
