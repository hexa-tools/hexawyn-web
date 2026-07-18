"use client";

import { useEffect, useState } from "react";
import { fetchApiKeys, revokeApiKey } from "@/lib/admin";

interface ApiKey {
  id: string;
  client_id: string;
  email: string;
  product: string;
  plan: string;
  key_prefix: string;
  machine_id: string | null;
  revoked_at: string | null;
  created_at: string;
}

export default function AdminApiKeys(): React.ReactElement {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      setKeys(await fetchApiKeys());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleRevoke(id: string) {
    if (!confirm("Revoke this API key? This cannot be undone.")) return;
    try {
      await revokeApiKey(id);
      load();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to revoke");
    }
  }

  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-cloud">
        API Keys
      </h1>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-cloud/50">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Prefix</th>
              <th className="px-4 py-3 font-medium">Machine</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr
                key={k.id}
                className={`border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
                  k.revoked_at ? "opacity-50" : ""
                }`}
              >
                <td className="px-4 py-3 text-cloud">{k.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-xs font-medium text-brand">
                    {k.plan}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-cloud/70">
                  {k.key_prefix}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-cloud/40">
                  {k.machine_id || "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      k.revoked_at
                        ? "bg-red-500/15 text-red-400"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    {k.revoked_at ? "revoked" : "active"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {!k.revoked_at && (
                    <button
                      onClick={() => handleRevoke(k.id)}
                      className="rounded-lg border border-red-500/30 px-3 py-1 text-xs text-red-400 hover:bg-red-500/10"
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
