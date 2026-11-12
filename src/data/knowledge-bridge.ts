import type { Locale } from "@/i18n";

export const bridgeRepository = "https://github.com/CarryLewis/personal-knowledge-bridge";
export const bridgePath = "/knowledge-bridge/";
export const bridgeCopy = {
  zh: {
    title: "让零散的记录，\n重新回到一个问题。",
    summary: "在 Notion 里留下自己的想法，在印象笔记里保留读到的材料，再到 Obsidian 里沿着联系回看。让一次新的阅读，有机会改变过去的理解。",
    steps: [
      { name: "留下问题", tool: "Notion · 记录", title: "先记下发生了什么。", body: "工作里遇到想不通的事，先保留自己的原话。与 AI 对话时，把观察、解释和还没想清楚的问题分开，再整理进思考数据库。", sample: "观察：他记住了步骤，却说不清什么时候该换一种做法。", note: "AI 对话与录入在 Notion 中完成，取决于工作区权限；本页只演示过程。" },
      { name: "带回材料", tool: "印象笔记 · 阅读", title: "让读到的话回应自己的问题。", body: "回看读书摘抄，挑选与这个问题有关的段落。保留书名、页码与原始出处，再写下它让自己重新考虑了什么。", sample: "阅读时追问：能复述一段话，就算理解了吗？", note: "目前手动挑选与整理；批量导入工具仍在设计中。示例不含真实书摘。" },
      { name: "确认联系", tool: "Notion · 整理", title: "共同的问题，比相同的词更有用。", body: "把长期关心的问题作为主题，确认哪些记录值得放在一起看。共同主题和已确认的笔记关联，会在同步时变为链接。", sample: "共同主题：怎样判断自己真的理解了？", note: "链接来自记录中明确留下的主题与关联，不把词语相似直接当作结论。" },
      { name: "沿线回看", tool: "Obsidian · 回看", title: "点开联系，再读一次。", body: "运行单向同步，把 Notion 中保存的记录转为本地 Markdown。在图谱里从一个问题走到另一条记录，比较当时的理解。", sample: "两条笔记汇到一个问题：读书时的疑问，与工作里的观察。", note: "已实现 Notion → Obsidian 单向同步。日常修改仍回到 Notion；写回功能在设计中。" },
      { name: "补上理解", tool: "Notion · 再思考", title: "回到原来的记录，补一笔。", body: "把相连的笔记放在一起读，判断它们是否真的在谈同一件事。有了新的解释，再回到 Notion 的原记录继续写。", sample: "新的追问：除了复述，能不能解释选择，并在情境改变时调整？", note: "这是人工回看与补写的循环，尚未实现跨平台自动闭环。" },
    ],
    nodes: [
      { title: "读书时的问题", body: "能复述一段话，就算理解了吗？把疑问留下，等待其他经历来回应。" },
      { title: "怎样判断自己真的理解了？", body: "这是两条示例笔记共同指向的主题。点和线帮助找到材料，理解仍要回到原文与情境。" },
      { title: "工作中的复盘", body: "他记住了步骤，却说不清什么时候该换一种做法。它与阅读疑问的联系，需要放在一起读过才知道。" },
    ],
  },
  en: {
    title: "Bring scattered notes\nback to a question.",
    summary: "Keep my own thinking in Notion, reading excerpts in Yinxiang Biji, and revisit their connections in Obsidian. A new reading can become a reason to reconsider an earlier idea.",
    steps: [
      { name: "Capture", tool: "Notion · Capture", title: "Start with what happened.", body: "Keep the original words of a question from everyday work. In conversation with AI, separate observations, interpretations and open questions before saving a record in Notion.", sample: "Observation: they remembered the steps, but could not explain when to change approach.", note: "AI conversation and capture happen in Notion and depend on workspace permissions. This page illustrates the process." },
      { name: "Read", tool: "Yinxiang Biji · Reading", title: "Let reading speak to a question.", body: "Choose an excerpt relevant to the question. Preserve its book, page and original source, then add what it made you reconsider.", sample: "A question while reading: does being able to repeat a passage mean I understand it?", note: "Selection and transfer are currently manual. Bulk import is being designed. No real book excerpts are included here." },
      { name: "Connect", tool: "Notion · Organize", title: "A shared question matters more than a shared word.", body: "Use enduring questions as themes and confirm which records belong together. Explicit themes and confirmed relationships become links during synchronization.", sample: "Shared theme: how can I tell whether I really understand?", note: "Connections come from explicit themes and relationships, rather than treating similar wording as a conclusion." },
      { name: "Revisit", tool: "Obsidian · Revisit", title: "Follow a link. Read again.", body: "Run the one-way sync to turn saved Notion records into local Markdown. Follow a question to another record in the graph and compare what you thought at the time.", sample: "Two notes meet at one question: a reading doubt and an observation from work.", note: "One-way Notion → Obsidian sync is implemented. Editing stays in Notion; writeback is being designed." },
      { name: "Reconsider", tool: "Notion · Reflect", title: "Return to the original note and add a thought.", body: "Read connected notes together to decide whether they concern the same thing. When a new explanation emerges, return to the original Notion record and keep writing.", sample: "A new question: beyond repeating steps, can someone explain a choice and adapt when the context changes?", note: "Revisiting and updating are human steps. An automatic cross-platform loop is not implemented." },
    ],
    nodes: [
      { title: "A reading question", body: "Does being able to repeat a passage mean I understand it? Keep the question open for other experiences to respond." },
      { title: "How do I know I understand?", body: "The shared theme of two illustrative notes. Nodes and links help locate material; understanding still requires the original text and context." },
      { title: "A reflection from work", body: "They remembered the steps but could not explain when to change approach. Reading the two notes together helps assess the connection." },
    ],
  },
};
export function getBridgeCopy(locale: Locale) { return bridgeCopy[locale]; }
