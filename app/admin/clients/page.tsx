"use client";

import { useEffect, useState } from "react";
import { fetchClients } from "@/lib/admin";

interface Client {
  id: string;
  email: string;
  plan: string;
  status: string;
  created_at: string;
}

export default function AdminClients(): React.ReactElement {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients()
      .then(setClients)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-cloud">
        Clients
      </h1>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-cloud/50">
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Plan</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr
                key={c.id}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3 text-cloud">{c.email}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-xs font-medium text-brand">
                    {c.plan}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      c.status === "active"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-cloud/50">
                  {c.created_at.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
