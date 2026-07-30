import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MedicalCollectionList } from "@/components/medical/MedicalCollectionList";
import {
  getMedicalCollection,
  getMedicalCollectionStaticParams,
  type MedicalCollectionId,
} from "@/content/medical";
import { contentRepository } from "@/data";

type Props = {
  params: Promise<{ collection: string }>;
};

export function generateStaticParams() {
  return getMedicalCollectionStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection: collectionId } = await params;
  const collection = getMedicalCollection(collectionId);
  if (!collection) return { title: "Medical" };
  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function MedicalCollectionPage({ params }: Props) {
  const { collection: collectionId } = await params;
  const collection = getMedicalCollection(collectionId);
  if (!collection) notFound();

  const records = await contentRepository.listMedicalRecords(
    collection.id as MedicalCollectionId,
  );

  return (
    <MedicalCollectionList collection={collection} records={records} />
  );
}
