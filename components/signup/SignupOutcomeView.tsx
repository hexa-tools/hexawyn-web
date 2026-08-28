import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CopyCommand } from "@/components/ui/CopyCommand";
import type { SignupOutcome } from "@/lib/signup";

const PROVISION_STEPS = [
  "GitHub authenticated",
  "Creating your Free account",
  "Activating 50 credits",
  "Preparing your Cloud access",
];

type ViewProps = { outcome: SignupOutcome };

export function SignupOutcomeView({ outcome }: ViewProps): React.ReactElement {
  switch (outcome.status) {
    case "success":
      return <SuccessState outcome={outcome} />;
    case "pending":
      return <PendingState />;
    case "github_cancelled":
      return <ErrorState title="GitHub authentication was cancelled" message="No Hexawyn account was created." />;
    case "github_failed":
      return <ErrorState title="We couldn't authenticate your GitHub account" message="Please try again." />;
    case "provisioning_failed":
      return <ErrorState title="We couldn't create your Hexawyn account" message="Please try again later." />;
    case "email_failed":
      return <EmailFailedState outcome={outcome} />;
    default:
      return <PendingState />;
  }
}

function Card({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}

function SuccessState({ outcome }: { outcome: SignupOutcome }): React.ReactElement {
  return (
    <Card>
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.06] p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Icon name="check" className="h-8 w-8" />
        </span>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-cloud">
            You&apos;re in 🎉
          </h1>
          <p className="text-lg leading-relaxed text-cloud/70">
            Your Hexawyn Free account is ready.
          </p>
        </div>

        <ul className="flex w-full flex-col gap-2 text-left text-sm text-cloud/75">
          <Check label="GitHub account connected" />
          <Check label="Free plan activated" />
          <Check label={outcome.credits + " credits / month"} />
        </ul>

        <div className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] px-5 py-4 text-sm text-emerald-300">
          <span className="flex items-center justify-center gap-2 font-semibold">
            <Icon name="spark" className="h-4 w-4" />
            We&apos;ve sent your Hexawyn Cloud token to:
          </span>
          <p className="mt-1 text-emerald-200/80">{outcome.email}</p>
          <p className="mt-2 text-emerald-200/60">
            The token is delivered by email and is sensitive — it will not be
            shown again. Check your spam folder if it doesn&apos;t arrive
            within a few minutes.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <p className="text-left text-sm font-semibold text-cloud/70">Next</p>
          <CopyCommand command="pip install hexawyn" />
          <CopyCommand command="hexa login" />
          <p className="text-left text-xs text-cloud/45">
            Paste the token from your inbox when the CLI asks for it.
          </p>
        </div>

        <Link
          href="/pricing"
          className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-cloud hover:border-white/30"
        >
          Back to pricing
        </Link>
      </div>
    </Card>
  );
}

function PendingState(): React.ReactElement {
  return (
    <Card>
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-navy/40 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Icon name="spark" className="h-6 w-6" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-cloud">
            Setting up your Hexawyn account...
          </h1>
          <p className="text-sm text-cloud/60">
            This only takes a moment. We&apos;ll finish as soon as your access is
            ready.
          </p>
        </div>
        <ul className="flex w-full flex-col gap-2 text-left text-sm text-cloud/75">
          {PROVISION_STEPS.map((step) => (
            <Check key={step} label={step} />
          ))}
        </ul>
        <Link
          href="/pricing"
          className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-cloud hover:border-white/30"
        >
          Back to pricing
        </Link>
      </div>
    </Card>
  );
}

function ErrorState({
  title,
  message,
}: {
  title: string;
  message: string;
}): React.ReactElement {
  return (
    <Card>
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-red-500/30 bg-navy/40 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-400">
          <Icon name="alert" className="h-6 w-6" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-cloud">{title}</h1>
          <p className="text-sm text-cloud/60">{message}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand/90"
          >
            Try again
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-cloud hover:border-white/30"
          >
            Back to pricing
          </Link>
        </div>
      </div>
    </Card>
  );
}

function EmailFailedState({ outcome }: { outcome: SignupOutcome }): React.ReactElement {
  return (
    <Card>
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-red-500/30 bg-navy/40 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/15 text-red-400">
          <Icon name="alert" className="h-6 w-6" />
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-cloud">
            Your account was created, but we couldn&apos;t send your token email
          </h1>
          <p className="text-sm text-cloud/60">
            {outcome.email
              ? `We couldn't send the email to ${outcome.email}.`
              : "We couldn't send the email to your address."}
          </p>
          <p className="text-sm text-cloud/60">
            Your Free account and 50 credits are already active. Please retry
            the email delivery.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand/90"
          >
            Retry email delivery
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-cloud hover:border-white/30"
          >
            Back to pricing
          </Link>
        </div>
      </div>
    </Card>
  );
}

function Check({ label }: { label: string }): React.ReactElement {
  return (
    <li className="flex items-center gap-2 text-sm text-cloud/75">
      <Icon name="check" className="h-4 w-4 shrink-0 text-brand" />
      <span>{label}</span>
    </li>
  );
}
