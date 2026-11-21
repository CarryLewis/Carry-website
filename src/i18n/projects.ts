import type { Project } from "@/domain/entities";
import type { Locale } from "@/i18n";
const chinese: Record<string, Partial<Project>> = {
  "clinical-case-workspace": {
    title: "临床病例工作台 · Clinical Case Workspace",
    summary: "把原始文档、彩色批注、人工核对和学习问题连接起来。本地原型使用合成材料；公开简介展示当前功能、证据工作流与知识关联设计。",
    problem: "纸上划出的重点，怎样成为可回看原文、保留审核历史与不确定性的临床学习记录？",
    architecture: "原始文档 → 批注 → 独立的人工事实审核 → 教学解释 → 确认知识关联 → 学习归档。当前使用合成数据和固定 Demo 服务。",
    designPhilosophy: "保留原件，分开审核批注与事实；区分观察、个人理解和模型假设。修改来源后，下游分析与关联重新待审。",
    implementation: "本地原型包含 4 个主要页面、3 份合成病例、4 页文档、14 条手工批注和 7 项待审核事实。2026-11-17 的 13 项自动化验收通过。公开 HTML 包含项目介绍、流程、合成锚点交互、知识关联架构与路线图；不运行完整应用，不上传文件，也不连接真实 OCR、模型或 Notion。",
    workflow: ["阅读原始文档", "核对批注文字与来源坐标", "单独确认病例事实", "查看明确标注的教学 Demo", "确认本地知识关联", "归档经审核的学习草稿"],
  },

  "ecg-simulator": {
    title: "心电模拟器 2.0",
    summary:
      "心电模拟器 2.0 将三维心脏与十二导联心电图联系起来。新模型标注为“源 2.0”，提供连续心室轮廓、引线标注和室间隔剖面；原模型标注为“源 1.0”，可随时切换对照。",
    problem:
      "怎样把组织层面的电传导模型与可解释的临床心电波形联系起来，包括疾病状态，而不是为各导联预设电压？",
    architecture:
      "生理情景改变模型参数，经由生理模型与周期计划生成共同的心电向量，同时驱动三维心脏发光与十二导联信号。提供中文与英文界面。",
    designPhilosophy:
      "重视机制的清晰性。疾病通过改变生理模型影响结果，心脏激动和心电信号随同一模型变化。",
    implementation:
      "模拟器版本仍为 2.0，新心脏模型命名为“源 2.0”，之前的模型命名为“源 1.0”。源 2.0 提供连续心室轮廓、清晰引线标注、室间隔剖面，并区分结构选中与电激动反馈。两个模型共用现有生理模型和完整十二导联；在源 1.0 中选择结构或调整透明度时，会保留在旧模型中。模拟器 1.0 的源码归档也继续保留。",
    resourceLinks: [
      { label: "源 2.0 模型", href: "/ecg-simulator/?view=source-2" },
      { label: "源 1.0 模型", href: "/ecg-simulator/?view=source-1" },
      { label: "模拟器 2.0 源码", href: "https://github.com/CarryLewis/ECG-stimulator/tree/release/2.0" },
      { label: "模拟器 1.0 源码归档", href: "https://github.com/CarryLewis/ECG-stimulator/tree/release/1.0" },
    ],
  },
  "clinical-reasoning-ai": {
    title: "临床推理 AI",
    summary: "探索代理架构如何展示诊断推理的中间步骤，用于医学学习。",
    problem: "AI 怎样呈现中间的临床假设，而不仅给出最终答案？",
    architecture:
      "病例输入 → 鉴别诊断 → 证据评议 → 教学推理记录。目前为原型探索。",
  },
  "personal-knowledge-bridge": {
    title: "个人知识桥 · Personal Knowledge Bridge",
    summary: "Notion 记自己的思考，印象笔记保留阅读摘抄，Obsidian 帮助沿着明确的联系回看，让新的阅读回应过去的问题。",
    problem: "工作里留下的疑问，怎样在后来的阅读中再次被遇见，并有机会补上新的理解？",
    architecture: "只读连接读取 Notion 中已保存的记录，生成本地 Obsidian Markdown。共同主题和已确认的笔记关联转为链接；摘抄挑选、回看和补写由自己完成。",
    designPhilosophy: "保留自己的原话，也保留材料的出处。图谱帮助找到记录，把笔记放在一起重读，才知道联系是否有意义。新的理解继续补回原来的记录。",
    implementation: "已实现 Notion → Obsidian 单向同步。网站提供公开示例的交互演示，不读取私人笔记，也不在网页中运行同步器。批量导入、持续同步与 Obsidian → Notion 写回仍在规划中。",
  },
  "personal-knowledge-os": {
    title: "个人知识系统",
    summary: "用于长期积累、关联与检索研究及思考的个人知识系统。",
    problem: "怎样让长期的思考保持联系，跨越研究、项目与阅读观察？",
    architecture:
      "实体关系图、内容仓库适配层与观测站界面。外部内容系统的接入按实际进展推进。",
  },
  "research-brief": {
    title: "Research Brief · 研究简报",
    summary:
      "以 Notion 为输入、Obsidian 为记忆与关系层，并在网站呈现公开研究内容的观测流程。",
    problem: "怎样把阅读与思考积累成持久、可公开并具有关联的研究记忆？",
    architecture:
      "内容湖、知识对象与单向同步，将 Notion 中的记录整理到知识库，并通过公开 HTML 展示。",
    designPhilosophy:
      "Notion 负责输入，Obsidian 负责记忆与关联，网站负责公开呈现。",
    implementation: "网站嵌入 research_brief 仓库固定版本的公开 HTML 页面。",
  },
  "html-design-lab": {
    title: "HTML 视觉实验室",
    summary: "按信息结构整理独立的 HTML 视觉实验，让知识的结构决定视觉形式。",
    problem: "怎样让信息结构决定表达形式，使交互帮助理解机制？",
    architecture:
      "按类别维护 HTML、CSS 与 JavaScript 实验；在本站的结构工作台连接信息结构、表达形式与可运行样本。",
    designPhilosophy:
      "先识别信息结构，再选择表达形式，最后检验交互是否让机制变得清晰。",
    implementation:
      "本站 /lab/ 为结构工作台；公开实验来自 HTML-Design-Lab 仓库的固定版本。",
  },
  "lab-report-assistant": {
    title: "Labwise · 实验报告辅助评阅",
    summary:
      "帮助教师理解英文实验报告、核对原文证据，并对照评分标准审核 AI 建议。最终分数与反馈由教师确认。",
    problem:
      "阅读英文实验报告需要理解科学推理、核对作业要求、查找证据并撰写反馈。Labwise 将这些环节放在同一个教师工作空间，降低阅读与查证成本，同时保留专业判断。",
    architecture:
      "作业与评分标准快照 → DOCX 解析与原文锚点 → 后台 AI 建议 → 原文与教师审核联动 → 教师确认 → Word 反馈包。界面使用 HTML、CSS 与 JavaScript，本地 Python 服务提供接口，SQLite 保存草稿，模型服务由后台配置。",
    designPhilosophy:
      "先理解，再评阅。建议须回到具体段落、引文或图表，与当前评分标准核对。AI 分析完成不等于教师评阅完成；无法定位的证据保留为待核实。",
    implementation:
      "当前为持续开发的本地教师试点，支持作业与评分标准、Word 报告导入、建议审核、草稿保存及教师确认的反馈包。新提交只接受 DOCX；历史 PDF 仍可阅读。截图来自虚构测试材料，不代表当前全部功能的验收。",
    reflection:
      "目标是更快理解与更可靠的反馈。后续关注证据准确性、复杂文档覆盖和回归稳定性；当前有已知回归失败，尚未宣称生产就绪，也没有经验证的效率提升百分比。",
    downloadNotes:
      "下载为完整源码，并非独立安装包。需按仓库说明配置 Python 依赖、AI 服务及可选 Word 转换。macOS 提供启动入口；Windows 尚需单独验证。不含学生资料、数据库或密钥。",
    workflow: [
      "创建作业并核对评分标准",
      "导入 Word 报告并排队分析",
      "对照原文审核建议",
      "采纳、编辑或拒绝建议并录入分数",
      "确认反馈后继续评阅",
      "导出教师确认的批改包",
    ],
  },
};
export function localizedProject(project: Project, locale: Locale): Project {
  if (locale === "zh")
    return {
      ...project,
      ...chinese[project.slug],
      screenshots: project.screenshots?.map((s, i) => ({
        ...s,
        alt:
          i === 0
            ? "Labwise 对虚构实验报告进行证据关联评阅的测试界面"
            : "Labwise 虚构图表的历史审核界面",
        caption:
          i === 0
            ? "2026 年 10 月 24 日的虚构报告历史验证截图。"
            : "2026 年 10 月 25 日的历史视觉审核实验，非当前全部功能的验收证明。",
      })),
    };
  if (project.slug !== "lab-report-assistant")
    return {
      ...project,
      technology: project.technology.map((s) => s.replace("中文", "Chinese")),
    };
  const first = (v?: string) => v?.split("\n\n")[0];
  return {
    ...project,
    title: "Labwise · Evidence-led review",
    summary:
      "AI assistance for understanding university lab reports, checking source evidence and reviewing rubric-linked suggestions. Final scores and feedback stay with the instructor.",
    problem: first(project.problem)!,
    architecture: first(project.architecture)!,
    designPhilosophy: first(project.designPhilosophy),
    implementation: `${first(project.implementation)} This remains a local instructor pilot. Screenshots use fictional test material and are not acceptance evidence for every current feature.`,
    reflection: `${first(project.reflection)} The current snapshot has known regression failures, is not production-ready, and makes no validated percentage claim of efficiency gains.`,
    downloadNotes:
      "Complete source ZIP, not a standalone installer. Follow the repository setup guide for Python dependencies, model configuration and optional Word conversion. Windows setup still needs separate validation. No student records, databases or secrets are included.",
    workflow: project.workflow?.map((s) => s.split(" / ")[0]),
    screenshots: project.screenshots?.map((s) => ({
      ...s,
      caption: s.caption.replace(/\s*[\u4e00-\u9fff].*$/, ""),
    })),
    resourceLinks: project.resourceLinks?.map((r, i) => ({
      ...r,
      label:
        [
          "Chinese project overview and setup",
          "English overview and setup",
          "Word-first review workflow",
        ][i] ?? r.label,
    })),
  };
}
