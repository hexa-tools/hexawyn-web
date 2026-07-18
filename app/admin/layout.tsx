"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminLogin } from "@/components/admin/AdminLogin";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
  { href: "/admin/api-keys", label: "API Keys" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [authenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (expected && token === expected) {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-white/10 bg-navy/60 px-4 py-6">
        <Link href="/admin" className="mb-4 text-lg font-bold tracking-tight text-brand">
          hexawyn Admin
        </Link>
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              pathname === item.href
                ? "bg-brand/15 font-semibold text-brand"
                : "text-cloud/60 hover:text-cloud"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={() => {
            sessionStorage.removeItem("admin_token");
            setAuthenticated(false);
          }}
          className="mt-auto rounded-lg px-3 py-2 text-left text-sm text-cloud/40 hover:text-red-400"
        >
          Sign out
        </button>
      </aside>
      <main className="flex-1 overflow-auto px-8 py-6">{children}</main>
    </div>
  );
}
