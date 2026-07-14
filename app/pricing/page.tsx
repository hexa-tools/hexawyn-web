import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Pricing } from "@/components/sections/Pricing";
import { PricingTable } from "@/components/sections/PricingTable";
import { CTA } from "@/components/sections/CTA";
import { pricingFaq, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Plans and full feature comparison for ${site.name}. Start free, pay as you scale — credits, managed clouds, proactive monitoring and more.`,
};

export default function PricingPage(): React.ReactElement {
  return (
    <>
      <Pricing />

      <Section id="compare">
        <SectionHeading
          eyebrow="Compare"
          title="Every feature, side by side"
          description="The full breakdown of what each plan includes — from credits to cloud adapters and support."
        />
        <div className="mt-12">
          <PricingTable />
        </div>
      </Section>

      <Section id="faq">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions about credits & plans"
          align="left"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pricingFaq.map((item, index) => (
            <Reveal key={item.question} delay={(index % 2) * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-navy/40 p-6">
                <h3 className="text-lg font-semibold text-cloud">
                  {item.question}
                </h3>
                <p className="text-sm leading-relaxed text-cloud/60">
                  {item.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
