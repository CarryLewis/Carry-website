import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";

type Props = {
  params: Promise<{ status: string; slug: string }>;
};

export async function generateStaticParams() {
  return [
    { status: "active", slug: "cardiac-simulation-engine" },
    { status: "prototype", slug: "clinical-reasoning-ai" },
    { status: "active", slug: "personal-knowledge-os" },
  ];
}

export const metadata = stubMetadata(
  "Project",
  "Project documentation — coming soon.",
);

export default async function ProjectPage({ params }: Props) {
  const { status, slug } = await params;
  return (
    <StubPage
      label={`Projects / ${status}`}
      title={slug.replace(/-/g, " ")}
      description="Full project template (Problem → Architecture → Implementation → Demo → Reflection) will be implemented next."
    />
  );
}
