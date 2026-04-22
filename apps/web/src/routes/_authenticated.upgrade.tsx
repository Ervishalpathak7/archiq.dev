import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, ArrowLeft } from "lucide-react";
import { Logo, ProfileMenu } from "@/components/header-bits";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Plan } from "@/types";
import { useUser } from "@clerk/react";

export const Route = createFileRoute("/_authenticated/upgrade")({
  head: () => ({
    meta: [
      { title: "Upgrade plan — Archiq" },
      {
        name: "description",
        content: "Pick a Archiq plan that fits your workflow.",
      },
    ],
  }),
  component: UpgradePage,
});

const tiers: {
  id: Plan;
  name: string;
  price: string;
  period: string;
  highlight?: boolean;
  features: string[];
}[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "10 designs / month",
      "Public sharing",
      "Basic component palette",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "per month",
    highlight: true,
    features: [
      "Unlimited designs",
      "Private projects",
      "Full component palette",
      "Export PNG / SVG",
      "Priority generation",
    ],
  },
  {
    id: "max",
    name: "Max",
    price: "$49",
    period: "per month",
    features: [
      "Everything in Pro",
      "Team workspaces (5 seats)",
      "Version history",
      "API access",
      "SSO + SOC 2 (early access)",
      "Dedicated support",
    ],
  },
];

function UpgradePage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-4">
          <Logo />
          <Link
            to="/dashboard"
            className="hidden items-center gap-1 text-xs text-muted-foreground hover:text-foreground sm:flex"
          >
            <ArrowLeft className="h-3 w-3" /> Dashboard
          </Link>
        </div>
        <ProfileMenu />
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            Pricing
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Pick a plan
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start free. Upgrade as your team grows.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tiers.map((t) => {
            const current = (user?.publicMetadata.plan as Plan) === t.id;
            return (
              <div
                key={t.id}
                className={cn(
                  "relative rounded-2xl border bg-card/60 p-6",
                  t.highlight
                    ? "border-primary/50 shadow-xl shadow-primary/10"
                    : "border-border",
                )}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-3xl font-semibold">{t.price}</span>
                  <span className="pb-1 text-xs text-muted-foreground">
                    {t.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-2">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={t.highlight ? "default" : "outline"}
                  disabled={current}
                  onClick={() => {
                    toast.info(`Plan Switching Not working for now `);
                  }}
                >
                  {current ? "Current plan" : `Switch to ${t.name}`}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Plans are switchable in this demo to preview the badge — no real
          billing.
        </p>
      </main>
    </div>
  );
}
