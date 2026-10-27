import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/layout/AppShell";
import { contentRepository } from "@/data";
import "@/app/globals.css";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { htmlLanguage, type Locale } from "@/i18n";

const sourceSerif = localFont({
  src: [
    {
      path: "../../fonts/source-serif-4-latin-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../../fonts/source-serif-4-latin-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../../fonts/source-serif-4-latin-600-normal.woff2",
      weight: "600",
    },
  ],
  variable: "--font-source-serif",
  display: "swap",
});
const ibmPlexSans = localFont({
  src: [
    { path: "../../fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "../../fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "../../fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});
const ibmPlexMono = localFont({
  src: [
    { path: "../../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export async function siteMetadata(locale: Locale): Promise<Metadata> {
  const chrome = await contentRepository.getSiteChrome();
  return {
    title: {
      default: `${chrome.brandName} — ${chrome.productName}`,
      template: `%s · ${chrome.brandName}`,
    },
    description:
      locale === "en"
        ? "Carry Lewis’s personal observatory: medicine, software, running, reading and faith. Work, questions and evolving perspectives."
        : chrome.metaDescription,
  };
}

export default async function RootDocument({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const chrome = await contentRepository.getSiteChrome();

  return (
    <html
      lang={htmlLanguage(locale)}
      className={`${sourceSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <LocaleProvider locale={locale}>
          <AppShell chrome={chrome} locale={locale}>
            {children}
          </AppShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
