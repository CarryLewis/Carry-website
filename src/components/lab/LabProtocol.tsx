import {
  LAB_PROTOCOL,
  getStructure,
  type LabSpecimen,
} from "@/data/lab-catalog";

type LabProtocolProps = {
  specimen: LabSpecimen;
};

/**
 * Visualization protocol as a labeled figure — same ruled grid language
 * as Observatory sections, not a separate instrument chrome.
 */
export function LabProtocol({ specimen }: LabProtocolProps) {
  const structure = getStructure(specimen.structure);
  const values = [
    structure?.label ?? specimen.structure,
    structure?.form ?? specimen.form,
    specimen.name,
  ];

  return (
    <ol className="grid border border-rule bg-surface-sunken md:grid-cols-3">
      {LAB_PROTOCOL.map((item, index) => (
        <li
          key={item.step}
          className="border-b border-rule p-lab-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <p className="font-mono text-code text-accent">{item.step}</p>
          <p className="mt-lab-3 font-sans text-section text-ink">{item.label}</p>
          <p className="mt-lab-2 font-sans text-meta text-ink">{values[index]}</p>
          <p className="mt-lab-3 font-sans text-meta text-ink-secondary">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
