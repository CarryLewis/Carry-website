import type { Metadata } from "next";
import { signals } from "@/data/signals";
import styles from "@/components/portrait/portrait.module.css";

export const metadata: Metadata = {
  title: "研究观察",
  description: "第一版观测站保留的研究观察摘录，按记录日期阅读。",
};

export default function SignalsIndexPage() {
  return (
    <div className={styles.document} lang="zh-CN">
      <p className={styles.eyebrow}>SIGNALS / 研究观察</p>
      <h1>留下一些观察，继续核对来源。</h1>
      <p className={styles.lede}>
        这里保留第一版的观察摘录，日期代表当时的记录时间。
      </p>
      <p>
        以下记录尚未补充可核验的原文链接，应作为待追踪的阅读线索，不能据此判断当前研究进展。它们不再作为首页的最新动态展示。
      </p>
      {signals.map((signal) => (
        <section id={signal.slug} key={signal.id}>
          <h2 lang="en">{signal.title}</h2>
          <p className={styles.articleMeta}>
            <time dateTime={signal.date}>{signal.date}</time> · 第一版摘录 ·
            原始来源待补充
          </p>
          <p lang="en">{signal.summary}</p>
        </section>
      ))}
    </div>
  );
}
