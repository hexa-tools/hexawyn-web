import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pricing } from "@/components/sections/Pricing";
import {
  signupAuthStartUrl,
  signupRedirectUri,
  parseSignupOutcome,
  controlPlaneBaseUrl,
  FREE_PLAN_CREDITS,
  SIGNUP_PLAN,
} from "@/lib/signup";

const CONTROL_PLANE = "https://cp.test";

beforeEach(() => {
  process.env.NEXT_PUBLIC_HEXA_CLOUD_URL = CONTROL_PLANE;
});

afterEach(() => {
  delete process.env.NEXT_PUBLIC_HEXA_CLOUD_URL;
});

describe("lib/signup · OAuth entry contract", () => {
  it("builds a control-plane GitHub auth URL carrying redirect_uri and plan", () => {
    const url = signupAuthStartUrl(
      signupRedirectUri("https://hexawyn.com"),
      SIGNUP_PLAN,
    );
    const parsed = new URL(url);
    expect(parsed.origin).toBe(CONTROL_PLANE);
    expect(parsed.pathname).toBe("/api/v1/auth/oauth/github/start");
    expect(parsed.searchParams.get("plan")).toBe(SIGNUP_PLAN);
    expect(parsed.searchParams.get("redirect_uri")).toBe(
      "https://hexawyn.com/signup/success",
    );
  });

  it("builds the website success URI under /signup/success", () => {
    expect(signupRedirectUri("https://hexawyn.com")).toBe(
      "https://hexawyn.com/signup/success",
    );
    expect(signupRedirectUri("https://hexawyn.com/")).toBe(
      "https://hexawyn.com/signup/success",
    );
  });

  it("reads the control-plane base URL from env with a safe fallback", () => {
    delete process.env.NEXT_PUBLIC_HEXA_CLOUD_URL;
    expect(controlPlaneBaseUrl()).toBe("https://api.hexawyn.com");
    process.env.NEXT_PUBLIC_HEXA_CLOUD_URL = CONTROL_PLANE;
  });
});

describe("lib/signup · outcome parsing", () => {
  it("parses a success outcome with email and credits", () => {
    const outcome = parseSignupOutcome({
      status: "success",
      email: "user@example.com",
      credits: "50",
    });
    expect(outcome.status).toBe("success");
    expect(outcome.email).toBe("user@example.com");
    expect(outcome.credits).toBe(50);
    expect(outcome.canRetryEmail).toBe(false);
  });

  it("defaults credits to the free quota when absent or invalid", () => {
    expect(
      parseSignupOutcome({ status: "success" }).credits,
    ).toBe(FREE_PLAN_CREDITS);
    expect(
      parseSignupOutcome({ status: "success", credits: "abc" }).credits,
    ).toBe(FREE_PLAN_CREDITS);
    expect(
      parseSignupOutcome({ status: "success", credits: "-3" }).credits,
    ).toBe(FREE_PLAN_CREDITS);
  });

  it("flags an email delivery failure as retryable", () => {
    const outcome = parseSignupOutcome({
      status: "email_failed",
      email: "user@example.com",
    });
    expect(outcome.canRetryEmail).toBe(true);
  });

  it("drops a malformed email address", () => {
    const outcome = parseSignupOutcome({
      status: "success",
      email: "not-an-email",
    });
    expect(outcome.email).toBeNull();
  });

  it("treats an unknown or missing status as pending", () => {
    expect(parseSignupOutcome({}).status).toBe("pending");
    expect(parseSignupOutcome({ status: "bogus" }).status).toBe("pending");
    expect(parseSignupOutcome({}).canRetryEmail).toBe(false);
  });
});

describe("pricing · Start free entry point", () => {
  it("points the free plan button at the signup flow", () => {
    render(<Pricing />);
    const button = screen.getByRole("link", { name: "Start free" });
    expect(button).toHaveAttribute("href", "/signup?plan=free");
  });

  it("keeps paid-tier checkout links intact", () => {
    render(<Pricing />);
    const starter = screen.getByRole("link", { name: "Choose Starter" });
    expect(starter.getAttribute("href")).toMatch(/^https:\/\/buy\.polar\.sh/);
  });
});
