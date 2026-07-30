import Link from "next/link";
import type { SiteChrome } from "@/domain/entities";

type SiteFooterProps = {
  chrome: SiteChrome;
};

export function SiteFooter({ chrome }: SiteFooterProps) {
  return (
    <footer className="border-t border-rule bg-void">
      <div className="mx-auto flex max-w-shell flex-col gap-lab-4 px-margin py-lab-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-section text-ink">{chrome.productName}</p>
          <p className="mt-lab-2 max-w-md font-sans text-meta text-ink-tertiary">
            {chrome.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-lab-4 font-sans text-meta text-ink-tertiary">
          {chrome.footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
          <span className="font-mono text-code">{chrome.versionLabel}</span>
        </div>
      </div>
    </footer>
  );
}
