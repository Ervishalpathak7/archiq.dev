import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { Logo, ThemeToggle } from "@/components/header-bits";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="bg-grid-dots pointer-events-none absolute inset-0 opacity-30" />
      <header className="relative z-10 flex items-center justify-between px-6 py-5">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="rounded-xl border border-border bg-card/80 p-6 shadow-xl shadow-black/20 backdrop-blur">
            {children}
          </div>
          {footer && <div className="mt-4 text-center text-sm text-muted-foreground">{footer}</div>}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link to="/terms" className="underline-offset-2 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
