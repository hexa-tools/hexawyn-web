import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useCases } from "@/lib/content";

export function UseCases(): React.ReactElement {
  return (
    <Section id="use-cases">
      <SectionHeading
        eyebrow="What it solves"
        title="One assistant, every part of the job"
        description="From the 3 a.m. incident to the quarterly board review — hexawyn covers the work that slows platform teams down."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {useCases.map((useCase, index) => (
          <Reveal key={useCase.title} delay={(index % 4) * 0.06}>
            <div className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-navy/40 p-6 hover:border-brand/40">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand group-hover:border-brand/40">
                <Icon name={useCase.icon as IconName} className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-cloud">
                {useCase.title}
              </h3>
              <p className="text-sm leading-relaxed text-cloud/55">
                {useCase.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
