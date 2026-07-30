import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn("max-w-prose", className)}>
      <p className="font-sans text-label uppercase text-ink-tertiary">{label}</p>
      <h2 className="mt-lab-3 font-serif text-page text-ink">{title}</h2>
      {description ? (
        <p className="mt-lab-4 font-sans text-body-ui text-ink-secondary">
          {description}
        </p>
      ) : null}
    </header>
  );
}
