import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { trust, roadmap } from "@/lib/content";

export function Trust(): React.ReactElement {
  return (
    <Section id="trust">
      <div className="rounded-3xl border border-white/10 bg-navy/50 p-8 sm:p-12">
        <Reveal>
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
              Trust
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-cloud sm:text-4xl">
              {trust.heading}
            </h2>
            <p className="text-lg leading-relaxed text-cloud/60">
              {trust.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/30 p-6">
                <span className="font-mono text-4xl font-bold text-brand">
                  {stat.value}
                </span>
                <span className="text-sm text-cloud/55">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 border-t border-white/5 pt-10">
          <h3 className="text-xl font-semibold text-cloud">{roadmap.heading}</h3>
          <p className="mt-2 max-w-2xl text-cloud/55">{roadmap.description}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {roadmap.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-cloud/70"
              >
                <Icon name="spark" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
