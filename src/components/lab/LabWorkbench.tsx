"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LabProtocol } from "@/components/lab/LabProtocol";
import { SpecimenBench } from "@/components/lab/SpecimenBench";
import { SpecimenDossier } from "@/components/lab/SpecimenDossier";
import { StructureField } from "@/components/lab/StructureField";
import { TraceList } from "@/components/lab/TraceList";
import {
  DEFAULT_SPECIMEN_ID,
  filterSpecimens,
  getSpecimen,
  specimensForStructure,
  type InformationStructure,
  type LabSpecimen,
  type LabUseCaseId,
} from "@/data/lab-catalog";

type LabWorkbenchProps = {
  initialSlug?: string;
};

/**
 * Structure Bench — the HTML Design Lab viewing surface.
 * Overview (field) → event (trace row) → detail (live specimen + dossier).
 */
export function LabWorkbench({ initialSlug }: LabWorkbenchProps) {
  const initial =
    getSpecimen(initialSlug ?? "") ?? getSpecimen(DEFAULT_SPECIMEN_ID)!;
  const [active, setActive] = useState<LabSpecimen>(initial);
  const [useCase, setUseCase] = useState<LabUseCaseId | null>(null);
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

  const visible = useMemo(() => filterSpecimens(useCase), [useCase]);

  const availableStructures = useMemo(() => {
    return new Set(visible.map((item) => item.structure));
  }, [visible]);

  const select = useCallback((specimen: LabSpecimen) => {
    setActive(specimen);
    window.history.replaceState(null, "", `/lab/${specimen.id}/`);
  }, []);

  const selectStructure = useCallback(
    (id: InformationStructure) => {
      const pool = visible.length ? visible : filterSpecimens(null);
      const matches = specimensForStructure(id).filter((item) =>
        pool.some((row) => row.id === item.id),
      );
      const next = matches[0] ?? specimensForStructure(id)[0];
      if (next) select(next);
    },
    [select, visible],
  );

  const selectUseCase = useCallback(
    (id: LabUseCaseId | null) => {
      setUseCase(id);
      const nextList = filterSpecimens(id);
      if (nextList.length && !nextList.some((item) => item.id === active.id)) {
        select(nextList[0]);
      }
    },
    [active.id, select],
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
      const list = visible.length ? visible : [active];
      const index = list.findIndex((item) => item.id === active.id);
      if (event.key === "ArrowDown" || event.key === "j") {
        event.preventDefault();
        const next = list[(index + 1) % list.length];
        select(next);
      }
      if (event.key === "ArrowUp" || event.key === "k") {
        event.preventDefault();
        const next = list[(index - 1 + list.length) % list.length];
        select(next);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, select, visible]);

  return (
    <div className="flex min-h-[calc(100dvh-var(--header-height))] flex-col bg-void lg:h-[calc(100dvh-var(--header-height))] lg:overflow-hidden">
      <LabProtocol specimen={active} />

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(16rem,20rem)_minmax(0,1fr)_minmax(16rem,19rem)] lg:overflow-hidden">
        <aside className="flex min-h-0 flex-col border-b border-rule bg-surface lg:border-b-0 lg:border-r">
          <div className="shrink-0 border-b border-rule">
            <div className="flex items-end justify-between gap-lab-3 px-lab-3 py-lab-3">
              <div>
                <p className="font-sans text-label uppercase text-ink-tertiary">
                  Field
                </p>
                <p className="mt-lab-1 font-sans text-meta text-ink">
                  Information structures
                </p>
              </div>
              <p className="font-mono text-code text-ink-faint">j/k</p>
            </div>
            <StructureField
              active={active.structure}
              onSelect={selectStructure}
              available={useCase ? availableStructures : undefined}
            />
          </div>
          <TraceList
            items={visible}
            activeId={active.id}
            useCase={useCase}
            onSelect={select}
            onUseCase={selectUseCase}
          />
        </aside>

        <SpecimenBench specimen={active} />
        <SpecimenDossier specimen={active} />
      </div>
    </div>
  );
}
