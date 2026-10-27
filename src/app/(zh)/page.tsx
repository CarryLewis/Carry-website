import { pageMetadata } from "@/i18n";
export function generateMetadata() {
  return pageMetadata(
    "zh",
    "/",
    "Carry Lewis — Personal Observatory",
    "Carry Lewis 的个人观测站：医学、软件创造、长跑、阅读与信仰。",
  );
}
import { PortraitHome } from "@/components/portrait/PortraitHome";

export default function HomePage() {
  return <PortraitHome />;
}
