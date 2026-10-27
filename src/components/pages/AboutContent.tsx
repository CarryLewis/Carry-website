import { translate, htmlLanguage, type Locale } from "@/i18n";
import type { Metadata } from "next";
import Link from "@/components/ui/LocalizedLink";
import { getPortraitCopy, openingNote } from "@/data/portrait";
import styles from "@/components/portrait/portrait.module.css";

export const metadata: Metadata = {
  title: "关于我",
  description:
    "认识 Carry Lewis：医学的学习者、工具的构建者，以及持续探索人的处境的人。",
};

export default function AboutContent({
  locale = "zh",
}: { locale?: Locale } = {}) {
  const t = (text: string) => translate(locale, text);
  const { portrait, inquiryThreads, featuredWork, openingNote } =
    getPortraitCopy(locale);
  return (
    <article className={styles.document} lang={htmlLanguage(locale)}>
      <p className={styles.eyebrow}>{t("ABOUT / 关于我")}</p>
      <h1>{t("我是 Carry Lewis。")}</h1>
      <p className={styles.lede}>
        {t("医学的学习者，工具的构建者，也是一个持续探索人的处境的人。")}
      </p>
      <p>
        {t(
          "我是一名医学生。医学之外，我也通过软件、长跑、阅读与信仰，尝试理解生命、意志、意义，以及人与世界的关系。",
        )}
      </p>
      <p>
        {t(
          "我希望这个网站能让不同领域的人找到交流的切口：也许是一个模型，一件工具，一段思考，或者一个我们都还没有答案的问题。",
        )}
      </p>
      <section id="medicine">
        <h2>{t("从机制出发，也记得具体的人。")}</h2>
        <p>
          {t(
            "医学与神经科学吸引我的地方，在于它们连接不同的观察尺度：细胞与分子、电活动与网络，以及真实的人。我关心一个结论是什么，也想知道它为什么成立，以及它还无法解释什么。",
          )}
        </p>
        <p>
          <Link href="/research/">{t("研究记录")}</Link>
          {t("保留了我在计算医学、生物机制与临床推理方向上的一些问题。")}
        </p>
      </section>
      <section id="building">
        <h2>{t("用构建，检查自己是否理解。")}</h2>
        <p>
          {t(
            "我喜欢把问题转化为可以操作的工具。心电模拟器、报告辅助评阅与知识系统，是我尝试连接理解与实践的方式。设计得完整不等于实际有效，所以我也希望记录实现中的取舍、限制和后续修正。",
          )}
        </p>
        <p>
          {t("你可以从")}
          <Link href="/projects/">{t("作品目录")}</Link>
          {t("进入具体项目，也可以在")}
          <Link href="/lab/">{t("视觉实验")}</Link>
          {t("里看看我如何探索信息的表达。")}
        </p>
      </section>
      <section id="practice">
        <h2>{t("在长距离里，认识限制。")}</h2>
        <p>
          {t(
            "长跑是我的兴趣之一。体能、节奏与持续投入，使“耐心”和“意志”成为具体的问题。我希望把这类实践与阅读、思考放在一起，让生活中的经验也能反过来检验想法。",
          )}
        </p>
      </section>
      <section id="meaning">
        <h2>{t("认真对待信仰，也认真对待问题。")}</h2>
        <p>
          {t(
            "我对基督教，以及佛教、伊斯兰教等思想传统感兴趣。阅读和思考这些内容，让我追问什么值得相信、不同主张如何面对质疑，以及信念怎样与生活发生关系。",
          )}
        </p>
        <p>
          {t(
            "这里不试图用几句话给出完整立场。我希望在具体问题中逐渐说明自己的理解，区分已经形成的判断与仍在探索的部分。",
          )}
        </p>
      </section>
      <section>
        <h2>{t("这个观测站，会继续变化。")}</h2>
        <p>
          {t(
            "它既容纳作品，也容纳尚未完成的问题。我想留下自己如何认识世界的过程，并结识愿意认真讨论、一起做事的人。",
          )}
        </p>
        <p>
          <Link href="/thinking/how-i-explore/">{t("阅读观测站的开篇")}</Link>
          {t("，可以更完整地了解这条线索。")}
        </p>
      </section>
      <section id="contact">
        <h2>{t("从一个共同的问题，开始交流。")}</h2>
        <p>
          {t(
            "如果你对某个项目、研究问题或跨领域的尝试感兴趣，欢迎通过公开的 GitHub 主页找到我。",
          )}
        </p>
        <a href={portrait.github} className={styles.primary}>
          GitHub · CarryLewis <span aria-hidden>↗</span>
        </a>
      </section>
    </article>
  );
}
