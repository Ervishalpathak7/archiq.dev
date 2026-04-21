import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Github, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useSignIn } from "@clerk/react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Stitch" },
      {
        name: "description",
        content:
          "Log in to your Stitch account to design system architectures.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useSignIn();
  const { isLoaded } = useAuth();
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isLoaded) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      toast.error(error.message);
      console.log(error);
      setLoading(false);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => {
          toast.success("Welcome back!");
          navigate({ to: "/dashboard" });
        },
      });
    } else {
      console.error("Unexpected status:", signIn.status);
      toast.error("Login not complete");
    }
    setLoading(false);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue designing"
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => toast.info("Mock only — wire up later")}
          >
            <Github className="h-4 w-4" /> GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => toast.info("Mock only — wire up later")}
          >
            <span className="font-mono text-xs">G</span> Google
          </Button>
        </div>
        <div className="relative my-2 flex items-center">
          <div className="flex-1 border-t border-border" />
          <span className="px-3 font-mono text-xs uppercase text-muted-foreground">
            or
          </span>
          <div className="flex-1 border-t border-border" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
