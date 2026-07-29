import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-void">
      <div className="mx-auto flex max-w-shell flex-col gap-lab-4 px-margin py-lab-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-section text-ink">Digital Laboratory</p>
          <p className="mt-lab-2 max-w-md font-sans text-meta text-ink-tertiary">
            Scientific journal · Knowledge observatory · Personal research system
          </p>
        </div>
        <div className="flex flex-wrap gap-lab-4 font-sans text-meta text-ink-tertiary">
          <Link href="/about" className="hover:text-ink">
            About
          </Link>
          <Link href="/signals" className="hover:text-ink">
            Signals
          </Link>
          <span className="font-mono text-code">v0.1 · Observatory</span>
        </div>
      </div>
    </footer>
  );
}
