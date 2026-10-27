/** Public editorial copy: grounded in the owner's supplied portrait, not inferred chat history. */
export const portrait = {
  eyebrow: "PERSONAL OBSERVATORY / 个人观测站",
  title: "学习医学，构建工具，\n持续追问如何理解人。",
  introduction:
    "我是 Carry Lewis，一名医学生。我通过医学与神经科学理解生命，通过软件把问题变成可以探索的模型，也通过长跑、阅读与信仰思考人的限制、意志与意义。",
  invitation:
    "这里收集我的作品、问题和逐渐形成的判断。如果某个问题也让你停下来思考，希望我们有机会交流。",
  github: "https://github.com/CarryLewis",
};

export const inquiryThreads = [
  {
    id: "understanding",
    number: "01",
    label: "MEDICINE & MIND",
    title: "我们如何理解一个人？",
    description:
      "从细胞、电信号到意识与经验，医学让我追问机制，也提醒我：解释生命，需要在不同尺度之间来回看。",
    context: "从一个具体机制开始",
    link: {
      label: "心脏电传导与 ECG",
      href: "/research/computational-medicine/ecg-conduction/",
    },
    aboutHref: "/about/#medicine",
    tags: ["医学", "神经科学", "人的经验"],
  },
  {
    id: "making",
    number: "02",
    label: "TOOLS & JUDGMENT",
    title: "理解，怎样成为有用的创造？",
    description:
      "把一个想法写成程序，让抽象机制可以被操作。对我来说，构建也是检验理解、发现盲点的一种方法。",
    context: "看一个正在实践的回答",
    link: {
      label: "Labwise：证据与教师判断",
      href: "/projects/prototype/lab-report-assistant/",
    },
    aboutHref: "/about/#building",
    tags: ["人工智能", "软件", "知识系统"],
  },
  {
    id: "living",
    number: "03",
    label: "PRACTICE & MEANING",
    title: "面对限制与不确定性，如何生活？",
    description:
      "长跑、阅读和对基督教的思考，把我带向另一些问题：什么值得相信？怎样面对限制？什么值得长期投入？",
    context: "认识这些兴趣的联系",
    link: { label: "关于实践与信仰", href: "/about/#meaning" },
    aboutHref: "/about/#meaning",
    tags: ["长跑", "信仰", "哲学"],
  },
] as const;

export const featuredWork = [
  {
    slug: "ecg-simulator",
    number: "01",
    label: "COMPUTATIONAL MEDICINE",
    title: "让心脏的电活动，变得可以理解。",
    description:
      "把心脏电传导、三维解剖与十二导联 ECG 联系起来。通过操作模型，探索机制如何形成我们看到的信号。",
    availability: "在线交互模拟 · 持续开发",
    note: "用于学习与机制探索。",
    primaryLabel: "体验模拟器",
  },
  {
    slug: "lab-report-assistant",
    number: "02",
    label: "AI & HUMAN JUDGMENT",
    title: "让 AI 辅助理解，把判断留给教师。",
    description:
      "Labwise 将实验报告原文、评分标准和 AI 建议放在同一个评阅空间，帮助教师核对证据，形成可审核的反馈。",
    availability: "教师试点原型 · 需本地运行",
    note: "截图来自虚构测试报告；不代表生产就绪。",
    primaryLabel: "了解 Labwise",
  },
] as const;

export const openingNote = {
  title: "在问题之间，建立自己的观测站",
  summary:
    "医学、构建、长跑与信仰，看似分散的兴趣，怎样成为理解世界的不同入口。",
  href: "/thinking/how-i-explore/",
  date: "2026-10-27",
  label: "开篇 · 个人思考",
};

import { translateValue, type Locale } from "@/i18n";
export function getPortraitCopy(locale: Locale) {
  return translateValue(locale, {
    portrait,
    inquiryThreads,
    featuredWork,
    openingNote,
  });
}
