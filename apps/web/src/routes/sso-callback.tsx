import { createFileRoute } from "@tanstack/react-router";
import { AuthenticateWithRedirectCallback } from "@clerk/react";

export const Route = createFileRoute("/sso-callback")({
  component: AuthCallbackComponent,
});

function AuthCallbackComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <AuthenticateWithRedirectCallback
          signInFallbackRedirectUrl={"/login"}
          signUpFallbackRedirectUrl={"/signup"}
        />
        <p className="text-sm text-muted-foreground">Signing you in...</p>
      </div>
    </div>
  );
}
