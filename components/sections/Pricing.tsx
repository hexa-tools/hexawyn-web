import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { pricingTiers, pricingNote } from "@/lib/content";

export function Pricing(): React.ReactElement {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Start free. Pay as you scale."
        description="hexawyn is open source and self-hostable. Paid tiers unlock managed clouds, proactive monitoring and more credits."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-5">
        {pricingTiers.map((tier, index) => (
          <Reveal key={tier.name} delay={index * 0.05} className="h-full">
            <div
              className={`flex h-full flex-col gap-5 rounded-2xl border p-6 ${
                tier.featured
                  ? "border-brand/60 bg-brand/[0.07] shadow-glow"
                  : "border-white/10 bg-navy/40"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-wide text-cloud/70">
                    {tier.name}
                  </span>
                  {tier.featured ? (
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-cloud">
                    {tier.price}
                  </span>
                  <span className="text-sm text-cloud/40">/ {tier.period}</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-wide text-cloud/40">
                  {tier.audience}
                </p>
              </div>

              <div className="flex flex-col gap-1 rounded-xl border border-brand/20 bg-brand/[0.06] px-4 py-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-brand">
                  <Icon name="spark" className="h-4 w-4" />
                  {tier.credits}
                </span>
                <span className="text-xs text-cloud/45">
                  1 credit = 1 investigation
                </span>
              </div>

              <ul className="flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-cloud/75"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${
                  tier.featured
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "border border-white/15 text-cloud hover:border-white/30"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-cloud/45">
        {pricingNote}
      </p>
    </Section>
  );
}
