import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn, useUser } from "@clerk/react";
import { toast } from "sonner";
import { GithubIcon } from "@/components/ui/github";

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
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(
    null,
  );

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate({ to: "/dashboard" });
    }
  }, [isLoaded, isSignedIn, navigate]);
  if (!isLoaded) return null;

  async function handleOAuthSignUp(strategy: "oauth_google" | "oauth_github") {
    if (!signIn) return;

    const provider = strategy === "oauth_google" ? "google" : "github";
    setOauthLoading(provider);

    const { error } = await signIn.sso({
      strategy,
      redirectUrl: "/dashboard",
      redirectCallbackUrl: "/sso-callback",
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error(error.message);
      setOauthLoading(null);
    }
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
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => handleOAuthSignUp("oauth_github")}
            disabled={oauthLoading !== null}
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => handleOAuthSignUp("oauth_google")}
            disabled={oauthLoading !== null}
          >
            <span className="font-mono text-xs">G</span> Google
          </Button>
        </div>
        <div id="clerk-captcha"></div>
      </div>
    </AuthLayout>
  );
}
