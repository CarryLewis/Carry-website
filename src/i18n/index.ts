import type { Metadata } from "next";
import english from "./english.json";
export type Locale = "zh" | "en";
const dictionary: Record<string, string> = english;
export const htmlLanguage = (locale: Locale) =>
  locale === "en" ? "en" : "zh-CN";
export const localeFromPath = (path: string): Locale =>
  /^\/en(?:\/|$)/.test(path) ? "en" : "zh";
export const withoutLocale = (path: string) =>
  path.replace(/^\/en(?=\/|$)/, "") || "/";
export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const path = withoutLocale(href);
  // Independently hosted embeds, downloadable files and images keep their own URLs.
  if (
    /^\/(?:ecg-simulator|html-design-lab|research-brief|images|notion|_next)(?:\/|$)/.test(
      path,
    ) ||
    /\.[a-z0-9]+(?:[?#]|$)/i.test(path)
  )
    return path;
  return locale === "en" ? `/en${path}` : path;
}
export function translate(locale: Locale, text: string): string {
  return locale === "en"
    ? (dictionary[text.trim().replace(/\s+/g, " ")] ?? text)
    : text;
}
export function translateValue<T>(locale: Locale, value: T): T {
  if (typeof value === "string") return translate(locale, value) as T;
  if (Array.isArray(value))
    return value.map((item) => translateValue(locale, item)) as T;
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        translateValue(locale, item),
      ]),
    ) as T;
  return value;
}
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const zh = `https://carrylewis.com${withoutLocale(path)}`;
  const en = `https://carrylewis.com${localizedHref(path, "en")}`;
  return {
    title:
      withoutLocale(path) === "/"
        ? { absolute: translate(locale, title) }
        : translate(locale, title),
    description: translate(locale, description),
    alternates: {
      canonical: locale === "en" ? en : zh,
      languages: { "zh-CN": zh, en, "x-default": zh },
    },
  };
}
