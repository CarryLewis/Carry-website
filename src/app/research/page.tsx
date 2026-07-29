import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";

export const metadata = stubMetadata(
  "Research",
  "Scientific exploration across biomedical systems, computational medicine, and related fields.",
);

export default function ResearchIndexPage() {
  return (
    <StubPage
      label="Research"
      title="Scientific exploration"
      description="Research records will live here — questions, models, experiments, and references."
    />
  );
}
