import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAuth, useSignIn } from "@clerk/react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot password — Archiq" },
      { name: "description", content: "Reset your Archiq password." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { signIn } = useSignIn();
  const { isLoaded } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isLoaded) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!signIn) return;
    setLoading(true);

    try {
      // Initiate the password reset flow via Clerk
      await signIn.resetPasswordEmailCode.sendCode();
      setSent(true);
      toast.success("If an account exists, a reset code has been sent.");
    } catch (err: any) {
      // Deliberately vague to prevent email enumeration attacks
      const code = err?.errors?.[0]?.code;
      if (code === "form_identifier_not_found") {
        // Don't reveal that the email doesn't exist
        setSent(true);
        toast.success("If an account exists, a reset code has been sent.");
      } else {
        const message =
          err?.errors?.[0]?.longMessage ||
          err?.errors?.[0]?.message ||
          "Something went wrong. Please try again.";
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title={sent ? "Check your email" : "Reset your password"}
      subtitle={
        sent
          ? `We sent a reset code to ${email}`
          : "Enter your email and we'll send a reset code."
      }
      footer={
        <>
          Remembered it?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Back to log in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
          <p className="text-sm text-muted-foreground">
            Enter the code from your email on the next page to set a new
            password. The code expires in 10 minutes.
          </p>
          <Button
            className="mt-2 w-full"
            onClick={() => navigate({ to: "/reset-password" })}
          >
            Enter reset code
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forgot-email">Email</Label>
            <Input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Send reset code"
            )}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
