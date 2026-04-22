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
import { useAuth, useUser } from "@clerk/react";
import { type Plan } from "@/types";

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
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />{" "}
      </div>
    );
  }

  if (!isSignedIn) {
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

  const initials = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "?";

  const email = user.emailAddresses[0].emailAddress;
  const plan = (user?.publicMetadata?.plan as Plan) ?? "free";

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle className="cursor-pointer" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full border border-border bg-card/60 py-1 pl-1 pr-3 transition-colors hover:bg-card cursor-pointer">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/20 text-xs font-medium text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <PlanBadge plan={plan} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-sm font-medium">{user?.firstName}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {email}
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
      <span className="font-mono text-sm font-semibold tracking-tight">
        Archiq
      </span>
    </Link>
  );
}
