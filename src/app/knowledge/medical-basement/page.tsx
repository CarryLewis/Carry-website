import type { Metadata } from "next";
import { MedicalVaultIndex } from "@/components/medical/MedicalVaultIndex";
import { contentRepository } from "@/data";

export const metadata: Metadata = {
  title: "medical basement",
  description:
    "Medical basement vault — lectures, diseases, drugs, cases synced from Notion.",
};

export default async function MedicalBasementIndexPage() {
  const collections = await contentRepository.listMedicalCollections();
  return <MedicalVaultIndex collections={collections} />;
}
