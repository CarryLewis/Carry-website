import { Tag } from "@/components/ui/Tag";
import { getStructure, type LabSpecimen } from "@/data/lab-catalog";

type SpecimenDossierProps = {
  specimen: LabSpecimen;
};

/**
 * Why this form — the readable evidence that visualization is a decision.
 */
export function SpecimenDossier({ specimen }: SpecimenDossierProps) {
  const structure = getStructure(specimen.structure);

  return (
    <aside
      aria-label="Specimen dossier"
      className="flex min-h-0 flex-col overflow-y-auto bg-surface"
    >
      <div className="border-b border-rule px-lab-4 py-lab-4">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Dossier
        </p>
        <p className="mt-lab-2 font-serif text-section text-ink">
          {specimen.name}
        </p>
        <p className="mt-lab-3 font-sans text-meta text-ink-secondary">
          {specimen.problem}
        </p>
      </div>

      <dl className="grid gap-lab-5 border-b border-rule px-lab-4 py-lab-4">
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Why this form
          </dt>
          <dd className="mt-lab-2 font-sans text-meta text-ink-secondary">
            {specimen.formRationale}
          </dd>
        </div>
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Pattern
          </dt>
          <dd className="mt-lab-2">
            <p className="font-sans text-meta text-ink">{specimen.pattern.name}</p>
            <p className="mt-lab-2 font-serif text-meta text-ink-secondary">
              {specimen.pattern.principle}
            </p>
          </dd>
        </div>
      </dl>

      <dl className="grid grid-cols-2 gap-lab-4 border-b border-rule px-lab-4 py-lab-4">
        <Meta label="Structure" value={structure?.label ?? specimen.structure} />
        <Meta label="Form" value={structure?.form ?? specimen.form} />
        <Meta label="Interaction" value={specimen.interaction} />
        <Meta label="Motion" value={specimen.motion} />
        <Meta label="Language" value={specimen.visualLanguage} />
        <Meta label="Complexity" value={specimen.complexity} />
      </dl>

      <div className="px-lab-4 py-lab-4">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Recommended for
        </p>
        <div className="mt-lab-3 flex flex-wrap gap-lab-2">
          {specimen.recommendedFor.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      </div>
    </aside>
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
