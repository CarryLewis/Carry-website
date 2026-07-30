import Link from "next/link";
import { SectionHeader } from "@/components/content/SectionHeader";
import { ResearchThreadCard } from "@/components/observatory/ResearchThreadCard";
import type { ActiveQuestion, SectionCopy } from "@/domain/entities";

type ResearchThreadsSectionProps = {
  questions: ActiveQuestion[];
  copy: SectionCopy;
};

export function ResearchThreadsSection({
  questions,
  copy,
}: ResearchThreadsSectionProps) {
  return (
    <section className="border-b border-rule bg-void">
      <div className="mx-auto max-w-shell px-margin py-lab-9">
        <div className="flex flex-col gap-lab-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label={copy.label}
            title={copy.title}
            description={copy.description}
          />
          <Link
            href="/research"
            className="shrink-0 font-sans text-meta text-ink-secondary hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            All research →
          </Link>
        </div>

        <div className="mt-lab-7 border-t border-rule">
          {questions.map((question) => (
            <ResearchThreadCard key={question.id} question={question} />
          ))}
        </div>
      </div>
    </section>
  );
}
