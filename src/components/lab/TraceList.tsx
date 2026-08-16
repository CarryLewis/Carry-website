"use client";

import { cn } from "@/lib/cn";
import {
  STRUCTURES,
  type LabSpecimen,
} from "@/data/lab-catalog";

type TraceListProps = {
  activeId: string;
  items: LabSpecimen[];
  onSelect: (specimen: LabSpecimen) => void;
};

/**
 * Structure → form → specimen as a traced path.
 * Ruled rows, not cards. The selected row is the "event" in overview→detail.
 */
export function TraceList({ activeId, items, onSelect }: TraceListProps) {
  return (
    <div>
      <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.3fr)] gap-lab-4 border-b border-rule px-lab-4 py-lab-3 md:grid">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Structure
        </p>
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Form
        </p>
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Specimen
        </p>
      </div>
      <ul role="listbox" aria-label="Specimens by information structure">
        {items.map((specimen) => {
          const structure = STRUCTURES.find((s) => s.id === specimen.structure);
          const selected = specimen.id === activeId;
          return (
            <li key={specimen.id} className="border-b border-rule last:border-b-0">
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => onSelect(specimen)}
                className={cn(
                  "grid w-full grid-cols-1 gap-lab-2 px-lab-4 py-lab-4 text-left transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.3fr)] md:items-baseline md:gap-lab-4",
                    selected
                    ? "border-l-2 border-l-accent bg-accent-soft"
                    : "border-l-2 border-l-transparent hover:bg-surface-raised",
                )}
              >
                <span>
                  <span className="font-sans text-label uppercase text-ink-tertiary md:hidden">
                    Structure
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-sans text-meta md:mt-0",
                      selected ? "text-ink" : "text-ink-secondary",
                    )}
                  >
                    {structure?.label ?? specimen.structure}
                  </span>
                </span>
                <span>
                  <span className="font-sans text-label uppercase text-ink-tertiary md:hidden">
                    Form
                  </span>
                  <span className="mt-1 block font-mono text-code text-ink-tertiary md:mt-0">
                    {structure?.form}
                  </span>
                </span>
                <span>
                  <span className="font-sans text-label uppercase text-ink-tertiary md:hidden">
                    Specimen
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-serif text-body-ui md:mt-0",
                      selected ? "text-ink" : "text-ink-secondary",
                    )}
                  >
                    {specimen.name}
                    <span className="ml-lab-2 font-mono text-code text-ink-faint">
                      {specimen.version}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
