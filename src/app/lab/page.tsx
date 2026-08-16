import type { Metadata } from "next";
import { LabWorkbench } from "@/components/lab/LabWorkbench";
import { DEFAULT_SPECIMEN_ID, LAB_THESIS } from "@/data/lab-catalog";

export const metadata: Metadata = {
  title: "HTML Design Lab",
  description: LAB_THESIS,
};

export default function LabPage() {
  return <LabWorkbench initialSlug={DEFAULT_SPECIMEN_ID} />;
}
