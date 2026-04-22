import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSignIn } from "@clerk/react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set new password — Archiq" },
      {
        name: "description",
        content: "Set a new password for your Archiq account.",
      },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isLoaded) return null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!signIn || !setActive) return;

    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Password updated successfully!");
        navigate({ to: "/dashboard" });
      } else if (result.status === "needs_second_factor") {
        toast.error("Two-factor authentication is required.");
      } else {
        toast.error("Password reset could not be completed.");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        "Invalid or expired reset code";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Enter the code from your email and pick a new password."
      footer={
        <Link
          to="/login"
          className="font-medium text-primary hover:underline"
        >
          Back to log in
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-code">Reset code</Label>
          <Input
            id="reset-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="123456"
            maxLength={6}
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reset-password">New password</Label>
          <Input
            id="reset-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder="At least 8 characters"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reset-confirm">Confirm password</Label>
          <Input
            id="reset-confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
            placeholder="Repeat your password"
            disabled={loading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Update password"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}
