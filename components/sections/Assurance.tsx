import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { verification, privacy } from "@/lib/content";

export function Assurance(): React.ReactElement {
  return (
    <Section id="assurance">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <PillarCard
            icon="shield"
            heading={verification.heading}
            description={verification.description}
            points={verification.points}
          />
        </Reveal>
        <Reveal delay={0.12}>
          <PillarCard
            icon="lock"
            heading={privacy.heading}
            description={privacy.description}
            points={privacy.points}
            note={privacy.note}
          />
        </Reveal>
      </div>
    </Section>
  );
}

type PillarCardProps = {
  icon: "shield" | "lock";
  heading: string;
  description: string;
  points: string[];
  note?: string;
};

function PillarCard({
  icon,
  heading,
  description,
  points,
  note,
}: PillarCardProps): React.ReactElement {
  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-navy/40 p-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold tracking-tight text-cloud">
          {heading}
        </h3>
        <p className="leading-relaxed text-cloud/60">{description}</p>
      </div>
      <ul className="flex flex-col gap-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-cloud/80">
            <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {note ? (
        <p className="mt-auto rounded-lg border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm text-amber-200/80">
          {note}
        </p>
      ) : null}
    </div>
  );
}
