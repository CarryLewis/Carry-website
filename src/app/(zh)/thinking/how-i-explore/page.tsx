import Content, { metadata as source } from "@/components/pages/OpeningContent";
import { pageMetadata } from "@/i18n";
export function generateMetadata() {
  return pageMetadata(
    "zh",
    "/thinking/how-i-explore/",
    source.title as string,
    source.description ?? "",
  );
}
export default function Page() {
  return <Content />;
}
