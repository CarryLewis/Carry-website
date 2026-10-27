export {
  generateStaticParams,
  generateMetadata,
} from "@/components/pages/ProjectContent";
import Content from "@/components/pages/ProjectContent";
export default function Page(props: {
  params: Promise<{ status: string; slug: string }>;
}) {
  return <Content {...props} />;
}
