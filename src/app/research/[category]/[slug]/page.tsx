import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";
import { getQuestionsForStaticParams } from "@/data";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getQuestionsForStaticParams();
}

export const metadata = stubMetadata(
  "Research thread",
  "Detailed research record — coming soon.",
);

export default async function ResearchTopicPage({ params }: Props) {
  const { category, slug } = await params;
  return (
    <StubPage
      label={`Research / ${category}`}
      title={slug.replace(/-/g, " ")}
      description="Full research article template (Question → Background → Model → Experiment → References) will be implemented next."
    />
  );
}
