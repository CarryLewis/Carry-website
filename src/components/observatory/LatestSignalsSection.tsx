import Link from "next/link";
import { SectionHeader } from "@/components/content/SectionHeader";
import { SignalCard } from "@/components/observatory/SignalCard";
import type { ObservatoryCopy, Signal } from "@/domain/entities";

type LatestSignalsSectionProps = {
  signals: Signal[];
  copy: ObservatoryCopy["signals"];
};

export function LatestSignalsSection({
  signals,
  copy,
}: LatestSignalsSectionProps) {
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
            href="/signals"
            className="shrink-0 font-sans text-meta text-ink-secondary hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copy.ctaLabel}
          </Link>
        </div>

        <div className="mt-lab-7 grid gap-lab-4">
          {signals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </div>
    </section>
  );
}
