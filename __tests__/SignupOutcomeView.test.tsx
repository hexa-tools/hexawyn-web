import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SignupOutcomeView } from "@/components/signup/SignupOutcomeView";
import { parseSignupOutcome } from "@/lib/signup";

function view(raw: Record<string, string>) {
  const outcome = parseSignupOutcome(raw);
  return render(<SignupOutcomeView outcome={outcome} />);
}

describe("SignupOutcomeView", () => {
  it("shows the ready state with credits and the delivered email", () => {
    view({ status: "success", email: "alice@hexawyn.com", credits: "50" });
    expect(screen.getByRole("heading", { name: /You're in/i })).toBeInTheDocument();
    expect(screen.getByText(/50 credits \/ month/)).toBeInTheDocument();
    expect(screen.getByText(/alice@hexawyn.com/)).toBeInTheDocument();
    expect(screen.getByText(/GitHub account connected/i)).toBeInTheDocument();
    expect(screen.getByText(/Free plan activated/i)).toBeInTheDocument();
  });

  it("does not render any raw cloud token", () => {
    view({ status: "success", email: "alice@hexawyn.com", credits: "50" });
    expect(screen.queryByText(/hxw_/)).not.toBeInTheDocument();
  });

  it("explains the token is delivered by email and is sensitive", () => {
    view({ status: "success", email: "alice@hexawyn.com", credits: "50" });
    expect(screen.getByText(/We've sent your Hexawyn Cloud token to/i)).toBeInTheDocument();
    expect(screen.getByText(/delivered by email/i)).toBeInTheDocument();
  });

  it("shows the install and login commands", () => {
    view({ status: "success", email: "alice@hexawyn.com", credits: "50" });
    expect(screen.getAllByText("pip install hexawyn").length).toBeGreaterThan(0);
    expect(screen.getAllByText("hexa login").length).toBeGreaterThan(0);
  });

  it("renders the provisioning loading steps", () => {
    view({ status: "pending" });
    expect(
      screen.getByText(/Setting up your Hexawyn account.../i),
    ).toBeInTheDocument();
    expect(screen.getByText(/GitHub authenticated/i)).toBeInTheDocument();
    expect(screen.getByText(/Creating your Free account/i)).toBeInTheDocument();
    expect(screen.getByText(/Activating 50 credits/i)).toBeInTheDocument();
  });

  it("renders the GitHub-auth-cancelled state", () => {
    view({ status: "github_cancelled" });
    expect(screen.getByText(/GitHub authentication was cancelled/i)).toBeInTheDocument();
    expect(screen.getByText(/No Hexawyn account was created/i)).toBeInTheDocument();
  });

  it("renders the GitHub-auth-failed state", () => {
    view({ status: "github_failed" });
    expect(
      screen.getByText(/We couldn't authenticate your GitHub account/i),
    ).toBeInTheDocument();
  });

  it("renders the provisioning-failed state", () => {
    view({ status: "provisioning_failed" });
    expect(
      screen.getByText(/We couldn't create your Hexawyn account/i),
    ).toBeInTheDocument();
  });

  it("renders the email-failure state with a retry link", () => {
    view({ status: "email_failed", email: "alice@hexawyn.com" });
    expect(
      screen.getByText(/we couldn't send your token email/i),
    ).toBeInTheDocument();
    const retry = screen.getByRole("link", { name: /retry/i });
    expect(retry).toHaveAttribute("href", "/signup");
  });
});
