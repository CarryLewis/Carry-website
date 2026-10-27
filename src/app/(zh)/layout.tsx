import RootDocument, { siteMetadata } from "@/components/layout/RootDocument";
export async function generateMetadata() {
  return siteMetadata("zh");
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="zh">{children}</RootDocument>;
}
