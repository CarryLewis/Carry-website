import Link from "next/link";
import type {
  MedicalCollectionMeta,
  MedicalPropertyField,
  MedicalRecordView,
} from "@/content/medical";

type Props = {
  collection: MedicalCollectionMeta;
  record: MedicalRecordView;
  fields: MedicalPropertyField[];
};

export function MedicalRecordDetail({ collection, record, fields }: Props) {
  return (
    <article className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        <Link
          href="/medical/"
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Medical
        </Link>
        {" / "}
        <Link
          href={`/medical/${collection.id}/`}
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {collection.label}
        </Link>
      </p>

      <h1 className="mt-lab-3 font-serif text-page text-ink">{record.title}</h1>

      {record.summary ? (
        <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
          {record.summary}
        </p>
      ) : null}

      <dl className="mt-lab-3 flex flex-wrap gap-x-lab-5 gap-y-lab-2 font-mono text-meta text-ink-faint">
        <div>
          <dt className="inline">Updated </dt>
          <dd className="inline text-ink-tertiary">{record.updatedAt}</dd>
        </div>
        {record.source.notionUrl ? (
          <div>
            <dt className="sr-only">Notion</dt>
            <dd>
              <a
                href={record.source.notionUrl}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Open in Notion
              </a>
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-lab-8 space-y-lab-7 border-t border-rule pt-lab-7">
        {fields.length === 0 ? (
          <p className="font-sans text-body-ui text-ink-secondary">
            No displayable fields on this record.
          </p>
        ) : (
          fields.map((field) => (
            <section key={field.label}>
              <h2 className="font-sans text-label uppercase text-ink-tertiary">
                {field.label}
              </h2>
              {field.kind === "text" ? (
                <p className="mt-lab-3 max-w-prose whitespace-pre-wrap font-sans text-body-ui text-ink-secondary">
                  {field.text}
                </p>
              ) : null}
              {field.kind === "list" ? (
                <ul className="mt-lab-3 list-disc space-y-lab-2 pl-lab-5 font-sans text-body-ui text-ink-secondary">
                  {field.items?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {field.kind === "links" ? (
                <ul className="mt-lab-3 space-y-lab-2 font-sans text-body-ui">
                  {field.links?.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-accent hover:text-accent-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))
        )}
      </div>
    </article>
  );
}
