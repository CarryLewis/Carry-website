import { LAB_PROTOCOL } from "@/data/lab-catalog";

/**
 * The visualization decision as a three-step process diagram.
 * Form follows the protocol: Structure → Form → Specimen.
 */
export function LabProtocol() {
  return (
    <ol className="grid gap-0 border border-rule bg-surface-sunken md:grid-cols-3">
      {LAB_PROTOCOL.map((step, index) => (
        <li
          key={step.step}
          className="relative border-b border-rule p-lab-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <p className="font-mono text-code text-accent">{step.step}</p>
          <p className="mt-lab-3 font-sans text-section text-ink">
            {step.label}
          </p>
          <p className="mt-lab-3 font-sans text-meta text-ink-secondary">
            {step.body}
          </p>
          {index < LAB_PROTOCOL.length - 1 ? (
            <span
              className="pointer-events-none absolute -bottom-px left-1/2 hidden h-px w-8 -translate-x-1/2 bg-accent md:left-auto md:right-0 md:top-1/2 md:block md:h-px md:w-3 md:translate-x-1/2 md:-translate-y-1/2"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
