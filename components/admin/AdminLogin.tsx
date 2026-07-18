"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface Props {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: Props): React.ReactElement {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (!expected || password !== expected) {
      setError("Invalid password");
      return;
    }
    sessionStorage.setItem("admin_token", expected);
    onLogin();
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-white/10 bg-navy/40 p-8"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 text-brand">
            <Icon name="lock" className="h-6 w-6" />
          </span>
          <h2 className="text-xl font-bold text-cloud">hexawyn Admin</h2>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="rounded-lg border border-white/10 bg-ink px-4 py-3 text-sm text-cloud placeholder:text-cloud/30 focus:border-brand/50 focus:outline-none"
          autoFocus
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand/90"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
