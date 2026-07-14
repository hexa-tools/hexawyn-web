import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/ui/LegalShell";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.name}.`,
};

export default function PrivacyPage(): React.ReactElement {
  return (
    <LegalShell title="Privacy Policy" updated="July 14, 2026">
      <p className="leading-relaxed text-cloud/60">
        This Privacy Policy explains what data {site.name} handles and how. Our
        design principle is simple: keep your infrastructure data on your
        infrastructure.
      </p>

      <LegalSection heading="1. Local-first by design">
        <p>
          {site.name} runs on your machine and inside your environment. Your
          kubeconfig and raw logs never leave your machine. Conversations,
          incidents, metrics and history are stored in a local database file on
          your own servers.
        </p>
      </LegalSection>

      <LegalSection heading="2. What transits through our control-plane">
        <p>
          For full transparency: when you ask a question, that question and the
          context needed to answer it transit through our control-plane. Your
          credentials and raw logs do not. We do not sell your data, and we do
          not use it to train third-party models.
        </p>
      </LegalSection>

      <LegalSection heading="3. Account and billing data">
        <p>
          If you subscribe to a paid plan, our payment processor collects the
          billing information required to process your payment. We store the
          minimum account information needed to provide the Service.
        </p>
      </LegalSection>

      <LegalSection heading="4. Cookies and analytics">
        <p>
          Our website may use privacy-friendly analytics to understand aggregate
          traffic. We do not use invasive third-party advertising trackers.
        </p>
      </LegalSection>

      <LegalSection heading="5. Your rights">
        <p>
          You may request access to, correction of, or deletion of your account
          data at any time by contacting us. Because most operational data lives
          on your own infrastructure, you remain in direct control of it.
        </p>
      </LegalSection>

      <LegalSection heading="6. Contact">
        <p>
          For any privacy request, contact us at{" "}
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
