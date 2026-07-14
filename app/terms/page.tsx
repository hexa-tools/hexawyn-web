import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/ui/LegalShell";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${site.name}.`,
};

export default function TermsPage(): React.ReactElement {
  return (
    <LegalShell title="Terms of Service" updated="July 14, 2026">
      <p className="leading-relaxed text-cloud/60">
        These Terms of Service (&quot;Terms&quot;) govern your access to and use
        of {site.name} (the &quot;Service&quot;), operated by the {site.name}{" "}
        team. By using the Service you agree to these Terms.
      </p>

      <LegalSection heading="1. The Service">
        <p>
          {site.name} is an open-source, self-hostable assistant that helps you
          diagnose and operate Kubernetes clusters. The core software is
          distributed under an open-source license. Paid plans provide
          additional capabilities and support.
        </p>
      </LegalSection>

      <LegalSection heading="2. Accounts and plans">
        <p>
          Some features require a paid subscription. Prices are shown on our
          pricing page and are billed through our payment processor. You are
          responsible for keeping your account credentials secure and for all
          activity under your account.
        </p>
      </LegalSection>

      <LegalSection heading="3. Acceptable use">
        <p>
          You agree not to misuse the Service, attempt to disrupt it, or use it
          to violate any applicable law. You remain solely responsible for the
          infrastructure you connect and for any actions you take based on the
          Service&apos;s output.
        </p>
      </LegalSection>

      <LegalSection heading="4. No warranty">
        <p>
          The Service is provided &quot;as is&quot; without warranties of any
          kind. {site.name} does not guarantee that its output is free of
          errors. You should review all recommendations before applying them to
          production systems.
        </p>
      </LegalSection>

      <LegalSection heading="5. Limitation of liability">
        <p>
          To the maximum extent permitted by law, {site.name} shall not be
          liable for any indirect, incidental, or consequential damages arising
          from your use of the Service.
        </p>
      </LegalSection>

      <LegalSection heading="6. Changes">
        <p>
          We may update these Terms from time to time. Material changes will be
          reflected by the &quot;Last updated&quot; date above.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <p>
          Questions about these Terms? Reach us at{" "}
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-brand hover:text-brand/80"
          >
            {site.contactEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalShell>
  );
}
