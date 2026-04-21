import { Link, useNavigate } from "@tanstack/react-router";
import {
  Sun,
  Moon,
  User as UserIcon,
  LogOut,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth, type Plan } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const planStyles: Record<Plan, string> = {
  free: "bg-muted text-muted-foreground border border-border",
  pro: "bg-primary/15 text-primary border border-primary/30",
  max: "bg-gradient-to-r from-primary to-amber-500 text-primary-foreground border-transparent",
};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className={cn("h-9 w-9", className)}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

export function PlanBadge({ plan }: { plan: Plan }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        planStyles[plan],
      )}
    >
      {plan}
    </span>
  );
}

export function ProfileMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button asChild variant="ghost" size="sm">
          <Link to="/login">Log in</Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/signup">Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full border border-border bg-card/60 py-1 pl-1 pr-3 transition-colors hover:bg-card">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/20 text-xs font-medium text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <PlanBadge plan={user.plan} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/upgrade" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Upgrade plan
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/upgrade" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
              navigate({ to: "/" });
            }}
            className="flex items-center gap-2 text-destructive"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-linear-to-br from-primary to-amber-600 font-mono text-sm font-bold text-primary-foreground shadow-sm">
        S
      </span>
      <span className="font-mono text-sm font-semibold tracking-tight">
        stitch
      </span>
    </Link>
  );
}
