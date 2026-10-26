import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "第一版观测站",
  description: "原始数字实验室：研究、项目和知识网络。",
};
import { ObservatoryPage } from "@/components/observatory/ObservatoryPage";
import { getObservatoryData } from "@/data";

export default async function HomePage() {
  const data = await getObservatoryData();

  return (
    <ObservatoryPage
      profile={data.profile}
      copy={data.copy}
      intellectualFocus={data.intellectualFocus}
      activeQuestions={data.activeQuestions}
      practiceGraph={data.practiceGraph}
      signals={data.signals}
      systemLinks={data.systemLinks}
    />
  );
}
