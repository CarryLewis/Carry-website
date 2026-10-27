import Content, {
  metadata as source,
} from "@/components/pages/ThinkingContent";
import { pageMetadata } from "@/i18n";
export function generateMetadata() {
  return pageMetadata(
    "zh",
    "/thinking/",
    source.title as string,
    source.description ?? "",
  );
}
export default function Page() {
  return <Content />;
}
