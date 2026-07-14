import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { pricingTiers } from "@/lib/content";

export function PricingTeaser(): React.ReactElement {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Start free. Pay as you scale."
        description="Open source and self-hostable, with credit-based plans from solo devs to the enterprise. 1 credit = 1 investigation."
      />

      <Reveal>
        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-stretch justify-center gap-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex min-w-[9rem] flex-1 flex-col gap-1 rounded-xl border px-5 py-4 ${
                tier.featured
                  ? "border-brand/50 bg-brand/[0.07]"
                  : "border-white/10 bg-navy/40"
              }`}
            >
              <span className="text-xs uppercase tracking-wide text-cloud/50">
                {tier.name}
              </span>
              <span className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-cloud">
                  {tier.price}
                </span>
                {tier.price !== "Custom" ? (
                  <span className="text-xs text-cloud/40">/mo</span>
                ) : null}
              </span>
              <span className="text-xs text-brand">{tier.credits}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 flex justify-center">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand/90"
        >
          See full pricing & compare plans
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
