import type { Metadata } from "next";
import Link from "next/link";
import { inquiryThreads, openingNote } from "@/data/portrait";
import styles from "@/components/portrait/portrait.module.css";
import { categories, entryURL, listEntries } from "@/content/notion";

export const metadata: Metadata = {
  title: "思考",
  description:
    "关于医学、创造、实践与意义的问题，以及 Carry Lewis 正在形成的理解。",
};

export default function ThinkingPage() {
  const latest = listEntries().filter((entry) => entry.kind === 'essay').slice(0, 3);
  return (
    <div className={styles.page} lang="zh-CN">
      <header className={styles.section}>
        <p className={styles.eyebrow}>THINKING / 思考</p>
        <h1
          style={{
            fontSize: "clamp(32px, 4vw, 46px)",
            marginTop: 20,
            lineHeight: 1.5,
          }}
        >
          记录判断，也给改变留下空间。
        </h1>
        <p className={styles.intro}>
          这里从问题出发。医学、技术、长跑与信仰，是我理解世界的不同入口；写作则让我检查，自己究竟理解了什么。
        </p>
      </header>
      <section className={styles.reading} aria-labelledby="opening-title">
        <div>
          <p className={styles.eyebrow}>START HERE / 从这里开始</p>
          <h2 id="opening-title">一份观测站的开场白。</h2>
          <p>为什么把这些兴趣放在一起，以及我希望怎样记录它们。</p>
        </div>
        <Link href={openingNote.href} className={styles.noteLink}>
          <span className={styles.eyebrow}>
            {openingNote.label} ·{" "}
            <time dateTime={openingNote.date}>{openingNote.date}</time>
          </span>
          <h3>{openingNote.title}</h3>
          <p>{openingNote.summary}</p>
          <span className={styles.textLink}>
            阅读开篇 <span aria-hidden>↗</span>
          </span>
        </Link>
      </section>
      <section className={styles.section} aria-labelledby="threads-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>QUESTIONS, NOT CONCLUSIONS</p>
            <h2 id="threads-title">三条仍在延伸的问题线索。</h2>
          </div>
          <p>它们是探索的方向。下面的入口连接现有研究、项目与个人介绍。</p>
        </div>
        <div className={styles.threads}>
          {inquiryThreads.map((thread) => (
            <article className={styles.thread} key={thread.id}>
              <p className={styles.eyebrow}>
                {thread.number} / {thread.label}
              </p>
              <h3>{thread.title}</h3>
              <p>{thread.description}</p>
              <div className={styles.tags}>
                {thread.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.threadLink}>
                <small>{thread.context}</small>
                <Link href={thread.link.href}>
                  {thread.link.label} <span aria-hidden>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="journal-title">
        <p className={styles.eyebrow}>READING & NOTES</p>
        <h2 id="journal-title">书单、随笔与排行榜。</h2>
        <p>读过的书、日常的观察，以及此刻的偏好。</p>
        <div className={styles.tags}>{categories.map((category) => <Link key={category.kind} href={`/journal/#${category.kind}`}>{category.label} ↗</Link>)}</div>
        {latest.map((entry) => <Link key={entry.id} href={entryURL(entry)} className={styles.noteLink}><span className={styles.eyebrow}><time dateTime={entry.publishedAt}>{entry.publishedAt.slice(0, 10)}</time></span><h3>{entry.title}</h3><p>{entry.summary}</p></Link>)}
      </section>
      <section className={styles.connect}>
        <p className={styles.eyebrow}>FOLLOW THE THREAD</p>
        <h2>也可以从一个具体问题开始。</h2>
        <p>
          第一版的研究记录关注心脏电传导、临床推理与生物机制建模。它们提供了更具体的切口。
        </p>
        <Link href="/research/" className={styles.textLink}>
          进入研究记录 <span aria-hidden>↗</span>
        </Link>
      </section>
    </div>
  );
}
