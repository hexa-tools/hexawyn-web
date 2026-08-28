import {
  signupAuthStartUrl,
  signupRedirectUri,
  SIGNUP_PLAN,
} from "@/lib/signup";

function requestOrigin(request: Request): string {
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("x-forwarded-host");
  if (proto && host) return `${proto}://${host}`;
  return new URL(request.url).origin;
}

export function GET(request: Request): Response {
  const url = new URL(request.url);
  const plan = url.searchParams.get("plan") || SIGNUP_PLAN;
  const target = signupAuthStartUrl(
    signupRedirectUri(requestOrigin(request)),
    plan,
  );
  return Response.redirect(target, 302);
}
