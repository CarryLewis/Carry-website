import type { Metadata } from "next";
import { FeedbackPanel } from "@/components/feedback/FeedbackPanel";
import { DEFAULT_SITE_TARGET_ID } from "@/data/feedback-targets";

export const metadata: Metadata = {
  title: "Correspondence",
  description:
    "Leave a note about the observatory, a project, the lab, or the laboratory as a whole.",
};

export default function ContactPage() {
  return (
    <article className="bg-void">
      <FeedbackPanel defaultTargetId={DEFAULT_SITE_TARGET_ID} allowSelect />
    </article>
  );
}
