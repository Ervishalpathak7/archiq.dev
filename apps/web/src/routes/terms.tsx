import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, ThemeToggle } from "@/components/header-bits";
import { ReactNode } from "react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Archiq" },
      { name: "description", content: "The terms governing use of the Archiq platform." },
    ],
  }),
  component: TermsPage,
});

function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <Link to="/" className="font-mono text-xs text-muted-foreground hover:text-foreground">
          ← Back home
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose-Archiq mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
          {children}
        </div>
      </main>
    </div>
  );
}

function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <section>
        <h2 className="text-base font-semibold">1. Acceptance of terms</h2>
        <p className="mt-2 text-muted-foreground">
          By accessing or using Archiq, you agree to be bound by these Terms of Service. If you do not
          agree, do not use the service.
        </p>
      </section>
      <section>
        <h2 className="text-base font-semibold">2. Use of the service</h2>
        <p className="mt-2 text-muted-foreground">
          Archiq generates illustrative system architecture diagrams. Outputs are provided as-is and
          should be reviewed by a qualified engineer before being used in production planning.
        </p>
      </section>
      <section>
        <h2 className="text-base font-semibold">3. Accounts</h2>
        <p className="mt-2 text-muted-foreground">
          You are responsible for maintaining the confidentiality of your account credentials and for
          all activity that occurs under your account.
        </p>
      </section>
      <section>
        <h2 className="text-base font-semibold">4. Plans and billing</h2>
        <p className="mt-2 text-muted-foreground">
          Free, Pro, and Max plans are subject to the limits described on our pricing page. Paid plans
          renew automatically until cancelled.
        </p>
      </section>
      <section>
        <h2 className="text-base font-semibold">5. Termination</h2>
        <p className="mt-2 text-muted-foreground">
          We may suspend or terminate access at any time for violations of these terms.
        </p>
      </section>
      <section>
        <h2 className="text-base font-semibold">6. Contact</h2>
        <p className="mt-2 text-muted-foreground">Questions? Reach us at hello@Archiq.example.</p>
      </section>
    </LegalLayout>
  );
}

export { LegalLayout };
