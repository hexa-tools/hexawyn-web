import { redirect } from "next/navigation";

const PLANS = [
  { name: "Starter", value: "starter", price: "$19" },
  { name: "Team", value: "team", price: "$99" },
  { name: "Scale-up", value: "scale-up", price: "$199" },
];

interface Props {
  searchParams: Promise<{ key?: string }>;
}

export default async function ManagePage({ searchParams }: Props): Promise<React.ReactElement> {
  const { key } = await searchParams;
  const baseUrl = process.env.NEXT_PUBLIC_HEXA_CLOUD_URL || "https://api.hexawyn.com";

  if (!key || !key.startsWith("hxw_")) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-navy/40 p-8 text-center">
          <h2 className="text-xl font-bold text-cloud">Manage Subscription</h2>
          <p className="mt-4 text-cloud/60">
            Open this page via the hexawyn CLI (Ctrl+B) or your welcome email.
          </p>
        </div>
      </div>
    );
  }

  let currentPlan = "free";
  let error: string | null = null;

  try {
    const resp = await fetch(`${baseUrl}/api/v1/billing/plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: key }),
      signal: AbortSignal.timeout(5000),
    });
    if (resp.ok) {
      const data = await resp.json();
      currentPlan = data.plan || "free";
    } else {
      error = "Could not fetch your plan. The API may be temporarily unavailable.";
    }
  } catch {
    error = "Could not reach the API. Please try again later.";
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-navy/40 p-8 text-center">
          <h2 className="text-xl font-bold text-red-400">Error</h2>
          <p className="mt-4 text-cloud/60">{error}</p>
        </div>
      </div>
    );
  }

  const upgrades = PLANS.filter(
    (p) => PLANS.findIndex((x) => x.value === p.value) > PLANS.findIndex((x) => x.value === currentPlan)
  );

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-navy/40 p-8">
        <h2 className="text-2xl font-bold tracking-tight text-cloud">
          Manage Your Subscription
        </h2>

        <div className="mt-6 rounded-xl border border-brand/20 bg-brand/[0.06] p-5">
          <p className="text-sm text-cloud/50">Current plan</p>
          <p className="mt-1 text-2xl font-bold text-brand">
            {PLANS.find((p) => p.value === currentPlan)?.name || currentPlan}
          </p>
          <p className="mt-1 text-sm text-cloud/50">
            Your API key: {key.slice(0, 16)}...
          </p>
        </div>

        {upgrades.length > 0 ? (
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-sm font-medium text-cloud/50">Available upgrades</p>
            {upgrades.map((plan) => (
              <form
                key={plan.value}
                action={`${baseUrl}/api/v1/billing/upgrade`}
                method="POST"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-brand/40"
              >
                <input type="hidden" name="api_key" value={key} />
                <input type="hidden" name="plan" value={plan.value} />
                <div>
                  <p className="font-semibold text-cloud">{plan.name}</p>
                  <p className="text-sm text-cloud/40">{plan.price}/month</p>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
                >
                  Upgrade
                </button>
              </form>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-cloud/40">
            You are on the highest available plan. Need more?{" "}
            <a href="mailto:support@hexawyn.com" className="text-brand underline">
              Contact us
            </a>
            .
          </p>
        )}
      </div>
    </div>
  );
}
