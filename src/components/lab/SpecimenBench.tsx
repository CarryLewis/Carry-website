import { getStructure, type LabSpecimen } from "@/data/lab-catalog";

type SpecimenBenchProps = {
  specimen: LabSpecimen;
};

/**
 * Live specimen stage — the primary surface for product iteration.
 * Meta lives in the dossier; this frame is the experiment itself.
 */
export function SpecimenBench({ specimen }: SpecimenBenchProps) {
  const structure = getStructure(specimen.structure);

  return (
    <section
      id="specimen-bench"
      aria-labelledby="specimen-stage-title"
      className="flex min-h-[72vh] flex-col border-b border-rule bg-surface-sunken lg:min-h-0 lg:border-b-0 lg:border-r"
    >
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-lab-3 border-b border-rule bg-surface-raised px-lab-4 py-lab-3">
        <div className="min-w-0">
          <p className="font-sans text-label uppercase text-ink-tertiary">
            Specimen · {structure?.label} → {structure?.form}
          </p>
          <h2
            id="specimen-stage-title"
            className="mt-lab-1 truncate font-serif text-body-ui text-ink"
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
            Open fullscreen
          </a>
          <a
            href="/html-design-lab/"
            className="font-sans text-meta text-ink-secondary hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Source lab shell
          </a>
        </div>
      </header>

      <div className="relative min-h-[72vh] flex-1 lg:min-h-0">
        <iframe
          key={specimen.id}
          title={`${specimen.name} live experiment`}
          src={specimen.embedUrl}
          className="absolute inset-0 h-full w-full border-0 bg-void"
          loading="lazy"
          allow="fullscreen"
        />
      </div>
    </section>
  );
}
