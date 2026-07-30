import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { SiteChrome } from "@/domain/entities";

type AppShellProps = {
  children: React.ReactNode;
  chrome: SiteChrome;
};

export function AppShell({ children, chrome }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-void text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-margin focus:top-lab-2 focus:z-50 focus:bg-surface-raised focus:px-lab-3 focus:py-lab-2 focus:text-meta"
      >
        Skip to content
      </a>
      <SiteHeader brandName={chrome.brandName} nav={chrome.nav} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter chrome={chrome} />
    </div>
  );
}
