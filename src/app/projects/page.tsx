import {
  StubPage,
  stubMetadata,
} from "@/components/content/StubPage";

export const metadata = stubMetadata(
  "Projects",
  "Active builds, prototypes, experiments, and archived systems.",
);

export default function ProjectsIndexPage() {
  return (
    <StubPage
      label="Projects"
      title="Build laboratory"
      description="Project records — problem, architecture, implementation, demo, reflection — will appear here."
    />
  );
}
