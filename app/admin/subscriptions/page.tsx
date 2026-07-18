"use client";

import { useEffect, useState } from "react";
import { fetchSubscriptions } from "@/lib/admin";

interface Sub {
  id: string;
  email: string;
  product: string;
  plan: string;
  status: string;
  source: string;
  polar_subscription_id: string | null;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}

export default function AdminSubscriptions(): React.ReactElement {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubscriptions()
      .then(setSubs)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-cloud">
        Subscriptions
      </h1>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-cloud/50">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Period</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr
                key={s.id}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3 text-cloud">{s.email}</td>
                <td className="px-4 py-3 text-cloud/70">{s.product}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-brand/15 px-2 py-0.5 text-xs font-medium text-brand">
                    {s.plan}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      s.status === "active"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : s.status === "canceled"
                        ? "bg-red-500/15 text-red-400"
                        : "bg-yellow-500/15 text-yellow-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-cloud/50">
                  {s.source === "polar" ? "Polar.sh" : s.source}
                </td>
                <td className="px-4 py-3 text-cloud/50 text-xs">
                  {s.current_period_start?.slice(0, 10)} →{" "}
                  {s.current_period_end?.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
