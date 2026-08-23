import type { FeedbackSurface } from "@/data/feedback-targets";

export type FeedbackPayload = {
  targetId: string;
  targetTitle: string;
  surface: FeedbackSurface;
  pagePath: string;
  specimenId?: string;
  specimenName?: string;
  name?: string;
  email?: string;
  message: string;
  hp?: string;
};

export function getFeedbackEndpoint(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT?.trim();
  if (!fromEnv) return null;
  return fromEnv.replace(/\/$/, "");
}

export async function submitFeedback(payload: FeedbackPayload): Promise<void> {
  const endpoint = getFeedbackEndpoint();
  if (!endpoint) {
    throw new Error("Correspondence endpoint is not configured.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("The laboratory inbox could not accept this note.");
  }
}
