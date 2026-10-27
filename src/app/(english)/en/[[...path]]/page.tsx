import { notFound } from "next/navigation";
import { PortraitHome } from "@/components/portrait/PortraitHome";
import About from "@/components/pages/AboutContent";
import Thinking from "@/components/pages/ThinkingContent";
import Opening from "@/components/pages/OpeningContent";
import Projects from "@/components/pages/ProjectsContent";
import Project from "@/components/pages/ProjectContent";
import Signals from "@/components/pages/SignalsContent";
import Journal from "@/components/pages/JournalContent";
import Entry from "@/components/pages/EntryContent";
import Original from "@/app/(zh)/observatory/page";
import Research from "@/app/(zh)/research/page";
import ResearchTopic from "@/app/(zh)/research/[category]/[slug]/page";
import Knowledge from "@/app/(zh)/knowledge/page";
import Field from "@/app/(zh)/knowledge/[slug]/page";
import Medical from "@/app/(zh)/knowledge/medical-basement/page";
import Brief from "@/app/(zh)/knowledge/research-brief/page";
import Lab from "@/app/(zh)/lab/page";
import Specimen from "@/app/(zh)/lab/[slug]/page";
import Archive from "@/app/(zh)/archive/page";
import {
  contentRepository,
  getProjectsForStaticParams,
  getQuestionsForStaticParams,
  getPracticeFieldsForStaticParams,
} from "@/data";
import { getLabStaticParams } from "@/data/lab-catalog";
import { listEntries } from "@/content/notion";
import { pageMetadata } from "@/i18n";
import { localizedProject } from "@/i18n/projects";
import { getPortraitCopy } from "@/data/portrait";
export const dynamicParams = false;
type Props = { params: Promise<{ path?: string[] }> };
export async function generateStaticParams() {
  const routes = [
    "",
    "about",
    "thinking",
    "thinking/how-i-explore",
    "projects",
    "signals",
    "journal",
    "observatory",
    "research",
    "knowledge",
    "knowledge/medical-basement",
    "knowledge/research-brief",
    "lab",
    "archive",
  ];
  routes.push(
    ...(await getProjectsForStaticParams()).map(
      (p) => `projects/${p.status}/${p.slug}`,
    ),
  );
  routes.push(
    ...(await getQuestionsForStaticParams()).map(
      (p) => `research/${p.category}/${p.slug}`,
    ),
  );
  routes.push(
    ...(await getPracticeFieldsForStaticParams()).map(
      (p) => `knowledge/${p.slug}`,
    ),
  );
  routes.push(...getLabStaticParams().map((p) => `lab/${p.slug}`));
  routes.push(...listEntries().map((p) => `journal/${p.kind}/${p.slug}`));
  return [...new Set(routes)].map((path) => ({
    path: path ? path.split("/") : [],
  }));
}
export async function generateMetadata({ params }: Props) {
  const { path = [] } = await params;
  const key = path.join("/");
  const note = getPortraitCopy("en").openingNote;
  const pages: Record<string, [string, string]> = {
    "": [
      "Carry Lewis — Personal Observatory",
      "Medicine, software, running, reading and faith. Work, questions and evolving perspectives.",
    ],
    about: [
      "About",
      "Meet Carry Lewis: a medical student, builder of tools and explorer of the human condition.",
    ],
    thinking: [
      "Thinking",
      "Questions about medicine, making, practice and meaning.",
    ],
    "thinking/how-i-explore": [note.title, note.summary],
    projects: ["Work", "Projects connecting understanding with practice."],
    signals: [
      "Signals",
      "Dated observations from the first edition; source links pending.",
    ],
    journal: [
      "Books, essays and rankings",
      "Reading records and original-language personal writing.",
    ],
  };
  let [title, description] = pages[key] ?? [
    "First-edition reference",
    "Research, knowledge and experiments retained in their original language.",
  ];
  if (path[0] === "projects" && path.length === 3) {
    const p = await contentRepository.getProject(path[2]);
    if (p) {
      const local = localizedProject(p, "en");
      title = local.title;
      description = local.summary;
    }
  }
  if (path[0] === "journal" && path.length === 3) {
    const p = listEntries().find(
      (p) => p.kind === path[1] && p.slug === path[2],
    );
    if (p) {
      title = p.title;
      description = p.summary;
    }
  }
  return pageMetadata("en", key ? `/${key}/` : "/", title, description);
}
export default async function EnglishPage({ params }: Props) {
  const { path = [] } = await params;
  const key = path.join("/");
  if (!key) return <PortraitHome locale="en" />;
  if (key === "about") return <About locale="en" />;
  if (key === "thinking") return <Thinking locale="en" />;
  if (key === "thinking/how-i-explore") return <Opening locale="en" />;
  if (key === "projects") return <Projects locale="en" />;
  if (key === "signals") return <Signals locale="en" />;
  if (key === "journal") return <Journal locale="en" />;
  if (path[0] === "projects" && path.length === 3)
    return (
      <Project
        locale="en"
        params={Promise.resolve({ status: path[1], slug: path[2] })}
      />
    );
  if (path[0] === "journal" && path.length === 3)
    return (
      <Entry
        locale="en"
        params={Promise.resolve({ kind: path[1], slug: path[2] })}
      />
    );
  if (key === "observatory") return <Original />;
  if (key === "research") return <Research />;
  if (path[0] === "research" && path.length === 3)
    return (
      <ResearchTopic
        params={Promise.resolve({ category: path[1], slug: path[2] })}
      />
    );
  if (key === "knowledge") return <Knowledge />;
  if (key === "knowledge/medical-basement") return <Medical />;
  if (key === "knowledge/research-brief") return <Brief />;
  if (path[0] === "knowledge" && path.length === 2)
    return <Field params={Promise.resolve({ slug: path[1] })} />;
  if (key === "lab") return <Lab />;
  if (path[0] === "lab" && path.length === 2)
    return <Specimen params={Promise.resolve({ slug: path[1] })} />;
  if (key === "archive") return <Archive />;
  notFound();
}
