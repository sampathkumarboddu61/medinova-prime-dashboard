import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BedDouble,
  Bell,
  Building2,
  CalendarDays,
  CreditCard,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Pill as PillIcon,
  PieChart,
  Search,
  Settings as SettingsIcon,
  Stethoscope,
  Sun,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/departments", label: "Departments", icon: Building2 },
  { to: "/rooms", label: "Rooms & Beds", icon: BedDouble },
  { to: "/pharmacy", label: "Pharmacy", icon: PillIcon },
  { to: "/billing", label: "Billing", icon: CreditCard },
  { to: "/laboratory", label: "Laboratory", icon: FlaskConical },
  { to: "/reports", label: "Reports", icon: PieChart },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

function Orbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="animate-float absolute -left-24 top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="animate-float absolute right-[-8rem] top-1/4 h-[24rem] w-[24rem] rounded-full bg-violet/20 blur-[130px] [animation-delay:-4s]" />
      <div className="animate-float absolute bottom-[-10rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-pink/15 blur-[130px] [animation-delay:-8s]" />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="animate-pulse-glow grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand shadow-[0_10px_30px_-10px_var(--primary)]">
        <Activity className="h-5 w-5 text-primary-foreground" />
      </div>
      <div className="min-w-0">
        <p className="truncate font-display text-lg font-bold leading-none">MediNova</p>
        <p className="mt-1 truncate text-[11px] text-muted-foreground">Healthcare, Reimagined.</p>
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useRouterState({ select: (s) => s.location });
  const { theme, toggleTheme, settings } = useStore();

  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <Logo />

      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                active
                  ? "bg-primary/12 text-foreground shadow-[inset_0_0_0_1px_var(--glass-border)]"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-brand" />
              )}
              <Icon
                className={cn(
                  "h-4.5 w-4.5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                  active && "text-primary",
                )}
              />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex min-w-0 items-center gap-3 rounded-xl bg-secondary/40 p-2.5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground">
            NK
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{settings.adminName}</p>
            <p className="truncate text-[11px] text-muted-foreground">{settings.adminRole}</p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-secondary/30 px-3 py-2.5 text-sm transition-colors hover:border-primary/40"
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </span>
          <span className="relative h-5 w-9 rounded-full bg-muted">
            <span
              className={cn(
                "absolute top-0.5 h-4 w-4 rounded-full bg-gradient-brand transition-all duration-300",
                theme === "dark" ? "left-0.5" : "left-4.5",
              )}
            />
          </span>
        </button>

        <button
          onClick={() => toast.success("Signed out", { description: "See you soon, Admin." })}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );
}

function Topbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pathname } = useRouterState({ select: (s) => s.location });
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const title = NAV.find((n) => n.to === pathname)?.label ?? "Dashboard";

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <header className="glass sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-3 lg:flex lg:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
          <p className="truncate text-[11px] text-muted-foreground">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients, doctors…"
            className="w-56 rounded-xl border border-input bg-secondary/40 py-2.5 pl-9 pr-3 text-sm outline-none transition-all focus:w-72 focus:border-primary/60 focus:ring-2 focus:ring-ring"
          />
        </div>
        {[
          { icon: Bell, count: 5, label: "Notifications" },
          { icon: MessageSquare, count: 2, label: "Messages" },
        ].map(({ icon: Icon, count, label }) => (
          <button
            key={label}
            aria-label={label}
            onClick={() => toast(`${count} new ${label.toLowerCase()}`)}
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/30 transition-colors hover:border-primary/40"
          >
            <Icon className="h-4.5 w-4.5" />
            <span className="absolute -right-1 -top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-pink px-1 text-[10px] font-bold text-primary-foreground">
              {count}
            </span>
          </button>
        ))}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/30 px-2 py-1.5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-brand text-[11px] font-bold text-primary-foreground">
            NK
          </div>
          <span className="hidden text-sm font-medium sm:block">Admin</span>
        </div>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Orbs />

      {/* Desktop sidebar */}
      <aside className="glass fixed inset-y-0 left-0 z-50 hidden w-[264px] rounded-none border-y-0 border-l-0 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div
            className="absolute inset-0 animate-fade-in bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="glass animate-slide-up absolute inset-y-0 left-0 w-[85vw] max-w-[300px] rounded-r-3xl">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-full border border-border"
            >
              <X className="h-4 w-4" />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="relative lg:pl-[264px]">
        <div className="mx-auto max-w-[1500px] space-y-6 p-3 sm:p-5 lg:p-7">
          <Topbar onOpenMenu={() => setOpen(true)} />
          <main className="space-y-6 pb-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
