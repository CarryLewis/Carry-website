"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/domain/entities";
import styles from "./header.module.css";

const exploration = [
  { href: "/journal/", label: "阅读与记录", en: "Books & notes" },
  { href: "/research/", label: "研究线索", en: "Research" },
  { href: "/knowledge/", label: "知识网络", en: "Knowledge" },
  { href: "/lab/", label: "视觉实验", en: "Design lab" },
  { href: "/signals/", label: "研究观察", en: "Signals" },
  { href: "/archive/", label: "时间档案", en: "Archive" },
  { href: "/observatory/", label: "第一版观测站", en: "Original" },
];

export function SiteHeader({
  brandName,
  nav,
}: {
  brandName: string;
  nav: NavItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState<"mobile" | "explore" | null>(null);
  const header = useRef<HTMLElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const exploreButton = useRef<HTMLButtonElement>(null);
  const active = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href.replace(/\/$/, ""));

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(null);
        (open === "mobile" ? mobileButton : exploreButton).current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <header
      className={styles.header}
      ref={header}
      lang="zh-CN"
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setOpen(null);
      }}
    >
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(null)}>
          <span className={styles.mark} aria-hidden />
          {brandName}
          <small>PERSONAL OBSERVATORY</small>
        </Link>
        <nav className={styles.nav} aria-label="主导航">
          {nav.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              onClick={() => setOpen(null)}
            >
              {item.label}
            </Link>
          ))}
          <div className={styles.more}>
            <button
              ref={exploreButton}
              type="button"
              aria-expanded={open === "explore"}
              aria-controls="explore-nav"
              onClick={() => setOpen(open === "explore" ? null : "explore")}
            >
              探索 <span aria-hidden>{open === "explore" ? "−" : "+"}</span>
            </button>
            {open === "explore" && (
              <div className={styles.dropdown} id="explore-nav">
                {exploration.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    aria-current={active(item.href) ? "page" : undefined}
                    onClick={() => setOpen(null)}
                  >
                    {item.label}
                    <small>{item.en}</small>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        <button
          className={styles.mobileButton}
          ref={mobileButton}
          type="button"
          aria-expanded={open === "mobile"}
          aria-controls="mobile-nav"
          onClick={() => setOpen(open === "mobile" ? null : "mobile")}
        >
          {open === "mobile" ? "关闭" : "菜单"}
          <span aria-hidden>{open === "mobile" ? "−" : "+"}</span>
        </button>
      </div>
      {open === "mobile" && (
        <nav id="mobile-nav" className={styles.mobile} aria-label="移动导航">
          {nav.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              onClick={() => setOpen(null)}
            >
              {item.label}
              <span aria-hidden>↗</span>
            </Link>
          ))}
          <p>FURTHER EXPLORATION</p>
          {exploration.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              onClick={() => setOpen(null)}
            >
              {item.label}
              <small>{item.en}</small>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
