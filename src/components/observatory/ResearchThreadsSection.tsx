import Link from "next/link";
import { SectionHeader } from "@/components/content/SectionHeader";
import { ResearchThreadCard } from "@/components/observatory/ResearchThreadCard";
import type { ResearchThread } from "@/domain/entities";

type ResearchThreadsSectionProps = {
  threads: ResearchThread[];
};

export function ResearchThreadsSection({
  threads,
}: ResearchThreadsSectionProps) {
  return (
    <section className="border-b border-rule bg-void">
      <div className="mx-auto max-w-shell px-margin py-lab-9">
        <div className="flex flex-col gap-lab-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="Research Threads"
            title="Active questions"
            description="Exploration begins with questions — not polished outcomes."
          />
          <Link
            href="/research"
            className="shrink-0 font-sans text-meta text-ink-secondary hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            All research →
          </Link>
        </div>

        <div className="mt-lab-7 border-t border-rule">
          {threads.map((thread) => (
            <ResearchThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      </div>
    </section>
  );
}
