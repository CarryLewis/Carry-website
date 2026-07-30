import Link from "next/link";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Tag } from "@/components/ui/Tag";
import { getProjectById } from "@/data/projects";
import type { IntellectualFocus } from "@/domain/entities";

type ExplorationCardProps = {
  focus: IntellectualFocus;
};

export function ExplorationCard({ focus }: ExplorationCardProps) {
  const primaryProject = focus.relatedProjectIds
    .map((id) => getProjectById(id))
    .find(Boolean);
  const href = primaryProject
    ? `/projects/${primaryProject.status}/${primaryProject.slug}`
    : "/projects";

  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-rule bg-surface-raised p-lab-5 transition-colors duration-fast ease-lab hover:border-rule-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex items-start justify-between gap-lab-3">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          {focus.domain}
        </p>
        <StatusIndicator status={focus.status} />
      </div>

      <h3 className="mt-lab-4 font-serif text-section text-ink transition-colors duration-fast group-hover:text-accent">
        {focus.title}
      </h3>

      <p className="mt-lab-3 flex-1 font-sans text-body-ui text-ink-secondary">
        {focus.description}
      </p>

      <div className="mt-lab-5 flex flex-wrap gap-lab-2 border-t border-rule pt-lab-4">
        {(focus.fields ?? []).map((field) => (
          <Tag key={field}>{field}</Tag>
        ))}
      </div>
    </Link>
  );
}
