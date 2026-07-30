"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Observatory" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/signals", label: "Signals" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-surface-raised/95 backdrop-blur-sm">
      <div className="mx-auto flex h-header max-w-shell items-center justify-between px-margin">
        <Link
          href="/"
          className="font-serif text-[18px] font-semibold tracking-[-0.015em] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Carry Lewis
        </Link>

        <nav className="hidden items-center gap-lab-5 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-lab-2 font-sans text-meta transition-colors duration-fast ease-lab focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  active ? "text-ink" : "text-ink-secondary hover:text-ink",
                )}
              >
                {item.label}
                {active ? (
                  <span
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-9 items-center border border-rule px-lab-3 font-sans text-meta text-ink-secondary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-rule bg-surface-raised lg:hidden"
          aria-label="Mobile"
        >
          <ul className="mx-auto max-w-shell px-margin py-lab-3">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-lab-3 border-b border-rule py-lab-4 font-sans text-body-ui last:border-b-0",
                      active ? "text-ink" : "text-ink-secondary",
                    )}
                  >
                    {active ? (
                      <span className="h-4 w-0.5 bg-accent" aria-hidden />
                    ) : (
                      <span className="w-0.5" aria-hidden />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
