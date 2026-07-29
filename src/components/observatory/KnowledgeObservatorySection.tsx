import Link from "next/link";
import { SectionHeader } from "@/components/content/SectionHeader";
import { KnowledgeGraphPreview } from "@/components/observatory/KnowledgeGraphPreview";
import type { KnowledgeGraphPreview as GraphData } from "@/domain/entities";

type KnowledgeObservatorySectionProps = {
  graph: GraphData;
};

export function KnowledgeObservatorySection({
  graph,
}: KnowledgeObservatorySectionProps) {
  return (
    <section className="border-b border-rule bg-surface">
      <div className="mx-auto max-w-shell px-margin py-lab-9">
        <div className="flex flex-col gap-lab-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            label="Knowledge Observatory"
            title="Connected concepts"
            description="A preview of the personal knowledge graph — relations first, pages second."
          />
          <Link
            href="/knowledge"
            className="shrink-0 font-sans text-meta text-ink-secondary hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Enter knowledge →
          </Link>
        </div>

        <div className="mt-lab-7">
          <KnowledgeGraphPreview graph={graph} />
          <p className="mt-lab-3 font-mono text-code text-ink-faint">
            fig.02 — neighborhood around Human Systems · placeholder data
          </p>
        </div>
      </div>
    </section>
  );
}
