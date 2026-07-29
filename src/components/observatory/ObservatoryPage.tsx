import { ClosingSection } from "@/components/observatory/ClosingSection";
import { ExplorationSection } from "@/components/observatory/ExplorationSection";
import { HeroSection } from "@/components/observatory/HeroSection";
import { KnowledgeObservatorySection } from "@/components/observatory/KnowledgeObservatorySection";
import { LatestSignalsSection } from "@/components/observatory/LatestSignalsSection";
import { ResearchThreadsSection } from "@/components/observatory/ResearchThreadsSection";
import type {
  Exploration,
  KnowledgeGraphPreview,
  PersonProfile,
  ResearchThread,
  Signal,
  SystemLink,
} from "@/domain/entities";

export type ObservatoryPageProps = {
  profile: PersonProfile;
  explorations: Exploration[];
  researchThreads: ResearchThread[];
  knowledgeGraph: KnowledgeGraphPreview;
  signals: Signal[];
  systemLinks: SystemLink[];
};

/**
 * Observatory — entrance to the intellectual ecosystem.
 *
 * Layout (vertical editorial bands):
 * 1. Hero — identity + constellation
 * 2. Current Exploration — focus cards
 * 3. Research Threads — question list
 * 4. Knowledge Observatory — graph preview
 * 5. Latest Signals — radar feed
 * 6. Closing — system map links
 */
export function ObservatoryPage({
  profile,
  explorations,
  researchThreads,
  knowledgeGraph,
  signals,
  systemLinks,
}: ObservatoryPageProps) {
  return (
    <>
      <HeroSection profile={profile} />
      <ExplorationSection explorations={explorations} />
      <ResearchThreadsSection threads={researchThreads} />
      <KnowledgeObservatorySection graph={knowledgeGraph} />
      <LatestSignalsSection signals={signals} />
      <ClosingSection links={systemLinks} />
    </>
  );
}
