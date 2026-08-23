"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FeedbackPanel } from "@/components/feedback/FeedbackPanel";
import { LabProtocol } from "@/components/lab/LabProtocol";
import { SpecimenBench } from "@/components/lab/SpecimenBench";
import { SpecimenDossier } from "@/components/lab/SpecimenDossier";
import { StructureField } from "@/components/lab/StructureField";
import { TraceList } from "@/components/lab/TraceList";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LAB_TARGET_ID } from "@/data/feedback-targets";
import {
  DEFAULT_SPECIMEN_ID,
  LAB_THESIS,
  filterSpecimens,
  getSpecimen,
  getStructure,
  specimens,
  specimensForStructure,
  type InformationStructure,
  type LabSpecimen,
  type LabUseCaseId,
} from "@/data/lab-catalog";

type LabWorkbenchProps = {
  initialSlug?: string;
};

/**
 * HTML Design Lab viewing surface, composed as a site page:
 * EntityHeader → labeled sections → framed demo → footer.
 * Specimen changes use App Router links, not a private history API.
 */
export function LabWorkbench({ initialSlug }: LabWorkbenchProps) {
  const router = useRouter();
  const initial =
    getSpecimen(initialSlug ?? "") ?? getSpecimen(DEFAULT_SPECIMEN_ID)!;
  const [active, setActive] = useState<LabSpecimen>(initial);
  const [useCase, setUseCase] = useState<LabUseCaseId | null>(null);

  useEffect(() => {
    const next = getSpecimen(initialSlug ?? "");
    if (next) setActive(next);
  }, [initialSlug]);

  const visible = useMemo(() => filterSpecimens(useCase), [useCase]);

  const availableStructures = useMemo(() => {
    return new Set(visible.map((item) => item.structure));
  }, [visible]);

  const structure = useMemo(
    () => getStructure(active.structure),
    [active.structure],
  );

  const openSpecimen = useCallback(
    (specimen: LabSpecimen) => {
      router.push(`/lab/${specimen.id}/#specimen-bench`);
    },
    [router],
  );

  const selectStructure = useCallback(
    (id: InformationStructure) => {
      const pool = visible.length ? visible : specimens;
      const matches = specimensForStructure(id).filter((item) =>
        pool.some((row) => row.id === item.id),
      );
      const next = matches[0] ?? specimensForStructure(id)[0];
      if (next) openSpecimen(next);
    },
    [openSpecimen, visible],
  );

  const selectUseCase = useCallback(
    (id: LabUseCaseId | null) => {
      setUseCase(id);
      const nextList = filterSpecimens(id);
      if (nextList.length && !nextList.some((item) => item.id === active.id)) {
        openSpecimen(nextList[0]);
      }
    },
    [active.id, openSpecimen],
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
      if (event.key !== "j" && event.key !== "k") return;
      const list = visible.length ? visible : [active];
      const index = list.findIndex((item) => item.id === active.id);
      event.preventDefault();
      if (event.key === "j") {
        openSpecimen(list[(index + 1) % list.length]);
      } else {
        openSpecimen(list[(index - 1 + list.length) % list.length]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, openSpecimen, visible]);

  return (
    <article className="bg-void">
      <header className="border-b border-rule">
        <div className="mx-auto max-w-shell px-margin py-lab-9">
          <p className="font-sans text-label uppercase text-ink-tertiary">
            <Link
              href="/lab/"
              className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Lab
            </Link>
            {" / "}
            {active.name}
          </p>
          <h1 className="mt-lab-3 font-serif text-page text-ink">
            HTML Design Lab
          </h1>
          <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
            {LAB_THESIS}
          </p>
          <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-tertiary">
            Experiments are filed by information structure. Select a row to
            open its record — the same index → entity path as Projects and
            Research.
          </p>
          <div className="mt-lab-6 flex flex-wrap gap-lab-3">
            <ButtonLink href="/html-design-lab/" variant="primary">
              Open source gallery
            </ButtonLink>
            <ButtonLink
              href="/html-design-lab/guide.html"
              variant="secondary"
            >
              Lab guide
            </ButtonLink>
            <ButtonLink
              href="/projects/active/html-design-lab/"
              variant="secondary"
            >
              Project record
            </ButtonLink>
          </div>
          <div className="mt-lab-8">
            <p className="mb-lab-4 font-sans text-label uppercase text-ink-tertiary">
              Visualization protocol
            </p>
            <LabProtocol specimen={active} />
            <p className="mt-lab-3 font-mono text-code text-ink-faint">
              fig.lab — structure → form → specimen · {specimens.length}{" "}
              experiments · j/k to step
            </p>
          </div>
        </div>
      </header>

      <section className="border-b border-rule bg-surface">
        <div className="mx-auto max-w-shell px-margin py-lab-8">
          <p className="font-sans text-label uppercase text-ink-tertiary">
            Field
          </p>
          <h2 className="mt-lab-3 font-sans text-section text-ink">
            Information structures
          </h2>
          <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
            {structure?.question}
          </p>
          <div className="mt-lab-6">
            <StructureField
              active={active.structure}
              onSelect={selectStructure}
              available={useCase ? availableStructures : undefined}
            />
          </div>
          <p className="mt-lab-3 font-mono text-code text-ink-faint">
            fig.field — neighborhood emphasis; distance is relatedness
          </p>
        </div>
      </section>

      <section className="border-b border-rule">
        <div className="mx-auto max-w-shell px-margin py-lab-8">
          <p className="font-sans text-label uppercase text-ink-tertiary">
            Index
          </p>
          <h2 className="mt-lab-3 font-sans text-section text-ink">
            Structure → form → specimen
          </h2>
          <p className="mt-lab-3 max-w-prose font-sans text-body-ui text-ink-secondary">
            Filter by the kind of product work you are iterating, then open a
            specimen record.
          </p>
          <div className="mt-lab-6">
            <TraceList
              items={visible}
              activeId={active.id}
              useCase={useCase}
              onUseCase={selectUseCase}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-surface">
        <div className="mx-auto grid max-w-shell gap-lab-8 px-margin py-lab-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:items-start">
          <SpecimenBench specimen={active} />
          <SpecimenDossier specimen={active} />
        </div>
      </section>

      <FeedbackPanel
        defaultTargetId={LAB_TARGET_ID}
        specimenId={active.id}
        specimenName={active.name}
      />
    </article>
  );
}
