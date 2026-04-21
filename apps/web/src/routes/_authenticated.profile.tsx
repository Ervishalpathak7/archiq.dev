import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import { Logo, ProfileMenu, PlanBadge } from "@/components/header-bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Stitch" },
      {
        name: "description",
        content: "Manage your Stitch profile and account settings.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  if (!user) return null;
  const initials = user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Profile updated");
  }

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

      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your account details.
        </p>

        <div className="mt-8 flex items-center gap-4 rounded-xl border border-border bg-card/60 p-5">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary/20 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <PlanBadge plan={user.plan} />
        </div>

        <form
          onSubmit={save}
          className="mt-6 space-y-4 rounded-xl border border-border bg-card/60 p-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save changes</Button>
          </div>
        </form>

        <div className="mt-6 rounded-xl border border-border bg-card/60 p-6">
          <h2 className="text-sm font-semibold">Plan</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            You are on the{" "}
            <span className="font-medium text-foreground">
              {user.plan.toUpperCase()}
            </span>{" "}
            plan.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-3">
            <Link to="/upgrade">Manage plan</Link>
          </Button>
        </div>

        <div className="mt-6 rounded-xl border border-destructive/40 bg-destructive/5 p-6">
          <h2 className="text-sm font-semibold text-destructive">
            Danger zone
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign out of this session.
          </p>
          <Button
            variant="destructive"
            size="sm"
            className="mt-3 gap-2"
            onClick={async () => {
              await signOut();
              navigate({ to: "/" });
            }}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </main>
    </div>
  );
}
