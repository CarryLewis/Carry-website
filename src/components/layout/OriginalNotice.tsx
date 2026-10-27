"use client";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";
import { withoutLocale } from "@/i18n";
export function OriginalNotice() {
  const locale = useLocale(),
    path = withoutLocale(usePathname());
  if (!/^\/(?:observatory|research|knowledge|lab|archive)(?:\/|$)/.test(path))
    return null;
  return (
    <p
      className="mx-auto max-w-shell px-margin py-lab-3 text-meta text-ink-secondary"
      lang={locale === "en" ? "en" : "zh-CN"}
    >
      {locale === "en"
        ? "First-edition reference · Content is retained in its original language; navigation follows your selected language."
        : "第一版参考档案 · 内容保留原文；导航随所选语言切换。"}
    </p>
  );
}
