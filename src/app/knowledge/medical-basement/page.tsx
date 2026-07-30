import type { Metadata } from "next";
import Link from "next/link";

/**
 * Public Notion Site for medical-basement (Share → Publish).
 * Use the /ebd/ path in iframes — the plain public URL sets
 * frame-ancestors/X-Frame-Options so browsers refuse to embed it.
 * Get the official snippet via Share → Publish → Embed this page.
 */
export const MEDICAL_BASEMENT_NOTION_URL =
  "https://serious-fireplace-18e.notion.site/medical-basement-574ee033c41d83bd828f8118c9820b27";

/** From Notion: Share → Publish → Embed this page → Copy code */
export const MEDICAL_BASEMENT_EMBED_URL =
  "https://serious-fireplace-18e.notion.site/ebd/574ee033c41d83bd828f8118c9820b27";

export const metadata: Metadata = {
  title: "medical basement",
  description:
    "Mirrored Notion medical-basement page — lectures, diseases, drugs, and cases.",
};

export default function MedicalBasementPage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col bg-void">
      <div className="flex flex-wrap items-center justify-between gap-lab-3 border-b border-rule bg-surface-raised px-margin py-lab-3">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          <Link
            href="/knowledge/"
            className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Knowledge
          </Link>
          {" / medical basement"}
        </p>
        <a
          href={MEDICAL_BASEMENT_NOTION_URL}
          target="_blank"
          rel="noreferrer"
          className="font-sans text-meta text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Open in Notion ↗
        </a>
      </div>

      <iframe
        title="medical basement"
        src={MEDICAL_BASEMENT_EMBED_URL}
        className="w-full flex-1 border-0 bg-surface"
        style={{ minHeight: "calc(100vh - 7rem)" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
  );
}
