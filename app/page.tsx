import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Reliability } from "@/components/sections/Reliability";
import { Assurance } from "@/components/sections/Assurance";
import { UseCases } from "@/components/sections/UseCases";
import { Technologies } from "@/components/sections/Technologies";
import { Trust } from "@/components/sections/Trust";
import { Community } from "@/components/sections/Community";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { ContactForm } from "@/components/sections/ContactForm";
import { CTA } from "@/components/sections/CTA";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <Problem />
      <Reliability />
      <Assurance />
      <UseCases />
      <Technologies />
      <Trust />
      <Community />
      <PricingTeaser />
      <ContactForm />
      <CTA />
    </>
  );
}
