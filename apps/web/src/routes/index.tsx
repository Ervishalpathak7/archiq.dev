import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Sparkles, Zap, Layers, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Logo, ProfileMenu } from "@/components/header-bits";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stitch — Prompt to system architecture diagram" },
      {
        name: "description",
        content:
          "Describe your system in plain English and watch Stitch draw a complete architecture diagram in seconds.",
      },
      {
        property: "og:title",
        content: "Stitch — Prompt to system architecture diagram",
      },
      {
        property: "og:description",
        content:
          "Built for developers and engineering managers. Generate high-level designs from a prompt.",
      },
    ],
  }),
  component: Landing,
});

const examples = [
  "E-commerce backend with payments and inventory",
  "Real-time chat with presence and push",
  "Video streaming pipeline with transcoding",
  "AI inference API with vector search",
];

function Landing() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  function generate(text: string) {
    const value = text.trim();
    if (!value) return;
    const id = crypto.randomUUID().slice(0, 8);

    navigate({ to: "/design/$designId", params: { designId: id } });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="bg-grid-dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-120 bg-linear-to-b from-primary/10 via-transparent to-transparent" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link
            to="/upgrade"
            className="transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <a
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </a>
          <Link
            to="/dashboard"
            className="transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        </nav>
        <ProfileMenu />
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-24 text-center sm:pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-3 w-3 text-primary" />
          Prompt → architecture, in seconds
        </div>
        <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Design your system,{" "}
          <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
            from a single prompt
          </span>
          .
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          Stitch turns plain-English descriptions into high-level architecture
          diagrams — services, databases, queues, and the arrows between them.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            generate(prompt);
          }}
          className="mx-auto mt-10 w-full max-w-2xl rounded-2xl border border-border bg-card/80 p-2 shadow-2xl shadow-primary/5 backdrop-blur"
        >
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the system you want to design..."
            className="min-h-[120px] resize-none border-0 bg-transparent font-mono text-sm shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-2">
            <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
              ⌘ + Enter to generate
            </span>
            <Button type="submit" disabled={!prompt.trim()} className="gap-2">
              Generate <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => generate(ex)}
              className="rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>
      </main>

      <section
        id="features"
        className="relative z-10 mx-auto grid max-w-5xl gap-4 px-6 pb-20 sm:grid-cols-3"
      >
        {[
          {
            icon: Zap,
            title: "Instant diagrams",
            body: "From idea to a clean diagram in under five seconds. Iterate with follow-up prompts.",
          },
          {
            icon: Layers,
            title: "Drop-in components",
            body: "Add caches, queues, and services from a curated palette. Drag to reposition.",
          },
          {
            icon: Share2,
            title: "Share with the team",
            body: "Export and share designs so engineers and managers stay aligned.",
          },
        ].map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card/60 p-5"
          >
            <Icon className="mb-3 h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <span>· © {new Date().getFullYear()} Stitch</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/upgrade" className="hover:text-foreground">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
