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
      knowledgeGraph={data.knowledgeGraph}
      signals={data.signals}
      systemLinks={data.systemLinks}
    />
  );
}
