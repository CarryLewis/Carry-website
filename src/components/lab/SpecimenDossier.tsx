import { Tag } from "@/components/ui/Tag";
import { getStructure, type LabSpecimen } from "@/data/lab-catalog";

type SpecimenDossierProps = {
  specimen: LabSpecimen;
};

/**
 * Entity record for the selected specimen — labeled sections like a project page.
 */
export function SpecimenDossier({ specimen }: SpecimenDossierProps) {
  const structure = getStructure(specimen.structure);

  return (
    <aside aria-label="Specimen record">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        Record
      </p>
      <h2 className="mt-lab-3 font-serif text-section text-ink">
        {specimen.name}
      </h2>
      <p className="mt-lab-3 font-sans text-body-ui text-ink-secondary">
        {specimen.problem}
      </p>

      <dl className="mt-lab-7 grid gap-lab-7 border-t border-rule pt-lab-7">
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Why this form
          </dt>
          <dd className="mt-lab-2 font-sans text-body-ui text-ink">
            {specimen.formRationale}
          </dd>
        </div>
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Pattern
          </dt>
          <dd className="mt-lab-2">
            <p className="font-sans text-body-ui text-ink">
              {specimen.pattern.name}
            </p>
            <p className="mt-lab-2 font-serif text-body-ui text-ink-secondary">
              {specimen.pattern.principle}
            </p>
          </dd>
        </div>
        <div className="grid grid-cols-2 gap-lab-5">
          <Meta label="Structure" value={structure?.label ?? specimen.structure} />
          <Meta label="Form" value={structure?.form ?? specimen.form} />
          <Meta label="Interaction" value={specimen.interaction} />
          <Meta label="Motion" value={specimen.motion} />
          <Meta label="Language" value={specimen.visualLanguage} />
          <Meta label="Complexity" value={specimen.complexity} />
        </div>
        <div>
          <dt className="font-sans text-label uppercase text-ink-tertiary">
            Recommended for
          </dt>
          <dd className="mt-lab-3 flex flex-wrap gap-lab-2">
            {specimen.recommendedFor.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </dd>
        </div>
      </dl>
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
