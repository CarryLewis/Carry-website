import { Tag } from "@/components/ui/Tag";
import { getStructure, type LabSpecimen } from "@/data/lab-catalog";

type SpecimenBenchProps = {
  specimen: LabSpecimen;
};

/**
 * Instrument panel for a live experiment.
 * Meta first (problem, structure, form), then the framed specimen.
 */
export function SpecimenBench({ specimen }: SpecimenBenchProps) {
  const structure = getStructure(specimen.structure);

  return (
    <section
      id="specimen-bench"
      aria-labelledby="specimen-title"
      className="border border-rule bg-surface-raised"
    >
      <header className="border-b border-rule px-lab-5 py-lab-5">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Specimen · {structure?.label} → {structure?.form}
        </p>
        <h2
          id="specimen-title"
          className="mt-lab-3 font-serif text-section text-ink"
        >
          {specimen.name}
        </h2>
        <p className="mt-lab-3 max-w-prose font-sans text-meta text-ink-secondary">
          {specimen.problem}
        </p>
      </header>

      <dl className="grid gap-lab-5 border-b border-rule px-lab-5 py-lab-5 sm:grid-cols-2">
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Why this form
          </dt>
          <dd className="mt-lab-2 font-sans text-meta text-ink-secondary">
            {specimen.formRationale}
          </dd>
        </div>
        <div className="grid grid-cols-2 gap-lab-4">
          <Meta label="Interaction" value={specimen.interaction} />
          <Meta label="Motion" value={specimen.motion} />
          <Meta label="Language" value={specimen.visualLanguage} />
          <Meta label="Complexity" value={specimen.complexity} />
        </div>
      </dl>

      <div className="flex flex-wrap gap-lab-2 border-b border-rule px-lab-5 py-lab-4">
        {specimen.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-lab-3 border-b border-rule bg-surface-sunken px-lab-5 py-lab-3">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Live experiment
        </p>
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
      </div>

      <iframe
        key={specimen.id}
        title={`${specimen.name} live experiment`}
        src={specimen.embedUrl}
        className="w-full border-0 bg-void"
        style={{ minHeight: "72vh" }}
        loading="lazy"
        allow="fullscreen"
      />
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-sans text-label uppercase text-ink-tertiary">
        {label}
      </dt>
      <dd className="mt-lab-1 font-mono text-code text-ink">{value}</dd>
    </div>
  );
}
