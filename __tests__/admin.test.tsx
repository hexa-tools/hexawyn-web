import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen, waitFor, fireEvent } from "@testing-library/react";
import AdminDashboard from "@/app/admin/page";
import AdminClients from "@/app/admin/clients/page";
import AdminSubscriptions from "@/app/admin/subscriptions/page";
import AdminApiKeys from "@/app/admin/api-keys/page";
import { AdminLogin } from "@/components/admin/AdminLogin";
import {
  fetchStats,
  fetchClients,
  fetchSubscriptions,
  fetchApiKeys,
  revokeApiKey,
} from "@/lib/admin";

// ─── Auth ───

function validateAdminToken(token: string | null): boolean {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  if (!expected) return false;
  if (!token) return false;
  return token === expected;
}

describe("admin auth", () => {
  it("rejects empty token", () => {
    expect(validateAdminToken(null)).toBe(false);
  });
  it("rejects wrong token", () => {
    expect(validateAdminToken("bad")).toBe(false);
  });
  it("rejects when no password env set", () => {
    expect(validateAdminToken("anything")).toBe(false);
  });
  it("accepts correct token", () => {
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD = "test123";
    expect(validateAdminToken("test123")).toBe(true);
    delete process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  });
});

// ─── Admin API client ───

describe("admin API client", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("fetchStats returns counters", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ clients: 5, active_subscriptions: 2, api_keys: 7 }),
    } as Response);
    const stats = await fetchStats();
    expect(stats.clients).toBe(5);
  });

  it("fetchStats throws on non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 401 } as Response);
    await expect(fetchStats()).rejects.toThrow("Admin API: 401");
  });

  it("fetchClients returns array", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: "1", email: "a@t.com", plan: "starter", status: "active", created_at: "2026-01-01" },
      ]),
    } as Response);
    const clients = await fetchClients();
    expect(clients).toHaveLength(1);
  });

  it("fetchSubscriptions returns array", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: "s1", client_id: "c1", email: "a@t.com", product: "hexawyn", plan: "team",
          status: "active", source: "polar", polar_subscription_id: null,
          current_period_start: "2026-01-01", current_period_end: "2026-02-01", created_at: "2026-01-01" },
      ]),
    } as Response);
    const subs = await fetchSubscriptions();
    expect(subs).toHaveLength(1);
  });

  it("fetchApiKeys returns array", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: "k1", client_id: "c1", email: "a@t.com", product: "hexawyn", plan: "starter",
          key_prefix: "hxw_", machine_id: "m1", revoked_at: null, created_at: "2026-01-01" },
      ]),
    } as Response);
    const keys = await fetchApiKeys();
    expect(keys).toHaveLength(1);
  });

  it("revokeApiKey calls POST", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ status: "revoked" }) } as Response);
    const result = await revokeApiKey("uuid-1");
    expect(result.status).toBe("revoked");
  });
});

// ─── AdminLogin ───

describe("AdminLogin", () => {
  beforeEach(() => {
    cleanup();
    delete process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  });

  it("renders login form", () => {
    render(<AdminLogin onLogin={vi.fn()} />);
    expect(screen.getByPlaceholderText("Admin password")).toBeInTheDocument();
    expect(screen.getByText("hexawyn Admin")).toBeInTheDocument();
  });

  it("shows error on wrong password", () => {
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD = "correct";
    render(<AdminLogin onLogin={vi.fn()} />);
    const input = screen.getByPlaceholderText("Admin password");
    fireEvent.change(input, { target: { value: "wrong" } });
    fireEvent.submit(input.closest("form")!);
    expect(screen.getByText("Invalid password")).toBeInTheDocument();
  });

  it("calls onLogin on correct password", () => {
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD = "ok";
    const onLogin = vi.fn();
    render(<AdminLogin onLogin={onLogin} />);
    const input = screen.getByPlaceholderText("Admin password");
    fireEvent.change(input, { target: { value: "ok" } });
    fireEvent.submit(input.closest("form")!);
    expect(onLogin).toHaveBeenCalledOnce();
  });
});

// ─── Dashboard ───

describe("AdminDashboard", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders all three stat cards with links", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ clients: 3, active_subscriptions: 1, api_keys: 4 }),
    } as Response));

    render(<AdminDashboard />);
    await waitFor(() => {
      const links = screen.getAllByRole("link");
      const hrefs = links.map((l) => l.getAttribute("href"));
      expect(hrefs).toContain("/admin/clients");
      expect(hrefs).toContain("/admin/subscriptions");
      expect(hrefs).toContain("/admin/api-keys");
    });
  });

  it("shows loading then stats", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ clients: 3, active_subscriptions: 1, api_keys: 4 }),
    } as Response));

    render(<AdminDashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });
});

// ─── Clients ───

describe("AdminClients", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders table with client data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: "c1", email: "alice@hexawyn.com", plan: "starter", status: "active", created_at: "2026-01-15" },
        { id: "c2", email: "bob@hexawyn.com", plan: "team", status: "inactive", created_at: "2026-03-20" },
      ]),
    } as Response));

    render(<AdminClients />);
    await waitFor(() => {
      expect(screen.getByText("alice@hexawyn.com")).toBeInTheDocument();
    });
  });
});

// ─── Subscriptions ───

describe("AdminSubscriptions", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders table with empty state removed", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: "s1", client_id: "c1", email: "alice@hexawyn.com", product: "hexawyn", plan: "starter",
          status: "active", source: "polar", polar_subscription_id: null,
          current_period_start: "2026-01-01", current_period_end: "2026-02-01", created_at: "2026-01-01" },
      ]),
    } as Response));

    render(<AdminSubscriptions />);
    await waitFor(() => {
      expect(screen.getByText("starter")).toBeInTheDocument();
    });
  });

  it("renders table with subscription data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: "s1", client_id: "c1", email: "alice@hexawyn.com", product: "hexawyn", plan: "starter",
          status: "active", source: "polar", polar_subscription_id: null,
          current_period_start: "2026-01-01", current_period_end: "2026-02-01", created_at: "2026-01-01" },
      ]),
    } as Response));

    render(<AdminSubscriptions />);
    await waitFor(() => {
      expect(screen.getByText("starter")).toBeInTheDocument();
    });
  });
});

// ─── API Keys ───

describe("AdminApiKeys", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders table with api key data", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: "k1", client_id: "c1", email: "alice@hexawyn.com", product: "hexawyn", plan: "starter",
          key_prefix: "hxw_abc", machine_id: null, revoked_at: "2026-03-01", created_at: "2026-01-01" },
      ]),
    } as Response));

    render(<AdminApiKeys />);
    await waitFor(() => {
      expect(screen.getByText("hxw_abc")).toBeInTheDocument();
    });
  });

  it("revokes key and reloads list", async () => {
    let callCount = 0;
    const originalConfirm = window.confirm;
    window.confirm = vi.fn().mockReturnValue(true);

    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            { id: "k2", client_id: "c1", email: "bob@hexawyn.com", product: "hexawyn",
              plan: "team", key_prefix: "hxw_xyz", machine_id: null,
              revoked_at: null, created_at: "2026-01-01" },
          ]),
        } as Response);
      }
      // call #2 is the POST revoke
      if (callCount === 2) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ status: "revoked" }) } as Response);
      }
      // call #3 is the reload after revoke
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response);
    }));

    render(<AdminApiKeys />);
    await waitFor(() => {
      expect(screen.getByText("hxw_xyz")).toBeInTheDocument();
    });

    const revokeBtn = screen.getByText("Revoke");
    fireEvent.click(revokeBtn);
    await waitFor(() => {
      expect(screen.queryByText("Revoke")).not.toBeInTheDocument();
    });
    window.confirm = originalConfirm;
  });

  it("shows error when revoke fails", async () => {
    const originalConfirm = window.confirm;
    window.confirm = vi.fn().mockReturnValue(true);

    vi.stubGlobal("fetch", vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([
          { id: "k3", client_id: "c1", email: "test@hexawyn.com", product: "hexawyn",
            plan: "starter", key_prefix: "hxw_fail", machine_id: null,
            revoked_at: null, created_at: "2026-01-01" },
        ]),
      } as Response)
      .mockRejectedValueOnce(new Error("revoke failed"))
    );

    render(<AdminApiKeys />);
    await waitFor(() => {
      const revokeBtn = screen.getByText("Revoke");
      fireEvent.click(revokeBtn);
    });
    await waitFor(() => {
      expect(screen.getByText("revoke failed")).toBeInTheDocument();
    });
    window.confirm = originalConfirm;
  });

  it("shows error on initial load failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValueOnce(new Error("load error")));
    render(<AdminApiKeys />);
    await waitFor(() => {
      expect(screen.getByText("load error")).toBeInTheDocument();
    });
  });
});
