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

import type { Locale } from "@/i18n";
const chinese: Record<string, string> = {
  active: "开发中",
  emerging: "新方向",
  prototype: "原型",
  experiment: "实验",
  dormant: "暂停",
  archived: "归档",
  archive: "归档",
};
type StatusIndicatorProps = {
  locale?: Locale;
  status: EntityStatus | ProjectStatus | PracticeFieldStatus;
  className?: string;
};

export function StatusIndicator({
  status,
  className,
  locale = "en",
}: StatusIndicatorProps) {
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
      {locale === "zh"
        ? (chinese[status] ?? status)
        : (statusLabel[status] ?? status)}
    </span>
  );
}
