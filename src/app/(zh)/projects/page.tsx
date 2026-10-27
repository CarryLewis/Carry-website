import Content, {
  metadata as source,
} from "@/components/pages/ProjectsContent";
import { pageMetadata } from "@/i18n";
export function generateMetadata() {
  return pageMetadata(
    "zh",
    "/projects/",
    source.title as string,
    source.description ?? "",
  );
}
export default function Page() {
  return <Content />;
}
