import RootDocument, { siteMetadata } from "@/components/layout/RootDocument";
export async function generateMetadata() {
  return siteMetadata("en");
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
