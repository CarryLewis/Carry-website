import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FieldSummary } from "@/components/knowledge/FieldSummary";
import {
  contentRepository,
  getPracticeFieldsForStaticParams,
} from "@/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPracticeFieldsForStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const record = await contentRepository.getPracticeField(slug);
  if (!record) {
    return { title: "Practice field", description: "Field summary." };
  }
  return {
    title: record.field.label,
    description: record.field.summary,
  };
}

export default async function PracticeFieldPage({ params }: Props) {
  const { slug } = await params;
  const record = await contentRepository.getPracticeField(slug);

  if (!record) {
    notFound();
  }

  return <FieldSummary record={record} />;
}
