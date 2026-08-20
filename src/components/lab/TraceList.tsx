"use client";

import Link from "next/link";
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
  onUseCase: (id: LabUseCaseId | null) => void;
};

/**
 * Structure → form → specimen as ruled index rows.
 * Navigation uses Next.js links, matching Projects and Research threads.
 */
export function TraceList({
  items,
  activeId,
  useCase,
  onUseCase,
}: TraceListProps) {
  return (
    <div>
      <div
        className="flex flex-wrap gap-lab-4"
        role="toolbar"
        aria-label="Filter by product use"
      >
        <FilterLink
          pressed={useCase === null}
          onClick={() => onUseCase(null)}
        >
          All
        </FilterLink>
        {USE_CASES.map((item) => (
          <FilterLink
            key={item.id}
            pressed={useCase === item.id}
            onClick={() => onUseCase(useCase === item.id ? null : item.id)}
          >
            {item.label}
          </FilterLink>
        ))}
      </div>

      <div className="mt-lab-6 border-t border-rule">
        <div className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.3fr)] gap-lab-4 border-b border-rule py-lab-3 md:grid">
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
          <p className="py-lab-6 font-sans text-body-ui text-ink-tertiary">
            No specimens in this use. Clear the filter to see the field.
          </p>
        ) : (
          <ul>
            {items.map((specimen) => {
              const structure = STRUCTURES.find(
                (s) => s.id === specimen.structure,
              );
              const selected = specimen.id === activeId;
              return (
                <li key={specimen.id} className="border-b border-rule last:border-b-0">
                  <Link
                    href={`/lab/${specimen.id}/#specimen-bench`}
                    aria-current={selected ? "page" : undefined}
                    className={cn(
                      "group grid grid-cols-1 gap-lab-2 py-lab-5 transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.3fr)] md:items-baseline md:gap-lab-4",
                      selected && "border-l-2 border-l-accent pl-lab-4 -ml-px",
                    )}
                  >
                    <span className="font-sans text-meta text-ink-tertiary">
                      {structure?.label ?? specimen.structure}
                    </span>
                    <span className="font-mono text-code text-ink-tertiary">
                      {structure?.form}
                    </span>
                    <span
                      className={cn(
                        "font-serif text-body-ui transition-colors duration-fast group-hover:text-accent",
                        selected ? "text-ink" : "text-ink-secondary",
                      )}
                    >
                      {specimen.name}
                      <span className="ml-lab-2 font-mono text-code text-ink-faint">
                        {specimen.version}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterLink({
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
        "relative py-lab-2 font-sans text-meta transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        pressed ? "text-ink" : "text-ink-secondary hover:text-ink",
      )}
    >
      {children}
      {pressed ? (
        <span
          className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
          aria-hidden
        />
      ) : null}
    </button>
  );
}
