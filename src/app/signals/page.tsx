import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";

export const metadata = stubMetadata(
  "Signals",
  "AI-powered information radar across medicine, AI, technology, and society.",
);

export default function SignalsIndexPage() {
  return (
    <StubPage
      label="Signals"
      title="Information radar"
      description="Signal feeds compatible with future RSS and AI ingest pipelines will land here."
    />
  );
}
