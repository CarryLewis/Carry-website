import { SectionHeader } from "@/components/content/SectionHeader";
import { ExplorationCard } from "@/components/observatory/ExplorationCard";
import type { Exploration } from "@/domain/entities";

type ExplorationSectionProps = {
  explorations: Exploration[];
};

export function ExplorationSection({ explorations }: ExplorationSectionProps) {
  return (
    <section className="border-b border-rule bg-surface">
      <div className="mx-auto max-w-shell px-margin py-lab-9">
        <SectionHeader
          label="Current Exploration"
          title="Intellectual focus"
          description="Active lines of inquiry across medicine, computation, and knowledge systems."
        />

        <div className="mt-lab-7 grid gap-lab-5 md:grid-cols-2 xl:grid-cols-3">
          {explorations.map((item) => (
            <ExplorationCard key={item.id} exploration={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
