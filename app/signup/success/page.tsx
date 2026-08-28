import type { Metadata } from "next";
import { parseSignupOutcome } from "@/lib/signup";
import { SignupOutcomeView } from "@/components/signup/SignupOutcomeView";

export const metadata: Metadata = {
  title: "Free account",
  description:
    "Your hexawyn Free account is ready. Check your inbox for your Hexawyn Cloud token.",
};

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SignupSuccessPage({
  searchParams,
}: Props): Promise<React.ReactElement> {
  const raw = await searchParams;
  const outcome = parseSignupOutcome(raw);
  return <SignupOutcomeView outcome={outcome} />;
}
