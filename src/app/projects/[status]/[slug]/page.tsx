import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";
import { contentRepository, getProjectsForStaticParams } from "@/data";

type Props = {
  params: Promise<{ status: string; slug: string }>;
};

export async function generateStaticParams() {
  return getProjectsForStaticParams();
}

export const metadata = stubMetadata(
  "Project",
  "Project documentation — coming soon.",
);

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await contentRepository.getProject(slug);

  return (
    <StubPage
      label={`Projects / ${project?.status ?? "unknown"}`}
      title={project?.title ?? slug.replace(/-/g, " ")}
      description={
        project?.problem ??
        "Full project template (Problem → Architecture → Implementation → Demo → Reflection) will be implemented next."
      }
    />
  );
}
