"use client";
import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizedHref } from "@/i18n";
const LocalizedLink = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof NextLink>
>(function LocalizedLink({ href, ...props }, ref) {
  const locale = useLocale();
  const target =
    typeof href === "string"
      ? localizedHref(href, locale)
      : {
          ...href,
          pathname: href.pathname
            ? localizedHref(href.pathname, locale)
            : href.pathname,
        };
  return <NextLink {...props} href={target} ref={ref} />;
});
export default LocalizedLink;
