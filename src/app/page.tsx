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
