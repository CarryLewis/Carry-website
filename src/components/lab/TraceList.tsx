"use client";

import { cn } from "@/lib/cn";
import {
  STRUCTURES,
  USE_CASES,
  type LabSpecimen,
  type LabUseCaseId,
} from "@/data/lab-catalog";

type TraceListProps = {
  items: LabSpecimen[];
  activeId: string;
  useCase: LabUseCaseId | null;
  onSelect: (specimen: LabSpecimen) => void;
  onUseCase: (id: LabUseCaseId | null) => void;
};

/**
 * Structure → form → specimen as a traced path.
 * Ruled rows, not cards. Use-case chips filter for product iteration.
 */
export function TraceList({
  items,
  activeId,
  useCase,
  onSelect,
  onUseCase,
}: TraceListProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-rule px-lab-3 py-lab-3">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Adopt for
        </p>
        <div
          className="mt-lab-2 flex flex-wrap gap-lab-2"
          role="toolbar"
          aria-label="Filter by product use"
        >
          <FilterChip
            pressed={useCase === null}
            onClick={() => onUseCase(null)}
          >
            All
          </FilterChip>
          {USE_CASES.map((item) => (
            <FilterChip
              key={item.id}
              pressed={useCase === item.id}
              onClick={() => onUseCase(useCase === item.id ? null : item.id)}
            >
              {item.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,0.8fr)_minmax(0,1.2fr)] gap-lab-2 border-b border-rule px-lab-3 py-lab-2 lg:grid">
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
        {items.length === 0 ? (
          <p className="px-lab-3 py-lab-4 font-sans text-meta text-ink-tertiary">
            No specimens in this use. Clear the filter to see the field.
          </p>
        ) : (
          <ul role="listbox" aria-label="Specimens by information structure">
            {items.map((specimen) => {
              const structure = STRUCTURES.find(
                (s) => s.id === specimen.structure,
              );
              const selected = specimen.id === activeId;
              return (
                <li
                  key={specimen.id}
                  className="border-b border-rule last:border-b-0"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => onSelect(specimen)}
                    className={cn(
                      "grid w-full grid-cols-1 gap-lab-1 px-lab-3 py-lab-3 text-left transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-baseline lg:gap-lab-2",
                      selected
                        ? "border-l-2 border-l-accent bg-accent-soft"
                        : "border-l-2 border-l-transparent hover:bg-surface-raised",
                    )}
                  >
                    <span
                      className={cn(
                        "font-sans text-meta",
                        selected ? "text-ink" : "text-ink-secondary",
                      )}
                    >
                      {structure?.label ?? specimen.structure}
                    </span>
                    <span className="font-mono text-code text-ink-tertiary">
                      {structure?.form}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-meta",
                        selected ? "text-ink" : "text-ink-secondary",
                      )}
                    >
                      {specimen.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "h-7 border px-lab-2 font-sans text-label uppercase transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        pressed
          ? "border-accent bg-accent-soft text-accent"
          : "border-rule text-ink-tertiary hover:border-rule-strong hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
