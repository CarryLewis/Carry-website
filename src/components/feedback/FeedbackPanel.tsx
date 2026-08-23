"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FEEDBACK_TARGETS,
  feedbackTargetGroups,
  getFeedbackTarget,
  type FeedbackTarget,
} from "@/data/feedback-targets";
import { cn } from "@/lib/cn";
import { getFeedbackEndpoint, submitFeedback } from "@/lib/submit-feedback";

const fieldClass =
  "w-full border border-rule bg-surface-sunken px-lab-3 py-lab-3 font-sans text-body-ui text-ink placeholder:text-ink-faint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type FeedbackPanelProps = {
  defaultTargetId: string;
  allowSelect?: boolean;
  specimenId?: string;
  specimenName?: string;
  /** Full-bleed observatory/lab section, or inset inside an existing article. */
  layout?: "section" | "inset";
  className?: string;
};

export function FeedbackPanel({
  defaultTargetId,
  allowSelect = false,
  specimenId,
  specimenName,
  layout = "section",
  className,
}: FeedbackPanelProps) {
  const pathname = usePathname();
  const endpoint = getFeedbackEndpoint();
  const groups = useMemo(() => feedbackTargetGroups(), []);
  const initial =
    getFeedbackTarget(defaultTargetId) ?? FEEDBACK_TARGETS[0];

  const [targetId, setTargetId] = useState(initial.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const target: FeedbackTarget =
    getFeedbackTarget(targetId) ?? initial;

  const inner = (
    <div className={cn("max-w-prose", className)}>
      <p className="font-sans text-label uppercase text-ink-tertiary">
        Correspondence
      </p>
      <h2 className="mt-lab-3 font-serif text-page text-ink">Leave a note</h2>
      <p className="mt-lab-4 font-sans text-body-ui text-ink-secondary">
        Observations, objections, and questions about this surface. Each
        entrance is tagged so the inbox knows which record you are writing
        about.
      </p>

      <div className="mt-lab-6">
        <p className="font-sans text-label uppercase text-ink-tertiary">
          Regarding
        </p>
        {allowSelect ? (
          <select
            id="feedback-target"
            aria-label="Correspondence target"
            value={target.id}
            onChange={(event) => setTargetId(event.target.value)}
            className={cn(fieldClass, "mt-lab-2")}
          >
            {groups.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.targets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {group.group} · {item.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        ) : (
          <p className="mt-lab-2 font-serif text-section text-ink">
            {target.surface === "project"
              ? `Project · ${target.title}`
              : target.surface === "lab"
                ? `Lab · ${target.title}`
                : target.surface === "knowledge"
                  ? `Knowledge · ${target.title}`
                  : target.surface === "observatory"
                    ? `Observatory · ${target.title}`
                    : target.title}
          </p>
        )}
        {specimenName ? (
          <p className="mt-lab-2 font-mono text-code text-ink-faint">
            specimen · {specimenName}
          </p>
        ) : null}
      </div>

      {status === "sent" ? (
        <p className="mt-lab-7 border-t border-rule pt-lab-7 font-sans text-body-ui text-ink-secondary">
          Note received. Thank you for writing.
        </p>
      ) : (
        <form
          className="mt-lab-7 grid gap-lab-5 border-t border-rule pt-lab-7"
          onSubmit={async (event) => {
            event.preventDefault();
            if (!endpoint || status === "sending") return;
            const trimmed = message.trim();
            if (!trimmed) return;
            setStatus("sending");
            try {
              await submitFeedback({
                targetId: target.id,
                targetTitle: target.title,
                surface: target.surface,
                pagePath: pathname || "/",
                specimenId: specimenId || undefined,
                specimenName: specimenName || undefined,
                name: name.trim() || undefined,
                email: email.trim() || undefined,
                message: trimmed,
                hp: honeypot,
              });
              setStatus("sent");
            } catch {
              setStatus("error");
            }
          }}
        >
          <label className="sr-only" htmlFor="feedback-company-website">
            Company website
          </label>
          <input
            id="feedback-company-website"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <label className="grid gap-lab-2">
            <span className="font-sans text-label uppercase text-ink-tertiary">
              Note
            </span>
            <textarea
              name="message"
              required
              rows={5}
              maxLength={4000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="What should be revised, clarified, or continued?"
              className={fieldClass}
            />
          </label>

          <div className="grid gap-lab-5 sm:grid-cols-2">
            <label className="grid gap-lab-2">
              <span className="font-sans text-label uppercase text-ink-tertiary">
                Name
                <span className="ml-lab-2 normal-case tracking-normal text-ink-faint">
                  optional
                </span>
              </span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                maxLength={120}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="grid gap-lab-2">
              <span className="font-sans text-label uppercase text-ink-tertiary">
                Email
                <span className="ml-lab-2 normal-case tracking-normal text-ink-faint">
                  optional
                </span>
              </span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                maxLength={200}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          {status === "error" ? (
            <p className="font-sans text-meta text-status-critical">
              Could not send the note. Try again in a moment.
            </p>
          ) : null}

          {!endpoint ? (
            <p className="font-sans text-meta text-ink-tertiary">
              Correspondence is not connected yet — the inbox endpoint is
              missing from this build.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!endpoint || status === "sending" || !message.trim()}
            className="inline-flex h-10 w-fit items-center justify-center bg-accent px-lab-4 font-sans text-meta text-ink-inverse transition-colors duration-fast ease-lab hover:bg-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "sending" ? "Sending…" : "Send note"}
          </button>
        </form>
      )}
    </div>
  );

  if (layout === "inset") {
    return inner;
  }

  return (
    <section className="border-b border-rule bg-surface">
      <div className="mx-auto max-w-shell px-margin py-lab-9">{inner}</div>
    </section>
  );
}
