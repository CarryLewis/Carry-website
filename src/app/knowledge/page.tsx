import type { Metadata } from "next";
import Link from "next/link";
import { contentRepository } from "@/data";

export const metadata: Metadata = {
  title: "Knowledge",
  description:
    "Practice field summaries, Research Brief observatory, medical basement vault, and HTML Design Lab atlas.",
};

export default async function KnowledgeIndexPage() {
  const fields = await contentRepository.listPracticeFields();

  return (
    <section className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        Knowledge
      </p>
      <h1 className="mt-lab-3 font-serif text-page text-ink">
        Practice fields
      </h1>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        Each field is a working plate on this site — not an abstract concept.
        Open a summary to see the vaults, projects, and questions that belong
        to it.
      </p>

      <ul className="mt-lab-9 grid gap-lab-5 border-t border-rule pt-lab-8">
        {fields.map((field) => (
          <li key={field.id}>
            <Link
              href={`/knowledge/${field.slug}/`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <h2 className="font-serif text-section text-ink transition-colors duration-fast group-hover:text-accent">
                {field.label}
              </h2>
              <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
                {field.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>

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
            Structure Bench — experiments filed by information structure.
            Form follows the shape of the knowledge, not fashion.
          </p>
        </Link>
      </div>
    </section>
  );
}
