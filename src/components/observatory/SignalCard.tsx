import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Signal, SignalImportance } from "@/domain/entities";

const categoryLabel: Record<Signal["category"], string> = {
  "medical-intelligence": "Medical Research",
  "ai-intelligence": "AI Development",
  technology: "Technology Trends",
  society: "Society",
  "personal-learning": "Personal Learning",
};

const importanceClass: Record<SignalImportance, string> = {
  high: "bg-status-signal",
  medium: "bg-status-experiment",
  low: "bg-ink-faint",
};

type SignalCardProps = {
  signal: Signal;
};

export function SignalCard({ signal }: SignalCardProps) {
  return (
    <article className="relative border border-rule bg-surface-raised p-lab-5 transition-colors duration-fast ease-lab hover:border-rule-strong">
      <span
        className={cn(
          "absolute inset-y-lab-5 left-0 w-0.5",
          importanceClass[signal.importance],
        )}
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-lab-3 pl-lab-3">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          {categoryLabel[signal.category]}
        </p>
        <time
          dateTime={signal.date}
          className="font-mono text-code text-ink-faint"
        >
          {signal.date}
        </time>
        <span className="font-sans text-label uppercase text-ink-tertiary">
          {signal.importance} importance
        </span>
        <span className="font-sans text-meta text-ink-faint">{signal.source}</span>
      </div>
      <h3 className="mt-lab-3 pl-lab-3 font-sans text-body-ui font-medium text-ink">
        <Link
          href={`/signals#${signal.slug}`}
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {signal.title}
        </Link>
      </h3>
      <p className="mt-lab-2 pl-lab-3 font-sans text-meta text-ink-secondary">
        {signal.summary}
      </p>
    </article>
  );
}
