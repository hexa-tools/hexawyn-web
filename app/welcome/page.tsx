import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Payment confirmed",
  description: `Your ${site.name} subscription is active. Check your inbox for your API key.`,
};

export default function WelcomePage(): React.ReactElement {
  return (
    <Section className="flex min-h-[70vh] items-center justify-center">
      <Reveal className="w-full max-w-xl">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.06] p-10 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Icon name="check" className="h-8 w-8" />
          </span>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-cloud">
              Payment confirmed
            </h1>
            <p className="text-lg leading-relaxed text-cloud/70">
              Your subscription is active. We&apos;ve sent an email with your
              API key (token) to your inbox.
            </p>
          </div>

          <div className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] px-5 py-4 text-sm text-emerald-300">
            <span className="flex items-center justify-center gap-2 font-semibold">
              <Icon name="spark" className="h-4 w-4" />
              An email with your token has been sent
            </span>
            <p className="mt-1 text-emerald-200/70">
              Store it safely — you will not be able to see it again. Check your
              spam folder if it doesn&apos;t arrive within a few minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-cloud hover:border-white/30"
            >
              Back to home
            </Link>
            <Link
              href={site.githubUrl}
              className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand/90"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
