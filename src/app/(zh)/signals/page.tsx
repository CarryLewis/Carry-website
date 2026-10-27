import Content, { metadata as source } from "@/components/pages/SignalsContent";
import { pageMetadata } from "@/i18n";
export function generateMetadata() {
  return pageMetadata(
    "zh",
    "/signals/",
    source.title as string,
    source.description ?? "",
  );
}
export default function Page() {
  return <Content />;
}
