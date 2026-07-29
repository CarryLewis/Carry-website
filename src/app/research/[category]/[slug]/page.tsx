import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return [
    {
      category: "computational-medicine",
      slug: "ecg-conduction",
    },
    {
      category: "future-medicine",
      slug: "clinical-reasoning-ai",
    },
    {
      category: "biomedical-systems",
      slug: "mechanism-to-model",
    },
  ];
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
