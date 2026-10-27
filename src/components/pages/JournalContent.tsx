import Link from "@/components/ui/LocalizedLink";
import { categories, entryURL, listEntries } from "@/content/notion";
import type { Locale } from "@/i18n";
import styles from "@/components/journal/journal.module.css";
const english = {
  book: {
    label: "Books",
    description: "Books I've read, and the questions they leave behind.",
  },
  essay: {
    label: "Essays",
    description:
      "Observations, reflections and perspectives still taking shape.",
  },
  ranking: {
    label: "Rankings",
    description: "Current preferences, with the reasons behind them.",
  },
};
export default function JournalContent({
  locale = "zh",
}: { locale?: Locale } = {}) {
  const en = locale === "en",
    entries = listEntries();
  return (
    <div className={styles.page} lang={en ? "en" : "zh-CN"}>
      <header>
        <p className={styles.eyebrow}>
          {en ? "READING & NOTES" : "READING & NOTES / 阅读与记录"}
        </p>
        <h1 className={styles.title}>
          {en ? "Keep things worth returning to." : "留下一些值得回看的东西。"}
        </h1>
        <p className={styles.intro}>
          {en
            ? "Books I've read, everyday observations and current preferences. Writing down the reasons leaves room for change."
            : "读过的书，日常的观察，以及此刻的偏好。把理由写下来，也给日后的改变留一点空间。"}
        </p>
        {en && entries.length > 0 && (
          <p className={styles.muted}>
            Personal entries are presented in their original language. A
            language switch changes the navigation, not the author's words.
          </p>
        )}
      </header>
      <nav className={styles.nav} aria-label={en ? "Categories" : "内容分类"}>
        {categories.map((c) => (
          <a key={c.kind} href={`#${c.kind}`}>
            {en ? english[c.kind].label : c.label}
          </a>
        ))}
      </nav>
      {categories.map((c) => {
        const items = entries
            .filter((e) => e.kind === c.kind)
            .sort((a, b) =>
              c.kind === "book"
                ? (a.rank ?? Infinity) - (b.rank ?? Infinity)
                : 0,
            ),
          label = en ? english[c.kind].label : c.label;
        return (
          <section
            className={styles.section}
            id={c.kind}
            key={c.kind}
            aria-labelledby={`${c.kind}-title`}
          >
            <h2 id={`${c.kind}-title`}>{label}</h2>
            <p className={styles.muted}>
              {en ? english[c.kind].description : c.description}
            </p>
            {items.length ? (
              <div className={styles.grid}>
                {items.map((entry) => (
                  <article key={entry.id} className={styles.card}>
                    <Link href={entryURL(entry)}>
                      <div className={styles.meta}>
                        <time dateTime={entry.publishedAt}>
                          {entry.publishedAt.slice(0, 10)}
                        </time>
                        {entry.author && <span>{entry.author}</span>}
                        {entry.rank !== null && <span>#{entry.rank}</span>}
                      </div>
                      <h3 lang="und">{entry.title}</h3>
                      <p className={styles.muted} lang="und">
                        {entry.summary}
                      </p>
                      <span className={styles.meta}>
                        {en ? "Read the original ↗" : "阅读全文 ↗"}
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className={styles.meta}>
                {en
                  ? `No public ${label.toLowerCase()} yet. This collection will grow over time.`
                  : `还没有公开的${label}，慢慢更新。`}
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
