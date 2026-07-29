import Link from "next/link";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import type { ResearchThread } from "@/domain/entities";

const categoryLabel: Record<ResearchThread["category"], string> = {
  "biomedical-systems": "Biomedical Systems",
  "computational-medicine": "Computational Medicine",
  neuroscience: "Neuroscience",
  immunology: "Immunology",
  "future-medicine": "Future Medicine",
};

type ResearchThreadCardProps = {
  thread: ResearchThread;
};

export function ResearchThreadCard({ thread }: ResearchThreadCardProps) {
  return (
    <Link
      href={thread.href}
      className="group block border-b border-rule py-lab-5 transition-colors duration-fast ease-lab last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-lab-6"
    >
      <div className="flex flex-wrap items-center gap-lab-3">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          {categoryLabel[thread.category]}
        </p>
        <StatusIndicator status={thread.status} />
      </div>
      <p className="mt-lab-3 font-serif text-[22px] leading-snug tracking-[-0.015em] text-ink transition-colors duration-fast group-hover:text-accent sm:text-[24px]">
        <span className="mr-lab-2 font-mono text-meta text-accent">Q</span>
        {thread.question}
      </p>
      <p className="mt-lab-3 font-sans text-meta text-ink-tertiary group-hover:text-ink-secondary">
        Open research thread →
      </p>
    </Link>
  );
}
