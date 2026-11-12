import { htmlLanguage, type Locale } from "@/i18n";
import Link from "@/components/ui/LocalizedLink";
import { bridgeRepository, getBridgeCopy } from "@/data/knowledge-bridge";
import { BridgeDemo } from "./BridgeDemo";
import styles from "./bridge.module.css";

export default function BridgePage({ locale = "zh" }: { locale?: Locale }) {
  const t = (zh: string, en: string) => locale === "zh" ? zh : en;
  const copy = getBridgeCopy(locale);
  return <article className={styles.page} lang={htmlLanguage(locale)}>
    <header className={styles.hero}>
      <Link href="/projects/" className={styles.back}>{t("← 返回作品", "← Back to work")}</Link>
      <div className={styles.heroGrid}><div><p className={styles.eyebrow}>PERSONAL KNOWLEDGE BRIDGE / 01</p><h1>{copy.title}</h1><p className={styles.lede}>{copy.summary}</p><div className={styles.actions}><a className={styles.primary} href="#walkthrough">{t("跟随一条想法", "Follow an idea")} ↓</a><a href={bridgeRepository} target="_blank" rel="noreferrer">{t("查看 GitHub 项目", "Explore the repository")} ↗</a></div></div>
      <aside className={styles.manifesto}><span className={styles.eyebrow}>{t("我想保留的", "WHAT I WANT TO KEEP")}</span><p>{t("不只是读过什么，\n还有当时为什么停下来，\n以及后来怎样改变了想法。", "What I read.\nWhat made me pause.\nAnd how my thinking changed.")}</p><span className={styles.small}>{t("记录 → 联系 → 回看 → 再理解", "CAPTURE → CONNECT → REVISIT → RECONSIDER")}</span></aside></div>
    </header>
    <nav className={styles.sectionNav} aria-label={t("本页导航", "On this page")}><a href="#philosophy">01 / {t("工作哲学", "Principles")}</a><a href="#walkthrough">02 / {t("流程演示", "Walkthrough")}</a><a href="#implementation">03 / {t("实现与边界", "Implementation")}</a></nav>
    <section className={styles.section} id="philosophy" aria-labelledby="philosophy-title"><div className={styles.sectionHeading}><p className={styles.eyebrow}>01 / WHY KEEP NOTES</p><h2 id="philosophy-title">{t("记录，是为了还能回来。", "Keep a note so I can return to it.")}</h2></div><div className={styles.principles}>
      {[
        [t("01 / 保留自己的声音", "01 / KEEP MY OWN WORDS"), t("先留下问题，再整理解释。", "Capture the question before organizing an answer."), t("AI 帮助把观察、解释与疑问分开。原话留下来，才有机会回看当时的想法，以及后来理解的变化。", "AI helps separate observation, interpretation and uncertainty. Keeping the original words makes it possible to revisit what I thought and how it changed.")],
        [t("02 / 留下材料的来处", "02 / KEEP THE SOURCE"), t("自己的想法与读到的材料，各有位置。", "My thoughts and my reading each have a place."), t("Notion 记自己的思考，印象笔记保留摘抄。把有用的段落放到一起时，也把书名、页码和原始出处带过来。", "Notion holds my thinking; Yinxiang Biji keeps excerpts. When a useful passage joins a note, its book, page and original source come with it.")],
        [t("03 / 回看比连线更重要", "03 / READ BEYOND THE LINKS"), t("图谱提供入口，理解来自重读。", "The graph offers a way in. Rereading brings understanding."), t("一条线表示记录中留下的联系。把相连的笔记放在一起读，才知道它们是在说同一件事，还是碰巧用了相似的词。", "A line represents an explicit link. Read the connected notes together to find out whether they concern the same thing or simply share similar words.")],
      ].map(([label, title, body]) => <div key={label}><p className={styles.eyebrow}>{label}</p><h3>{title}</h3><p>{body}</p></div>)}
    </div></section>
    <section className={styles.section} id="walkthrough" aria-labelledby="walkthrough-title"><div className={styles.sectionHeading}><p className={styles.eyebrow}>02 / FROM AN OBSERVATION TO A CONNECTION</p><h2 id="walkthrough-title">{t("一条想法，怎样再次被遇见？", "How does an idea find its way back?")}</h2><p>{t("用“怎样才算理解”这个问题，走一遍我的记录与回看流程。点击阶段或图谱节点，查看每一步的作用。", "Follow the question of what counts as understanding through the workflow. Select a stage or a graph node to explore its role.")}</p></div><BridgeDemo locale={locale}/></section>
    <section className={styles.section} aria-labelledby="roles-title"><div className={styles.sectionHeading}><p className={styles.eyebrow}>THREE PLACES / ONE CONTINUING QUESTION</p><h2 id="roles-title">{t("工具分工，让问题继续生长。", "Different tools, a continuing question.")}</h2></div><div className={styles.roles}>
      <div><span>Notion</span><h3>{t("自己的想法", "My own thinking")}</h3><p>{t("捕捉问题，整理对话，维护思考记录。新的理解继续补回这里。", "Capture questions, organize conversations and maintain records. Return here to add new understanding.")}</p></div>
      <div><span>{t("印象笔记", "Yinxiang Biji")}</span><h3>{t("读到的材料", "What I read")}</h3><p>{t("保存读书摘抄与出处。挑选有用的材料，再与自己的问题放在一起看。", "Keep reading excerpts and sources. Select relevant material to consider alongside my questions.")}</p></div>
      <div><span>Obsidian</span><h3>{t("回看的路径", "A way to revisit")}</h3><p>{t("保存同步后的本地笔记，用主题与已确认的关联，在图谱中找到另一条记录。", "Keep synced local notes. Use themes and confirmed links to find another record in the graph.")}</p></div>
    </div></section>
    <section className={`${styles.section} ${styles.implementation}`} id="implementation" aria-labelledby="implementation-title"><div><p className={styles.eyebrow}>03 / CURRENT STATE</p><h2 id="implementation-title">{t("已经连接的，\n和还在搭建的。", "What is connected.\nWhat is still being built.")}</h2><p>{t("根据项目公开文档整理 · 2026-11-12", "Based on public project documentation · 2026-11-12")}</p></div><dl className={styles.statusList}>
      {[
        [t("已实现", "IMPLEMENTED"), "Notion → Obsidian", t("运行同步器，读取已保存的 Notion 记录，生成本地 Markdown 与主题、笔记链接。", "Run the sync tool to read saved Notion records and generate local Markdown with theme and note links.")],
        [t("人工进行", "MANUAL"), t("摘抄整理与回看补写", "Excerpt selection and reflection"), t("挑选阅读材料、确认联系、重读与补写由自己完成。AI 对话与录入需要相应工具和权限。", "Select excerpts, confirm connections, reread and update records by hand. AI conversation and capture need the relevant tools and permissions.")],
        [t("规划中", "PLANNED"), t("批量导入、持续同步与写回", "Bulk import, continuous sync and writeback"), t("印象笔记批量导入与后续同步、Obsidian → Notion 写回仍在设计中。", "Bulk import and ongoing sync from Yinxiang Biji, and Obsidian → Notion writeback, are still being designed.")],
      ].map(([status,title,body]) => <div key={title}><dt><span>{status}</span><strong>{title}</strong></dt><dd>{body}</dd></div>)}
    </dl></section>
    <footer className={styles.closing}><p className={styles.eyebrow}>TRY A SMALL BEGINNING</p><h2>{t("从几条笔记，一个问题开始。", "Start with a few notes and one question.")}</h2><p>{t("先用少量样例试跑 Notion → Obsidian，再看看这些联系是否真的帮助自己重新理解。", "Try Notion → Obsidian with a few sample notes, then see whether the connections help you reconsider a question.")}</p><div className={styles.actions}><a className={styles.primary} href={`${bridgeRepository}/blob/main/docs/LOCAL_SETUP.md`} target="_blank" rel="noreferrer">{t("阅读本地部署指南", "Read the local setup guide")} ↗</a><a href={`${bridgeRepository}/blob/main/docs/platforms/README.md`} target="_blank" rel="noreferrer">{t("查看平台接入状态", "Read platform status")} ↗</a><Link href="/projects/active/personal-knowledge-bridge/">{t("项目记录", "Project notes")} →</Link></div><p className={styles.note}>{t("本页为工作流展示，不在浏览器中运行同步器。演示采用说明性问题，不读取或展示私人笔记。", "This page presents the workflow; it does not run the sync tool in your browser. The walkthrough uses illustrative questions and does not access private notes.")}</p></footer>
  </article>;
}
