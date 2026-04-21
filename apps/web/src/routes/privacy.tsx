import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo, ThemeToggle } from "@/components/header-bits";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Stitch" },
      { name: "description", content: "How Stitch collects, uses, and protects your information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-base font-semibold">Information we collect</h2>
            <p className="mt-2 text-muted-foreground">
              Account details (name, email), prompts you submit, and the diagrams you generate. We use
              this to operate and improve Stitch.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold">How we use information</h2>
            <p className="mt-2 text-muted-foreground">
              To provide the service, troubleshoot issues, and — only with your consent — improve
              future versions of our generation models.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold">Sharing</h2>
            <p className="mt-2 text-muted-foreground">
              We do not sell personal information. We share data with infrastructure providers solely
              to deliver the service.
            </p>
          </section>
          <section>
            <h2 className="text-base font-semibold">Your rights</h2>
            <p className="mt-2 text-muted-foreground">
              You can request a copy of your data or deletion at any time by emailing
              privacy@stitch.example.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
