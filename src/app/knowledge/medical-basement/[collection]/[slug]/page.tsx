import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MedicalRecordDetail } from "@/components/medical/MedicalRecordDetail";
import {
  getMedicalCollection,
  getMedicalStaticParams,
  listDisplayFields,
  type MedicalCollectionId,
} from "@/content/medical";
import { contentRepository } from "@/data";

type Props = {
  params: Promise<{ collection: string; slug: string }>;
};

export function generateStaticParams() {
  return getMedicalStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection: collectionId, slug } = await params;
  const record = await contentRepository.getMedicalRecord(
    collectionId as MedicalCollectionId,
    slug,
  );
  if (!record) return { title: "Medical record" };
  return {
    title: record.title,
    description: record.summary || record.title,
  };
}

export default async function MedicalRecordPage({ params }: Props) {
  const { collection: collectionId, slug } = await params;
  const collection = getMedicalCollection(collectionId);
  if (!collection) notFound();

  const record = await contentRepository.getMedicalRecord(
    collection.id as MedicalCollectionId,
    slug,
  );
  if (!record) notFound();

  const fields = listDisplayFields(record).filter(
    (field) => field.label.toLowerCase() !== "name" && field.label.toLowerCase() !== "drug" && field.label.toLowerCase() !== "disorder" && field.label.toLowerCase() !== "case title",
  );

  return (
    <MedicalRecordDetail
      collection={collection}
      record={record}
      fields={fields}
    />
  );
}
