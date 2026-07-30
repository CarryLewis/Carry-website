import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center px-lab-4 font-sans text-meta transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variant === "primary" &&
          "bg-accent text-ink-inverse hover:bg-accent-muted",
        variant === "secondary" &&
          "border border-rule text-ink hover:border-rule-strong",
        variant === "ghost" && "text-ink-secondary hover:text-ink",
        className,
      )}
    >
      {children}
    </Link>
  );
}
