import { SectionHeader } from "@/components/content/SectionHeader";
import { ExplorationCard } from "@/components/observatory/ExplorationCard";
import type { IntellectualFocus, SectionCopy } from "@/domain/entities";

type ExplorationSectionProps = {
  items: IntellectualFocus[];
  copy: SectionCopy;
};

export function ExplorationSection({ items, copy }: ExplorationSectionProps) {
  return (
    <section className="border-b border-rule bg-surface">
      <div className="mx-auto max-w-shell px-margin py-lab-9">
        <SectionHeader
          label={copy.label}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-lab-7 grid gap-lab-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ExplorationCard key={item.id} focus={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
