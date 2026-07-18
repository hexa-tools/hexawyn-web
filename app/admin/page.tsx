"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchStats } from "@/lib/admin";

interface Stats {
  clients: number;
  active_subscriptions: number;
  api_keys: number;
}

export default function AdminDashboard(): React.ReactElement {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }
  if (!stats) {
    return <p className="text-cloud/50">Loading...</p>;
  }

  const cards = [
    { label: "Clients", value: stats.clients, href: "/admin/clients" },
    {
      label: "Active Subscriptions",
      value: stats.active_subscriptions,
      href: "/admin/subscriptions",
    },
    { label: "API Keys", value: stats.api_keys, href: "/admin/api-keys" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-cloud">
        Dashboard
      </h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-navy/40 p-6 transition-colors hover:border-brand/40"
          >
            <span className="text-3xl font-bold text-cloud">{card.value}</span>
            <span className="text-sm text-cloud/60">{card.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
