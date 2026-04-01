// app/providers.tsx — add the hook here
"use client";
import { useAuthSync } from "@/hooks/useAuthSync";
import { ClerkProvider } from "@clerk/nextjs";

function AuthSync({ children }: { children: React.ReactNode }) {
  useAuthSync(); // runs after every login
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <AuthSync>{children}</AuthSync>
    </ClerkProvider>
  );
}