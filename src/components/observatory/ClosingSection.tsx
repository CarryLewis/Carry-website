import Link from "next/link";
import type { SystemLink } from "@/domain/entities";

type ClosingSectionProps = {
  links: SystemLink[];
};

export function ClosingSection({ links }: ClosingSectionProps) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-shell px-margin py-lab-9">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Continue
        </p>
        <h2 className="mt-lab-3 font-serif text-page text-ink">
          Explore the system
        </h2>
        <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
          Enter any subsystem of the laboratory. Each surface shares the same
          entity graph and design language.
        </p>

        <ul className="mt-lab-7 grid gap-0 border-t border-rule sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-rule sm:odd:border-r">
              <Link
                href={link.href}
                className="group flex flex-col gap-lab-2 px-lab-1 py-lab-6 transition-colors duration-fast ease-lab hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:px-lab-5"
              >
                <span className="font-serif text-section text-ink group-hover:text-accent">
                  {link.label}
                </span>
                <span className="font-sans text-meta text-ink-tertiary">
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
