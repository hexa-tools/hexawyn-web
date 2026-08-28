export type SignupStatus =
  | "pending"
  | "success"
  | "github_cancelled"
  | "github_failed"
  | "provisioning_failed"
  | "email_failed";

export type SignupOutcome = {
  status: SignupStatus;
  email: string | null;
  credits: number;
  canRetryEmail: boolean;
};

export const FREE_PLAN_CREDITS = 50;
export const FREE_CREDITS_LABEL = "50 credits / month";
export const SIGNUP_PLAN = "free";

export const OAUTH_START_PATH = "/api/v1/auth/oauth/github/start";
export const SUCCESS_PATH = "/signup/success";

const CONTROL_PLANE_FALLBACK = "https://api.hexawyn.com";

const KNOWN_STATUSES: SignupStatus[] = [
  "pending",
  "success",
  "github_cancelled",
  "github_failed",
  "provisioning_failed",
  "email_failed",
];

export function controlPlaneBaseUrl(): string {
  return process.env.NEXT_PUBLIC_HEXA_CLOUD_URL || CONTROL_PLANE_FALLBACK;
}

export function signupRedirectUri(origin: string): string {
  return `${origin.replace(/\/+$/, "")}${SUCCESS_PATH}`;
}

export function signupAuthStartUrl(
  redirectUri: string,
  plan: string = SIGNUP_PLAN,
): string {
  const url = new URL(`${controlPlaneBaseUrl()}${OAUTH_START_PATH}`);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("plan", plan);
  return url.toString();
}

function asString(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

function normalizeStatus(value: string | undefined): SignupStatus {
  if (value && (KNOWN_STATUSES as string[]).includes(value)) {
    return value as SignupStatus;
  }
  return "pending";
}

function parseCredits(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : FREE_PLAN_CREDITS;
}

export function parseSignupOutcome(
  raw: Record<string, string | string[] | undefined>,
): SignupOutcome {
  const status = normalizeStatus(asString(raw.status));
  const email = asString(raw.email);
  return {
    status,
    email: email && email.includes("@") ? email : null,
    credits: parseCredits(asString(raw.credits)),
    canRetryEmail: status === "email_failed",
  };
}
