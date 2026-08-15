import type { Metadata } from "next";
import Link from "next/link";

export const RESEARCH_BRIEF_HOME_URL = "/research-brief/";
export const RESEARCH_BRIEF_REPO_URL =
  "https://github.com/CarryLewis/research_brief";

export const metadata: Metadata = {
  title: "Research Brief",
  description:
    "MUJI Observatory homepage from Research Brief — a quiet personal knowledge environment.",
};

export default function ResearchBriefPage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col bg-void">
      <div className="flex flex-wrap items-center justify-between gap-lab-3 border-b border-rule bg-surface-raised px-margin py-lab-3">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          <Link
            href="/knowledge/"
            className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Knowledge
          </Link>
          {" / Research Brief"}
        </p>
        <div className="flex flex-wrap gap-lab-4">
          <a
            href={RESEARCH_BRIEF_HOME_URL}
            className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open fullscreen
          </a>
          <a
            href={RESEARCH_BRIEF_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-meta text-ink-secondary hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Source ↗
          </a>
        </div>
      </div>

      <iframe
        title="Research Brief Observatory"
        src={RESEARCH_BRIEF_HOME_URL}
        className="w-full flex-1 border-0 bg-surface"
        style={{ minHeight: "calc(100vh - 7rem)" }}
        loading="lazy"
        allowFullScreen
      />
    </section>
  );
}
