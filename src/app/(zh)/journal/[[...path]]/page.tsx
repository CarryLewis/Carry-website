import Journal from "@/components/pages/JournalContent";
import Entry from "@/components/pages/EntryContent";
import { listEntries } from "@/content/notion";
import { pageMetadata } from "@/i18n";
import { notFound } from "next/navigation";
type Props = { params: Promise<{ path?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { path: [] },
    ...listEntries().map((e) => ({ path: [e.kind, e.slug] })),
  ];
}
export async function generateMetadata({ params }: Props) {
  const { path = [] } = await params;
  if (!path.length)
    return pageMetadata(
      "zh",
      "/journal/",
      "书单、随笔与排行榜",
      "Carry Lewis 的阅读记录、随笔与个人排行榜。",
    );
  const entry = listEntries().find(
    (e) => e.kind === path[0] && e.slug === path[1],
  );
  return entry
    ? pageMetadata(
        "zh",
        `/journal/${entry.kind}/${entry.slug}/`,
        entry.title,
        entry.summary,
      )
    : {};
}
export default async function JournalPage({ params }: Props) {
  const { path = [] } = await params;
  if (!path.length) return <Journal />;
  if (path.length === 2)
    return <Entry params={Promise.resolve({ kind: path[0], slug: path[1] })} />;
  notFound();
}
