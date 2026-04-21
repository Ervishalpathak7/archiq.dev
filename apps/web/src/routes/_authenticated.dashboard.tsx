import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Plus,
  Settings,
  ArrowRight,
  FolderOpen,
  Search,
  Trash2,
} from "lucide-react";
import { Logo, ProfileMenu } from "@/components/header-bits";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  loadDesigns,
  saveDesign,
  deleteDesign,
  type DesignSummary,
} from "@/lib/designs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { isToday, isThisWeek } from "date-fns";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Stitch" },
      {
        name: "description",
        content: "Your designs and a prompt to start a new one.",
      },
    ],
  }),
  component: DashboardPage,
});

const examples = [
  "Multi-tenant SaaS with billing and webhooks",
  "Real-time collaborative document editor",
  "IoT telemetry pipeline with time-series storage",
  "RAG chatbot with vector search and analytics",
];

function groupByDate(designs: DesignSummary[]) {
  const today: DesignSummary[] = [];
  const week: DesignSummary[] = [];
  const older: DesignSummary[] = [];
  for (const d of designs) {
    const date = new Date(d.createdAt);
    if (isToday(date)) today.push(d);
    else if (isThisWeek(date, { weekStartsOn: 1 })) week.push(d);
    else older.push(d);
  }
  return { today, week, older };
}

function DashboardPage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [designs, setDesigns] = useState<DesignSummary[]>([]);
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setDesigns(loadDesigns());
  }, []);

  function refresh() {
    setDesigns(loadDesigns());
  }

  function generate(text: string) {
    const value = text.trim();
    if (!value) return;
    const id = crypto.randomUUID().slice(0, 8);
    saveDesign({
      id,
      title: value.slice(0, 60),
      prompt: value,
      createdAt: Date.now(),
    });
    navigate({ to: "/design/$designId", params: { designId: id } });
  }

  function remove(id: string) {
    deleteDesign(id);
    refresh();
    toast.success("Design deleted");
  }

  const filtered = designs.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()),
  );
  const grouped = groupByDate(filtered);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar md:flex",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex items-center justify-between px-4 py-5">
          {!collapsed && <Logo />}
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Toggle sidebar"
          >
            <ArrowRight
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed ? "" : "rotate-180",
              )}
            />
          </button>
        </div>
        <div className="px-3">
          <Button
            onClick={() => document.getElementById("dash-prompt")?.focus()}
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" /> {!collapsed && "New design"}
          </Button>
        </div>
        {!collapsed && (
          <div className="mt-4 px-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="h-8 pl-7 text-xs"
              />
            </div>
          </div>
        )}
        <div className="mt-4 flex-1 overflow-y-auto px-3 pb-4">
          {!collapsed &&
            (
              [
                ["Today", grouped.today],
                ["Past 7 days", grouped.week],
                ["Older", grouped.older],
              ] as const
            ).map(([label, list]) =>
              list.length === 0 ? null : (
                <div key={label} className="mb-4">
                  <p className="px-2 pb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <ul className="space-y-0.5">
                    {list.map((d) => (
                      <li key={d.id}>
                        <Link
                          to="/design/$designId"
                          params={{ designId: d.id }}
                          className="group flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-foreground/80 hover:bg-sidebar-accent hover:text-foreground"
                        >
                          <span className="truncate">{d.title}</span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              remove(d.id);
                            }}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          {!collapsed && designs.length === 0 && (
            <p className="px-2 text-xs text-muted-foreground">
              No designs yet. Create one →
            </p>
          )}
        </div>
        <div className="border-t border-border px-3 py-3">
          <Link
            to="/profile"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
              collapsed && "justify-center",
            )}
          >
            <Settings className="h-4 w-4" /> {!collapsed && "Settings"}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
          <div className="md:hidden">
            <Logo />
          </div>
          <div className="hidden md:block" />
          <ProfileMenu />
        </header>

        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What are you designing today?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Describe your system. Stitch will draw the architecture.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              generate(prompt);
            }}
            className="mx-auto mt-8 w-full max-w-2xl rounded-2xl border border-border bg-card/80 p-2 shadow-xl shadow-primary/5"
          >
            <Textarea
              id="dash-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A multi-tenant SaaS with auth, billing, background jobs, and webhooks..."
              className="min-h-[110px] resize-none border-0 bg-transparent font-mono text-sm shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center justify-end p-2">
              <Button type="submit" disabled={!prompt.trim()} className="gap-2">
                Generate <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => generate(ex)}
                className="rounded-full border border-border bg-card/50 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
              >
                {ex}
              </button>
            ))}
          </div>

          <div className="mt-16">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Recent designs
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {designs.length} total
              </span>
            </div>
            {designs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-12 text-center">
                <FolderOpen className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Your generated designs will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {designs.slice(0, 12).map((d) => (
                  <Link
                    key={d.id}
                    to="/design/$designId"
                    params={{ designId: d.id }}
                    className="group rounded-xl border border-border bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="bg-grid-dots mb-3 h-28 rounded-md border border-border opacity-60" />
                    <p className="line-clamp-2 text-sm font-medium">
                      {d.title}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      {new Date(d.createdAt).toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
