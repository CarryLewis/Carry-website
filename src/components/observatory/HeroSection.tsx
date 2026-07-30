import { HeroConstellation } from "@/components/observatory/HeroConstellation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { ObservatoryCopy, PersonProfile } from "@/domain/entities";

type HeroSectionProps = {
  profile: PersonProfile;
  copy: Pick<
    ObservatoryCopy,
    "heroEyebrow" | "heroPrimaryCta" | "heroSecondaryCta" | "heroFigureCaption"
  >;
};

export function HeroSection({ profile, copy }: HeroSectionProps) {
  return (
    <section className="border-b border-rule bg-void">
      <div className="mx-auto grid max-w-shell gap-lab-8 px-margin py-lab-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-lab-10 lg:py-lab-10">
        <div className="min-w-0">
          <p className="font-sans text-label uppercase text-ink-tertiary">
            {copy.heroEyebrow}
          </p>
          <h1 className="mt-lab-4 font-serif text-hero uppercase text-ink">
            {profile.name}
          </h1>
          <p className="mt-lab-5 font-sans text-section text-ink-secondary">
            {profile.subtitle}
          </p>
          <p className="mt-lab-5 max-w-prose font-serif text-body text-ink-secondary">
            {profile.thesis}
          </p>
          <p className="mt-lab-4 max-w-prose font-sans text-body-ui text-ink-tertiary">
            {profile.role}
          </p>

          <ul className="mt-lab-6 flex flex-wrap gap-lab-2">
            {profile.focusAreas.map((area) => (
              <li
                key={area}
                className="border border-rule px-lab-3 py-lab-2 font-sans text-meta text-ink-secondary"
              >
                {area}
              </li>
            ))}
          </ul>

          <div className="mt-lab-7 flex flex-wrap gap-lab-3">
            <ButtonLink href={copy.heroPrimaryCta.href} variant="primary">
              {copy.heroPrimaryCta.label}
            </ButtonLink>
            <ButtonLink href={copy.heroSecondaryCta.href} variant="secondary">
              {copy.heroSecondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="min-w-0">
          <HeroConstellation />
          <p className="mt-lab-3 font-mono text-code text-ink-faint">
            {copy.heroFigureCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
