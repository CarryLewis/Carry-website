import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center border border-rule px-lab-2 font-sans text-label uppercase tracking-[0.08em] text-ink-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
