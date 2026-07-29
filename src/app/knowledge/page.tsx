import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";

export const metadata = stubMetadata(
  "Knowledge",
  "Personal knowledge graph across medicine, AI, biology, and philosophy.",
);

export default function KnowledgeIndexPage() {
  return (
    <StubPage
      label="Knowledge"
      title="Knowledge graph"
      description="Concept nodes, relations, and reading notes will be mapped here."
    />
  );
}
