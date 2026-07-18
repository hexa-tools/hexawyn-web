const ADMIN_API = process.env.NEXT_PUBLIC_HEXA_CLOUD_URL || "https://api.hexawyn.com";

function headers(): HeadersInit {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("admin_token") || "" : "";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchStats(): Promise<{
  clients: number;
  active_subscriptions: number;
  api_keys: number;
}> {
  const res = await fetch(`${ADMIN_API}/api/v1/admin/stats`, { headers: headers() });
  if (!res.ok) throw new Error(`Admin API: ${res.status}`);
  return res.json();
}

export async function fetchClients(): Promise<
  { id: string; email: string; plan: string; status: string; created_at: string }[]
> {
  const res = await fetch(`${ADMIN_API}/api/v1/admin/clients`, { headers: headers() });
  if (!res.ok) throw new Error(`Admin API: ${res.status}`);
  return res.json();
}

export async function fetchSubscriptions(): Promise<
  {
    id: string;
    client_id: string;
    email: string;
    product: string;
    plan: string;
    status: string;
    source: string;
    polar_subscription_id: string | null;
    current_period_start: string;
    current_period_end: string;
    created_at: string;
  }[]
> {
  const res = await fetch(`${ADMIN_API}/api/v1/admin/subscriptions`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error(`Admin API: ${res.status}`);
  return res.json();
}

export async function revokeApiKey(id: string): Promise<{ status: string }> {
  const res = await fetch(`${ADMIN_API}/api/v1/admin/api-keys/${id}/revoke`, {
    method: "POST",
    headers: headers(),
  });
  if (!res.ok) throw new Error(`Admin API: ${res.status}`);
  return res.json();
}

export async function fetchApiKeys(): Promise<
  {
    id: string;
    client_id: string;
    email: string;
    product: string;
    plan: string;
    key_prefix: string;
    machine_id: string | null;
    revoked_at: string | null;
    created_at: string;
  }[]
> {
  const res = await fetch(`${ADMIN_API}/api/v1/admin/api-keys`, { headers: headers() });
  if (!res.ok) throw new Error(`Admin API: ${res.status}`);
  return res.json();
}
