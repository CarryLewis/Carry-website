import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug } from "@/data/projects";
import {
  featuredWork,
  inquiryThreads,
  openingNote,
  portrait,
} from "@/data/portrait";
import styles from "./portrait.module.css";

export function PortraitHome() {
  return (
    <div className={styles.page} lang="zh-CN">
      <section className={styles.hero} aria-labelledby="intro-title">
        <div>
          <p className={styles.eyebrow}>{portrait.eyebrow}</p>
          <p className={styles.hello}>你好，我是 Carry Lewis。</p>
          <h1 id="intro-title">{portrait.title}</h1>
          <p className={styles.intro}>{portrait.introduction}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/thinking/">
              阅读我的思考 <span aria-hidden>↗</span>
            </Link>
            <a className={styles.textLink} href="#selected-work">
              探索我的作品 <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
        <aside className={styles.map} aria-label="我的问题地图">
          <p className={styles.eyebrow}>A MAP OF QUESTIONS</p>
          <div className={styles.orbit}>
            <svg viewBox="0 0 400 340" fill="none" aria-hidden="true">
              <ellipse cx="200" cy="172" rx="154" ry="122" />
              <ellipse
                cx="200"
                cy="172"
                rx="113"
                ry="154"
                transform="rotate(42 200 172)"
              />
              <path d="M200 68 81 238 319 238Z M200 172V68 M200 172 81 238 M200 172 319 238" />
              <circle cx="200" cy="172" r="7" />
            </svg>
            <a
              className={`${styles.orbitNode} ${styles.nodeTop}`}
              href="#understanding"
            >
              <span>理解生命</span>
              <small>Medicine & mind</small>
            </a>
            <a
              className={`${styles.orbitNode} ${styles.nodeLeft}`}
              href="#making"
            >
              <span>付诸创造</span>
              <small>Tools & systems</small>
            </a>
            <a
              className={`${styles.orbitNode} ${styles.nodeRight}`}
              href="#living"
            >
              <span>追问信念</span>
              <small>Practice & meaning</small>
            </a>
          </div>
          <p className={styles.mapCaption}>
            从不同的入口，走向同一个人。
            <br />
            选择一个问题，开始探索。
          </p>
        </aside>
      </section>

      <div className={styles.marginNote}>
        <span>Observe → Question → Understand → Build → Reflect</span>
        <span>一个持续生长的个人思想实验室</span>
      </div>

      <section className={styles.section} aria-labelledby="questions-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>01 / LINES OF INQUIRY</p>
            <h2 id="questions-title">连接我的，是这些问题。</h2>
          </div>
          <p>
            兴趣跨越不同领域，问题把它们联系起来。
            <br />
            这里是我的出发点，也是可以与你相遇的地方。
          </p>
        </div>
        <div className={styles.threads}>
          {inquiryThreads.map((thread) => (
            <article key={thread.id} id={thread.id} className={styles.thread}>
              <p className={styles.eyebrow}>
                <span>{thread.number}</span> {thread.label}
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

      <section
        id="selected-work"
        className={styles.section}
        aria-labelledby="work-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>02 / SELECTED WORK</p>
            <h2 id="work-title">把问题，变成可以探索的东西。</h2>
          </div>
          <Link className={styles.textLink} href="/projects/">
            全部作品 <span aria-hidden>↗</span>
          </Link>
        </div>
        {featuredWork.map((work) => {
          const project = getProjectBySlug(work.slug);
          if (!project) return null;
          const recordUrl = `/projects/${project.status}/${project.slug}/`;
          const screenshot = project.screenshots?.[0];
          return (
            <article className={styles.work} key={work.slug}>
              <div className={styles.workVisual}>
                {screenshot ? (
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                ) : (
                  <div className={styles.ecgPlate}>
                    <span className={styles.eyebrow}>
                      ECG SIMULATOR / MECHANISM → SIGNAL
                    </span>
                    <svg
                      viewBox="0 0 520 180"
                      role="img"
                      aria-label="心电机制到信号的示意图，非模拟器运行截图"
                    >
                      <path
                        className={styles.ecgGrid}
                        d="M0 45H520M0 90H520M0 135H520M65 0V180M130 0V180M195 0V180M260 0V180M325 0V180M390 0V180M455 0V180"
                      />
                      <path
                        className={styles.ecgLine}
                        d="M0 100H45Q57 100 64 88Q72 78 80 100H105L115 112 128 24 142 146 154 100H183Q202 62 224 100H279Q291 100 298 88Q306 78 314 100H339L349 112 362 24 376 146 388 100H417Q436 62 458 100H520"
                      />
                    </svg>
                    <div className={styles.ecgLegend}>
                      <span>电传导</span>
                      <span aria-hidden>→</span>
                      <span>共享心电向量</span>
                      <span aria-hidden>→</span>
                      <span>十二导联</span>
                    </div>
                    <small>机制示意 · 非运行截图</small>
                  </div>
                )}
              </div>
              <div className={styles.workCopy}>
                <p className={styles.eyebrow}>
                  {work.number} / {work.label}
                </p>
                <p className={styles.workName}>
                  {project.slug === "ecg-simulator"
                    ? "ECG Simulator"
                    : "Labwise"}
                </p>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <p className={styles.availability}>{work.availability}</p>
                <div className={styles.actions}>
                  {project.demoUrl ? (
                    <a className={styles.primary} href={project.demoUrl}>
                      {work.primaryLabel} <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <Link className={styles.primary} href={recordUrl}>
                      {work.primaryLabel} <span aria-hidden>↗</span>
                    </Link>
                  )}
                  {project.demoUrl ? (
                    <Link className={styles.textLink} href={recordUrl}>
                      项目记录 <span aria-hidden>↗</span>
                    </Link>
                  ) : (
                    <a className={styles.textLink} href={project.repoUrl}>
                      查看源码 <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
                <small className={styles.workNote}>{work.note}</small>
              </div>
            </article>
          );
        })}
      </section>

      <section className={styles.reading} aria-labelledby="reading-title">
        <div>
          <p className={styles.eyebrow}>03 / A NOTE TO BEGIN</p>
          <h2 id="reading-title">让想法留下痕迹。</h2>
          <p>作品呈现我在做什么，文字解释我为什么出发。</p>
        </div>
        <Link className={styles.noteLink} href={openingNote.href}>
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

      <section className={styles.section} aria-labelledby="explore-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>04 / FURTHER EXPLORATION</p>
            <h2 id="explore-title">沿着兴趣，继续走。</h2>
          </div>
          <p>第一版积累的研究、知识与实验，仍在这里。</p>
        </div>
        <div className={styles.exploreList}>
          {[
            {
              href: "/research/",
              title: "研究线索",
              en: "Research",
              text: "从机制与问题进入医学和计算的探索。",
            },
            {
              href: "/knowledge/",
              title: "知识网络",
              en: "Knowledge",
              text: "在概念、作品和不同领域之间建立联系。",
            },
            {
              href: "/lab/",
              title: "视觉实验",
              en: "Design lab",
              text: "尝试让信息结构决定表达方式。",
            },
          ].map((item) => (
            <Link href={item.href} key={item.href}>
              <span>
                {item.title}
                <small>{item.en}</small>
              </span>
              <p>{item.text}</p>
              <span aria-hidden>↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="connect"
        className={styles.connect}
        aria-labelledby="connect-title"
      >
        <p className={styles.eyebrow}>AN OPEN INVITATION</p>
        <h2 id="connect-title">也许，我们正在追问相似的问题。</h2>
        <p>{portrait.invitation}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href={portrait.github}>
            在 GitHub 找到我 <span aria-hidden>↗</span>
          </a>
          <Link className={styles.textLink} href="/about/">
            更多关于我 <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
