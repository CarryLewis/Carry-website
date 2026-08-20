import Link from "next/link";
import { getStructure, type LabSpecimen } from "@/data/lab-catalog";

type SpecimenBenchProps = {
  specimen: LabSpecimen;
};

/**
 * Live specimen framed as a site demo panel — same chrome as project records
 * and the Research Brief player: label bar, fullscreen link, sunken iframe.
 */
export function SpecimenBench({ specimen }: SpecimenBenchProps) {
  const structure = getStructure(specimen.structure);

  return (
    <section
      id="specimen-bench"
      aria-labelledby="specimen-stage-title"
      className="scroll-mt-header border border-rule bg-surface-sunken"
    >
      <header className="flex flex-wrap items-center justify-between gap-lab-3 border-b border-rule bg-surface-raised px-lab-4 py-lab-3">
        <div className="min-w-0">
          <p className="font-sans text-label uppercase text-ink-tertiary">
            Demo · {structure?.label} → {structure?.form}
          </p>
          <h2
            id="specimen-stage-title"
            className="mt-lab-1 font-serif text-section text-ink"
          >
            {specimen.name}
            <span className="ml-lab-2 font-mono text-code text-ink-faint">
              {specimen.version}
            </span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-lab-4">
          <a
            href={specimen.embedUrl}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Open fullscreen ↗
          </a>
          <Link
            href="/html-design-lab/"
            className="font-sans text-meta text-ink-secondary hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Source lab shell
          </Link>
        </div>
      </header>
      <iframe
        key={specimen.id}
        title={`${specimen.name} live experiment`}
        src={specimen.embedUrl}
        className="w-full border-0 bg-void"
        style={{ minHeight: "70vh" }}
        loading="lazy"
        allow="fullscreen"
      />
    </section>
  );
}
