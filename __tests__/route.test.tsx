import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { GET } from "@/app/signup/route";

const CONTROL_PLANE = "https://cp.test";

beforeEach(() => {
  process.env.NEXT_PUBLIC_HEXA_CLOUD_URL = CONTROL_PLANE;
});

afterEach(() => {
  delete process.env.NEXT_PUBLIC_HEXA_CLOUD_URL;
});

describe("GET /signup", () => {
  it("302s to the control-plane GitHub auth flow", async () => {
    const res = await GET(
      new Request("https://hexawyn.com/signup?plan=free"),
    );
    expect(res.status).toBe(302);
    const location = res.headers.get("location")!;
    expect(location).toContain(CONTROL_PLANE);
    expect(location).toContain("/api/v1/auth/oauth/github/start");
    expect(location).toContain("plan=free");
    expect(location).toContain(
      "redirect_uri=https%3A%2F%2Fhexawyn.com%2Fsignup%2Fsuccess",
    );
  });

  it("defaults to the free plan when none is supplied", async () => {
    const res = await GET(new Request("https://hexawyn.com/signup"));
    expect(res.headers.get("location")).toContain("plan=free");
  });

  it("never leaks a raw API token in the redirect URL", async () => {
    const res = await GET(new Request("https://hexawyn.com/signup"));
    expect(res.headers.get("location")).not.toMatch(/hxw_/);
  });
});
