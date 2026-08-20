import Link from "next/link";
import { SectionHeader } from "@/components/content/SectionHeader";
import { PracticeDerivationGraph } from "@/components/observatory/PracticeDerivationGraph";
import type { ObservatoryCopy, PracticeGraph } from "@/domain/entities";

type KnowledgeObservatorySectionProps = {
  graph: PracticeGraph;
  copy: ObservatoryCopy["knowledge"];
};

export function KnowledgeObservatorySection({
  graph,
  copy,
}: KnowledgeObservatorySectionProps) {
  return (
    <section className="border-b border-rule bg-surface">
      <div className="mx-auto max-w-shell px-margin py-lab-9">
        <div className="flex flex-col gap-lab-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            label={copy.label}
            title={copy.title}
            description={copy.description}
          />
          <Link
            href="/knowledge/"
            className="shrink-0 font-sans text-meta text-ink-secondary hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.ctaLabel}
          </Link>
        </div>

        <div className="mt-lab-7">
          <PracticeDerivationGraph
            graph={graph}
            figureCaption={copy.figureCaption}
          />
        </div>
      </div>
    </section>
  );
}
