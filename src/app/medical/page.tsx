import type { Metadata } from "next";
import { MedicalVaultIndex } from "@/components/medical/MedicalVaultIndex";
import { contentRepository } from "@/data";

export const metadata: Metadata = {
  title: "Medical",
  description:
    "Medical basement vault — lectures, diseases, drugs, cases synced from Notion.",
};

export default async function MedicalIndexPage() {
  const collections = await contentRepository.listMedicalCollections();
  return <MedicalVaultIndex collections={collections} />;
}
