import Content, { metadata as source } from "@/components/pages/AboutContent";
import { pageMetadata } from "@/i18n";
export function generateMetadata() {
  return pageMetadata(
    "zh",
    "/about/",
    source.title as string,
    source.description ?? "",
  );
}
export default function Page() {
  return <Content />;
}
