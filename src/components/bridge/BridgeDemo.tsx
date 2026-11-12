"use client";
import { useState } from "react";
import type { Locale } from "@/i18n";
import { getBridgeCopy } from "@/data/knowledge-bridge";
import styles from "./bridge.module.css";

export function BridgeDemo({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const [node, setNode] = useState(1);
  const copy = getBridgeCopy(locale);
  const current = copy.steps[step];
  const t = (zh: string, en: string) => locale === "zh" ? zh : en;
  return <div className={styles.demo}>
    <p className={styles.demoLabel}>{t("交互叙事 · 公开示例 · 不连接个人笔记", "INTERACTIVE WALKTHROUGH · ILLUSTRATIVE NOTES · NO ACCOUNT CONNECTION")}</p>
    <div className={styles.stepButtons} role="group" aria-label={t("选择工作流阶段", "Choose a workflow stage")}>
      {copy.steps.map((item, i) => <button key={item.name} type="button" aria-pressed={step === i} onClick={() => setStep(i)}><small>0{i + 1}</small>{item.name}</button>)}
    </div>
    <div className={styles.demoBody}>
      <div className={styles.stepCopy} aria-live="polite" aria-atomic="true">
        <span className={styles.eyebrow}>{current.tool}</span>
        <h3>{current.title}</h3><p>{current.body}</p>
        <blockquote>{current.sample}</blockquote>
        <p className={styles.note}>{current.note}</p>
      </div>
      <div className={styles.graphPanel}>
        <p className={styles.eyebrow}>{t("同一个问题，把记录连起来", "A QUESTION CONNECTS THE NOTES")}</p>
        <div className={styles.graph}>
          <svg viewBox="0 0 400 260" fill="none" aria-hidden="true"><path d="M70 65 200 138 330 65 M200 138V230" stroke="currentColor" strokeWidth="1.5"/><circle cx="200" cy="138" r="56" stroke="currentColor" strokeDasharray="3 7"/></svg>
          {copy.nodes.map((item, i) => <button key={item.title} type="button" className={`${styles.graphNode} ${styles[`node${i}`]}`} aria-pressed={node === i} onClick={() => setNode(i)}>{item.title}</button>)}
          <span className={styles.graphFoot}>{t("点击节点，回到问题", "SELECT A NODE TO REVISIT")}</span>
        </div>
        <div className={styles.nodeDetail} aria-live="polite" aria-atomic="true"><strong>{copy.nodes[node].title}</strong><p>{copy.nodes[node].body}</p></div>
      </div>
    </div>
    <div className={styles.demoFooter}><span>{step + 1} / {copy.steps.length}</span><div><button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>{t("← 上一步", "← Previous")}</button><button type="button" disabled={step === copy.steps.length - 1} onClick={() => setStep(step + 1)}>{t("下一步 →", "Next →")}</button></div></div>
  </div>;
}
