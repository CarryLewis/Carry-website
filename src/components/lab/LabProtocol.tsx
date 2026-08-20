import {
  LAB_PROTOCOL,
  LAB_THESIS,
  getStructure,
  type LabSpecimen,
} from "@/data/lab-catalog";

type LabProtocolProps = {
  specimen: LabSpecimen;
};

/**
 * Living readout of the visualization decision.
 * Structure → Form → Specimen updates with the selected experiment.
 */
export function LabProtocol({ specimen }: LabProtocolProps) {
  const structure = getStructure(specimen.structure);
  const values = [
    structure?.label ?? specimen.structure,
    structure?.form ?? specimen.form,
    specimen.name,
  ];

  return (
    <header className="shrink-0 border-b border-rule bg-surface">
      <div className="flex flex-col gap-lab-4 px-lab-4 py-lab-4 lg:flex-row lg:items-end lg:justify-between lg:gap-lab-6 lg:px-lab-5">
        <div className="min-w-0">
          <p className="font-sans text-label uppercase text-ink-tertiary">
            HTML Design Lab · Structure bench
          </p>
          <p className="mt-lab-2 max-w-prose font-serif text-meta text-ink-secondary">
            {LAB_THESIS}
          </p>
        </div>
        <ol className="grid min-w-0 grid-cols-3 border border-rule bg-surface-sunken lg:w-[min(100%,36rem)]">
          {LAB_PROTOCOL.map((item, index) => (
            <li
              key={item.step}
              title={item.body}
              className="relative border-r border-rule px-lab-3 py-lab-3 last:border-r-0"
            >
              <p className="font-mono text-code text-accent">
                {item.step}{" "}
                <span className="text-ink-faint">{item.label}</span>
              </p>
              <p className="mt-lab-2 truncate font-sans text-meta text-ink">
                {values[index]}
              </p>
              {index < LAB_PROTOCOL.length - 1 ? (
                <span
                  className="pointer-events-none absolute -right-1.5 top-1/2 hidden h-px w-3 bg-accent md:block"
                  aria-hidden
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
