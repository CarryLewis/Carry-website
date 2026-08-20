import { cn } from "@/lib/cn";
import type {
  EntityStatus,
  PracticeFieldStatus,
  ProjectStatus,
} from "@/domain/entities";

const statusColor: Record<string, string> = {
  active: "bg-status-active",
  emerging: "bg-status-signal",
  prototype: "bg-status-prototype",
  experiment: "bg-status-experiment",
  dormant: "bg-status-dormant",
  archived: "bg-status-archived",
  archive: "bg-status-archived",
};

const statusLabel: Record<string, string> = {
  active: "Active",
  emerging: "New",
  prototype: "Prototype",
  experiment: "Experiment",
  dormant: "Dormant",
  archived: "Archived",
  archive: "Archive",
};

type StatusIndicatorProps = {
  status: EntityStatus | ProjectStatus | PracticeFieldStatus;
  className?: string;
};

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-lab-2 font-sans text-label uppercase text-ink-tertiary",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block size-1.5 rounded-full",
          statusColor[status] ?? "bg-ink-faint",
        )}
        aria-hidden
      />
      {statusLabel[status] ?? status}
    </span>
  );
}
