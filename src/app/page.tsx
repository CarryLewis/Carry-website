import { ObservatoryPage } from "@/components/observatory/ObservatoryPage";
import { getObservatoryData } from "@/data";

export default async function HomePage() {
  const data = await getObservatoryData();

  return (
    <ObservatoryPage
      profile={data.profile}
      explorations={data.explorations}
      researchThreads={data.researchThreads}
      knowledgeGraph={data.knowledgeGraph}
      signals={data.signals}
      systemLinks={data.systemLinks}
    />
  );
}
