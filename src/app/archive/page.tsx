import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";

export const metadata = stubMetadata(
  "Archive",
  "Long-term memory: essays, notes, books, experiments, and timeline.",
);

export default function ArchiveIndexPage() {
  return (
    <StubPage
      label="Archive"
      title="Long-term memory"
      description="Essays, notes, books, experiments, and the intellectual timeline will accumulate here."
    />
  );
}
