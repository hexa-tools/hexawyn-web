import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { problem } from "@/lib/content";

export function Problem(): React.ReactElement {
  return (
    <Section id="problem">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="flex flex-col gap-6">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
              The problem
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-cloud sm:text-4xl">
              {problem.heading}
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-cloud/60">
              {problem.punchline}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy/50 p-8">
            {problem.lines.map((line, index) => (
              <div key={line} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 font-mono text-xs text-cloud/50">
                  {index + 1}
                </span>
                <p className="text-lg text-cloud/80">{line}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
