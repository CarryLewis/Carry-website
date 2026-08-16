"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LabProtocol } from "@/components/lab/LabProtocol";
import { SpecimenBench } from "@/components/lab/SpecimenBench";
import { StructureField } from "@/components/lab/StructureField";
import { TraceList } from "@/components/lab/TraceList";
import {
  DEFAULT_SPECIMEN_ID,
  LAB_THESIS,
  STRUCTURES,
  getSpecimen,
  specimens,
  specimensForStructure,
  type InformationStructure,
  type LabSpecimen,
} from "@/data/lab-catalog";

type LabWorkbenchProps = {
  initialSlug?: string;
};

/**
 * Structure Atlas — the HTML Design Lab viewing surface.
 * Overview (field) → event (trace row) → detail (specimen bench).
 */
export function LabWorkbench({ initialSlug }: LabWorkbenchProps) {
  const initial = getSpecimen(initialSlug ?? "") ?? getSpecimen(DEFAULT_SPECIMEN_ID)!;
  const [active, setActive] = useState<LabSpecimen>(initial);
  const skipScroll = useRef(true);

  useEffect(() => {
    const next = getSpecimen(initialSlug ?? "");
    if (next) setActive(next);
  }, [initialSlug]);

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!mobile) return;
    document.getElementById("specimen-bench")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [active.id]);

  const select = useCallback((specimen: LabSpecimen) => {
    setActive(specimen);
    window.history.replaceState(null, "", `/lab/${specimen.id}/`);
  }, []);

  const selectStructure = useCallback(
    (id: InformationStructure) => {
      const matches = specimensForStructure(id);
      if (matches[0]) select(matches[0]);
    },
    [select],
  );

  const structure = useMemo(
    () => STRUCTURES.find((item) => item.id === active.structure),
    [active.structure],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      const index = specimens.findIndex((item) => item.id === active.id);
      if (event.key === "ArrowDown" || event.key === "j") {
        event.preventDefault();
        const next = specimens[(index + 1) % specimens.length];
        select(next);
      }
      if (event.key === "ArrowUp" || event.key === "k") {
        event.preventDefault();
        const next =
          specimens[(index - 1 + specimens.length) % specimens.length];
        select(next);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active.id, select]);

  return (
    <div className="bg-void">
      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-margin py-lab-8 lg:py-lab-9">
          <p className="font-sans text-label uppercase text-ink-tertiary">
            HTML Design Lab
          </p>
          <h1 className="mt-lab-3 max-w-wide font-serif text-page text-ink">
            Structure atlas
          </h1>
          <p className="mt-lab-4 max-w-prose font-serif text-body text-ink-secondary">
            {LAB_THESIS}
          </p>
          <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-tertiary">
            Ten isolated experiments, filed by information structure. This
            page is itself a visualization: overview of the field, then the
            selected structure, then the live specimen.
          </p>
          <p className="mt-lab-6 font-mono text-code text-ink-faint">
            fig.lab — structure → form → specimen · {specimens.length}{" "}
            experiments · j/k to step
          </p>
        </div>
      </section>

      <section className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-shell px-margin py-lab-7">
          <p className="mb-lab-5 font-sans text-label uppercase text-ink-tertiary">
            Visualization protocol
          </p>
          <h2 className="sr-only">Structure, form, then specimen</h2>
          <LabProtocol />
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-margin py-lab-7">
          <div className="mb-lab-5 flex flex-wrap items-end justify-between gap-lab-3">
            <div>
              <p className="font-sans text-label uppercase text-ink-tertiary">
                Field
              </p>
              <h2 className="mt-lab-2 font-sans text-section text-ink">
                Information structures
              </h2>
            </div>
            <p className="max-w-md font-sans text-meta text-ink-tertiary">
              {structure?.question}
            </p>
          </div>
          <StructureField
            active={active.structure}
            onSelect={selectStructure}
          />
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-shell gap-lab-6 px-margin py-lab-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <div>
            <p className="mb-lab-4 font-sans text-label uppercase text-ink-tertiary">
              Trace
            </p>
            <div className="border border-rule">
              <TraceList activeId={active.id} onSelect={select} />
            </div>
          </div>
          <div>
            <p className="mb-lab-4 font-sans text-label uppercase text-ink-tertiary">
              Bench
            </p>
            <SpecimenBench specimen={active} />
          </div>
        </div>
      </section>
    </div>
  );
}
