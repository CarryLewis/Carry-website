import { FeedbackPanel } from "@/components/feedback/FeedbackPanel";
import { ClosingSection } from "@/components/observatory/ClosingSection";
import { ExplorationSection } from "@/components/observatory/ExplorationSection";
import { HeroSection } from "@/components/observatory/HeroSection";
import { KnowledgeObservatorySection } from "@/components/observatory/KnowledgeObservatorySection";
import { LatestSignalsSection } from "@/components/observatory/LatestSignalsSection";
import { ResearchThreadsSection } from "@/components/observatory/ResearchThreadsSection";
import { DEFAULT_OBSERVATORY_TARGET_ID } from "@/data/feedback-targets";
import type {
  ActiveQuestion,
  IntellectualFocus,
  KnowledgeGraphPreview,
  ObservatoryCopy,
  PersonProfile,
  Signal,
  SystemLink,
} from "@/domain/entities";

export type ObservatoryPageProps = {
  profile: PersonProfile;
  copy: ObservatoryCopy;
  intellectualFocus: IntellectualFocus[];
  activeQuestions: ActiveQuestion[];
  knowledgeGraph: KnowledgeGraphPreview;
  signals: Signal[];
  systemLinks: SystemLink[];
};

/**
 * Observatory — pure composition over Content OS modules.
 * No entity content is authored here.
 */
export function ObservatoryPage({
  profile,
  copy,
  intellectualFocus,
  activeQuestions,
  knowledgeGraph,
  signals,
  systemLinks,
}: ObservatoryPageProps) {
  return (
    <>
      <HeroSection profile={profile} copy={copy} />
      <ExplorationSection items={intellectualFocus} copy={copy.exploration} />
      <ResearchThreadsSection
        questions={activeQuestions}
        copy={copy.questions}
      />
      <KnowledgeObservatorySection
        graph={knowledgeGraph}
        copy={copy.knowledge}
      />
      <LatestSignalsSection signals={signals} copy={copy.signals} />
      <FeedbackPanel
        defaultTargetId={DEFAULT_OBSERVATORY_TARGET_ID}
        allowSelect
      />
      <ClosingSection links={systemLinks} copy={copy.closing} />
    </>
  );
}
