"use client";

import { useEffect, useRef } from "react";

const stages = [
  ["材料与原件", "Document", "内置合成 PDF / PNG", "原始页与固定文档标识", "原件阅读已实现；真实材料准入待开发"],
  ["批注与文字", "Annotation", "原始颜色、OCR 文本与坐标", "可编辑的文字、语义和来源锚点", "交互已实现；识别与坐标来自手工 fixture"],
  ["人工事实审核", "Human review", "原文、批注与待审核字段", "逐项确认的事实与修订版本", "分离审核与上游修改失效已实现"],
  ["教学解释", "Learning analysis", "已审核事实与学习问题", "带依据和不确定性的教学解释", "固定 Demo 已实现；真实模型与循证待接入"],
  ["知识关联", "Knowledge connection", "已选证据与课程/疾病候选", "人工确认的本地关系", "合成目录演示；Notion 未连接"],
  ["归档与反馈", "Learning archive", "审核后的学习草稿", "本地归档、问题与可导出的 JSON", "保存与导出已实现；长期复习与同步待开发"],
];
const checks = ["来源策略拒绝临床、未知来源和外发", "未审事实阻止推理；修改后依赖失效", "病例搜索、筛选与列表/网格", "PDF 定位、OCR 修正与独立事实审核", "待提交编辑在离开与刷新后恢复", "本地知识确认与跨页证据回看", "非合成导入阻止与服务端拒绝", "损坏保存数据不被自动覆盖", "完整审核、演示推理与归档失效", "拆分、合并、撤销与重做", "识别失败状态可恢复", "JSON 草稿下载与弹窗键盘操作", "iPad/手机尺寸与原件不反色"];

/** Markup comes only from the repository's reviewed, static project dossier. */
export default function ClinicalCaseArticle({ markup, css }: { markup: string; css: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current!;
    const controller = new AbortController();
    const { signal } = controller;
    const byId = <T extends HTMLElement>(id: string) => root.querySelector<T>(`#${id}`)!;
    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const show = (id: string, updateHash = true) => {
      if (!tabs.some((tab) => tab.getAttribute("aria-controls") === id)) id = "overview";
      tabs.forEach((tab) => {
        const selected = tab.getAttribute("aria-controls") === id;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
        byId(tab.getAttribute("aria-controls")!).hidden = !selected;
      });
      // Preserve Next's navigation state while changing the section anchor.
      if (updateHash) history.replaceState(history.state, "", `#${id}`);
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => show(tab.getAttribute("aria-controls")!), { signal });
      tab.addEventListener("keydown", (e) => {
        let next = i;
        if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        else return;
        e.preventDefault();
        tabs[next].focus();
        show(tabs[next].getAttribute("aria-controls")!);
      }, { signal });
    });
    root.querySelectorAll<HTMLAnchorElement>("[data-panel]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        show(link.dataset.panel!);
        root.querySelector(".tabs")!.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      }, { signal });
    });
    window.addEventListener("hashchange", () => show(location.hash.slice(1), false), { signal });
    show(location.hash.slice(1), false);

    const flow = byId("flow-steps");
    const selectStage = (index: number) => {
      [...flow.children].forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
      const [title, en, input, output, status] = stages[index];
      const detail = byId("flow-detail");
      detail.replaceChildren();
      [[en, title, status], ["输入", input, ""], ["输出", output, ""]].forEach(([label, text, note], i) => {
        const column = document.createElement("div");
        const caption = document.createElement("span");
        caption.className = "label";
        caption.textContent = label;
        const heading = document.createElement(i === 0 ? "h3" : "p");
        heading.textContent = text;
        column.append(caption, heading);
        if (note) {
          const badge = document.createElement("span");
          badge.className = "badge neutral";
          badge.textContent = note;
          column.append(badge);
        }
        detail.append(column);
      });
    };
    flow.replaceChildren();
    stages.forEach(([title, en], i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `查看阶段 ${i + 1} ${title}`);
      const number = document.createElement("span");
      number.className = "number";
      number.textContent = `0${i + 1}`;
      const heading = document.createElement("strong");
      heading.textContent = title;
      const caption = document.createElement("small");
      caption.textContent = en;
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "→";
      button.append(number, heading, caption, arrow);
      button.addEventListener("click", () => selectStage(i), { signal });
      flow.append(button);
    });
    selectStage(0);
    byId("annotation-select").addEventListener("click", () => {
      byId("annotation-select").setAttribute("aria-pressed", "true");
      byId("annotation-state").textContent = "已选择来源 · 第 1 页 · 待审";
      byId("annotation-fields").hidden = false;
    }, { signal });
    byId<HTMLSelectElement>("semantic").addEventListener("change", (e) => {
      byId("semantic-status").textContent = `${(e.target as HTMLSelectElement).value} · 语义已变更，依赖分析与出口需重新审核（演示）`;
    }, { signal });
    const list = byId("test-list");
    list.replaceChildren();
    checks.forEach((text, i) => {
      const row = document.createElement("div");
      row.className = "test-item";
      const mark = document.createElement("span");
      mark.textContent = "✓";
      const label = document.createElement("span");
      label.textContent = `${String(i + 1).padStart(2, "0")} / ${text}`;
      row.append(mark, label);
      list.append(row);
    });
    const dialog = byId<HTMLDialogElement>("image-dialog");
    root.querySelectorAll<HTMLElement>("[data-image]").forEach((button) => {
      button.addEventListener("click", () => {
        byId<HTMLImageElement>("dialog-image").src = button.dataset.image!;
        byId("dialog-caption").textContent = button.dataset.caption!;
        dialog.showModal();
      }, { signal });
    });
    byId("dialog-close").addEventListener("click", () => dialog.close(), { signal });
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); }, { signal });
    return () => { controller.abort(); if (dialog.open) dialog.close(); };
  }, [markup]);

  return <article ref={ref} className="clinical-case-article" lang="zh-CN" aria-label="Clinical Case Workspace 项目介绍">
    <style dangerouslySetInnerHTML={{ __html: css }} />
    <div dangerouslySetInnerHTML={{ __html: markup }} />
  </article>;
}
