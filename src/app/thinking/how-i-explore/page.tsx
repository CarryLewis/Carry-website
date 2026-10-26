import type { Metadata } from "next";
import Link from "next/link";
import { openingNote } from "@/data/portrait";
import styles from "@/components/portrait/portrait.module.css";

export const metadata: Metadata = {
  title: openingNote.title,
  description: openingNote.summary,
};

export default function OpeningNotePage() {
  return (
    <article className={styles.document} lang="zh-CN">
      <Link href="/thinking/" className={styles.back}>
        ← 返回思考
      </Link>
      <p className={styles.eyebrow}>PERSONAL OBSERVATORY / 开篇</p>
      <h1>{openingNote.title}</h1>
      <p className={styles.articleMeta}>
        Carry Lewis ·{" "}
        <time dateTime={openingNote.date}>{openingNote.date}</time> · 个人思考
      </p>
      <p className={styles.lede}>
        我想把这里建成一个向外开放的思想实验室：让人看见我关心什么、如何面对不确定性，以及怎样把理解转化为现实中的创造。
      </p>
      <h2>从不同入口，理解人的处境</h2>
      <p>
        医学、神经科学、人工智能、长跑、宗教与阅读，看起来属于不同的领域。把它们放在一起，并不意味着我已经找到一套能解释一切的理论。它们只是让我以不同方式接近一些相互关联的问题。
      </p>
      <p>
        医学让我追问生命如何运作；软件创造让我尝试把理解转成可以操作的模型；长跑使限制不再只是一个抽象概念。对基督教与其他思想传统的阅读，则让我继续追问：什么值得相信，什么值得长期投入？
      </p>
      <h2>构建，是检查理解的一种方式</h2>
      <p>
        一个想法在脑海里可以很完整，真正把它写成模型、做成工具时，遗漏才会显现。我希望在具体的构建中检查自己的理解，也允许实践反过来改变问题。
      </p>
      <p>
        <Link href="/projects/active/ecg-simulator/">心电模拟器</Link>
        尝试联系心脏电传导与 ECG 信号；
        <Link href="/projects/prototype/lab-report-assistant/">Labwise</Link>
        则围绕报告原文、证据与教师判断组织 AI
        辅助评阅。这些作品给出的是可探索的尝试，而不是所有问题的答案。
      </p>
      <h2>把判断与疑问，都写清楚</h2>
      <p>
        我希望这里的文字既能表达判断，也能保留疑问。对于一条科学结论，需要关心证据与适用范围；对于信仰和意义的问题，也需要说明自己为何接受、质疑，或者暂时无法回答。
      </p>
      <p>
        不同的问题未必有相同的回答方式。比急于把它们统一起来更重要的，是尽可能准确地说清楚：我目前相信什么，依据是什么，还有什么没有想明白。
      </p>
      <h2>让认识有改变的余地</h2>
      <p>
        Observe → Question → Understand → Build →
        Reflect。这条路径不是一套完成了的个人理论，而是我希望不断练习的方法：认真观察，提出问题，尝试理解，付诸创造，再回头检查。
      </p>
      <p>
        这个观测站也会沿着这条路径生长。作品会修改，文章会补充，某些判断可能会改变。留下这些痕迹，是为了让理解的过程本身也可以被看见。
      </p>
      <p className={styles.articleEnd}>
        如果某个问题与你的经验相交，欢迎继续看看
        <Link href="/about/">我的背景与兴趣</Link>，或者从
        <Link href="/projects/">一个作品</Link>开始。
      </p>
    </article>
  );
}
