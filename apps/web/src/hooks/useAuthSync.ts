// hooks/useAuthSync.ts
"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function useAuthSync() {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const synced = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || synced.current) return;

    const sync = async () => {
      const checkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        credentials: "include",
      });

      if (checkRes.ok) {
        synced.current = true;
        return;
      }
      const clerkToken = await getToken();
      const syncRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sync`, {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${clerkToken}` },
      });

      if (syncRes.ok) {
        synced.current = true;
      }
    };

    sync();
  }, [isSignedIn, isLoaded]);
}
