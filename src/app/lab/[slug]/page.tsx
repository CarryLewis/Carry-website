import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LabWorkbench } from "@/components/lab/LabWorkbench";
import {
  getLabStaticParams,
  getSpecimen,
  LAB_THESIS,
} from "@/data/lab-catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getLabStaticParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const specimen = getSpecimen(slug);
  if (!specimen) {
    return { title: "HTML Design Lab", description: LAB_THESIS };
  }
  return {
    title: `${specimen.name} · HTML Design Lab`,
    description: specimen.problem,
  };
}

export default async function LabSpecimenPage({ params }: Props) {
  const { slug } = await params;
  const specimen = getSpecimen(slug);
  if (!specimen) notFound();

  return <LabWorkbench initialSlug={specimen.id} />;
}
