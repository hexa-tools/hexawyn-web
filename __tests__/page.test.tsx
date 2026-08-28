import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SignupSuccessPage from "@/app/signup/success/page";

async function renderOutcome(raw: Record<string, string>) {
  const element = await SignupSuccessPage({
    searchParams: Promise.resolve(raw),
  });
  return render(element);
}

describe("SignupSuccessPage", () => {
  it("renders the success state without exposing a raw token", async () => {
    await renderOutcome({
      status: "success",
      email: "alice@hexawyn.com",
      credits: "50",
    });
    expect(
      screen.getByRole("heading", { name: /You're in/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/50 credits \/ month/)).toBeInTheDocument();
    expect(screen.getByText(/alice@hexawyn.com/)).toBeInTheDocument();
    expect(screen.queryByText(/hxw_/)).not.toBeInTheDocument();
  });

  it("renders the provisioning loading state", async () => {
    await renderOutcome({ status: "pending" });
    expect(
      screen.getByText(/Setting up your Hexawyn account.../i),
    ).toBeInTheDocument();
    expect(screen.getByText(/GitHub authenticated/i)).toBeInTheDocument();
  });

  it("renders the email-failure state with a retry entry", async () => {
    await renderOutcome({
      status: "email_failed",
      email: "alice@hexawyn.com",
    });
    expect(
      screen.getByText(/we couldn't send your token email/i),
    ).toBeInTheDocument();
    const retry = screen.getByRole("link", { name: /retry/i });
    expect(retry).toHaveAttribute("href", "/signup");
  });
});
