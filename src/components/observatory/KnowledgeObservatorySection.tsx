import Link from "next/link";
import { SectionHeader } from "@/components/content/SectionHeader";
import { KnowledgeGraphPreview } from "@/components/observatory/KnowledgeGraphPreview";
import type {
  KnowledgeGraphPreview as GraphData,
  ObservatoryCopy,
} from "@/domain/entities";

type KnowledgeObservatorySectionProps = {
  graph: GraphData;
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
          <KnowledgeGraphPreview graph={graph} />
          <p className="mt-lab-3 font-mono text-code text-ink-faint">
            {copy.figureCaption}
          </p>
          <p className="mt-lab-5 font-sans text-meta text-ink-secondary">
            Medical study vault:{" "}
            <Link
              href="/knowledge/medical-basement/"
              className="text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              medical basement
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
