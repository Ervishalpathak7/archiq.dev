import { useUser, useAuth as useClerkAuth } from "@clerk/react";
import * as React from "react";

export type Plan = "free" | "pro" | "max";

export type User = {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  avatarUrl?: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerkAuth();

  const mappedUser: User | null =
    isSignedIn && user
      ? {
          id: user.id,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          email: user.primaryEmailAddress?.emailAddress ?? "",
          avatarUrl: user.imageUrl,
          plan: "free",
        }
      : null;

  const value: AuthContextValue = {
    user: mappedUser,
    loading: !isLoaded,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/* ---------- Designs — re-exported from lib/designs.ts ---------- */
export {
  type DesignSummary,
  loadDesigns,
  saveDesign,
  getDesign,
  deleteDesign,
} from "./designs";
