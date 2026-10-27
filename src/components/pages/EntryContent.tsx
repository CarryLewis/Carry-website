import Link from "@/components/ui/LocalizedLink";
import { notFound } from "next/navigation";
import { categories, listEntries } from "@/content/notion";
import { NotionBody } from "@/components/journal/NotionBody";
import type { Locale } from "@/i18n";
import styles from "@/components/journal/journal.module.css";
export default async function EntryContent({
  params,
  locale = "zh",
}: {
  params: Promise<{ kind: string; slug: string }>;
  locale?: Locale;
}) {
  const { kind, slug } = await params,
    entry = listEntries().find((e) => e.kind === kind && e.slug === slug);
  if (!entry) notFound();
  const category = categories.find((c) => c.kind === entry.kind)!,
    en = locale === "en";
  return (
    <div className={styles.page} lang={en ? "en" : "zh-CN"}>
      <article className={styles.article}>
        <header>
          <Link className={styles.eyebrow} href={`/journal/#${entry.kind}`}>
            ←{" "}
            {en
              ? { book: "Books", essay: "Essays", ranking: "Rankings" }[
                  entry.kind
                ]
              : category.label}
          </Link>
          {en && (
            <p className={styles.muted}>
              Original-language entry · The author's text is preserved below.
            </p>
          )}
          <h1 className={styles.title} lang="und">
            {entry.title}
          </h1>
          <div className={styles.meta}>
            <time dateTime={entry.publishedAt}>
              {entry.publishedAt.slice(0, 10)}
            </time>
            {entry.author && <span>{entry.author}</span>}
            {entry.rank !== null && <span>#{entry.rank}</span>}
            {entry.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {entry.summary && (
            <p className={styles.intro} lang="und">
              {entry.summary}
            </p>
          )}
        </header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {entry.cover && (
          <img
            className={styles.cover}
            src={entry.cover}
            alt={en ? `Cover: ${entry.title}` : `${entry.title}封面`}
          />
        )}
        <div className={styles.body} lang="und">
          <NotionBody blocks={entry.blocks} />
        </div>
      </article>
    </div>
  );
}
