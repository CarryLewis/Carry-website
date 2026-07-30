import Link from "next/link";
import type {
  MedicalCollectionMeta,
  MedicalRecordView,
} from "@/content/medical";

type Props = {
  collection: MedicalCollectionMeta;
  records: MedicalRecordView[];
};

export function MedicalCollectionList({ collection, records }: Props) {
  return (
    <section className="mx-auto max-w-shell px-margin py-lab-9">
      <p className="font-sans text-label uppercase text-ink-tertiary">
        <Link
          href="/medical/"
          className="text-ink-tertiary hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Medical
        </Link>
        {" / "}
        {collection.label}
      </p>
      <h1 className="mt-lab-3 font-serif text-page text-ink">
        {collection.title}
      </h1>
      <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-secondary">
        {collection.description}
      </p>
      <p className="mt-lab-3 font-mono text-code text-ink-faint">
        {records.length} records
      </p>

      <ul className="mt-lab-8 divide-y divide-rule border-y border-rule">
        {records.map((record) => (
          <li key={record.id}>
            <Link
              href={`/medical/${collection.id}/${record.slug}/`}
              className="group block py-lab-5 transition-colors duration-fast hover:bg-surface-raised/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <h2 className="font-serif text-section text-ink group-hover:text-accent">
                {record.title}
              </h2>
              {record.summary ? (
                <p className="mt-lab-2 max-w-prose font-sans text-body-ui text-ink-secondary">
                  {record.summary}
                </p>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
