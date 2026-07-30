import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";

export const metadata = stubMetadata(
  "About",
  "Identity and philosophy behind the digital laboratory.",
);

export default function AboutPage() {
  return (
    <StubPage
      label="About"
      title="Identity & philosophy"
      description="Personal operating principles and biography will be documented here."
    />
  );
}
