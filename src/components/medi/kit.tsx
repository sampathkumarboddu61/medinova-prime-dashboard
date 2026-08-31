import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Frosted glass surface used across every page. */
export function Glass({
  children,
  className,
  hover = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        "glass animate-slide-up rounded-2xl",
        hover && "glass-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
      <div className="min-w-0">
        <h2 className="truncate text-xl font-bold sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

type Tone = "primary" | "violet" | "pink" | "success" | "warning" | "danger" | "muted" | "info";

const toneClass: Record<Tone, string> = {
  primary: "bg-primary/15 text-primary border-primary/30",
  violet: "bg-violet/15 text-violet border-violet/30",
  pink: "bg-pink/15 text-pink border-pink/30",
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  danger: "bg-destructive/15 text-destructive border-destructive/30",
  info: "bg-info/15 text-info border-info/30",
  muted: "bg-muted text-muted-foreground border-border",
};

export function Pill({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  switch (status) {
    case "Stable":
    case "Confirmed":
    case "Paid":
    case "Available":
    case "Completed":
      return "success";
    case "Observation":
    case "Pending":
    case "Cleaning":
      return "warning";
    case "Critical":
    case "Overdue":
    case "Cancelled":
      return "danger";
    case "Occupied":
      return "info";
    default:
      return "muted";
  }
}

/** Animated number counter that runs once on mount. */
export function Counter({
  value,
  duration = 1400,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-IN", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function StatCard({
  icon,
  label,
  value,
  note,
  change,
  tone = "primary",
  delay = 0,
  prefix,
  suffix,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  note: string;
  change?: string;
  tone?: Tone;
  delay?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <Glass hover delay={delay} className="relative overflow-hidden p-5">
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-3xl opacity-40",
          tone === "primary" && "bg-primary",
          tone === "violet" && "bg-violet",
          tone === "pink" && "bg-pink",
          tone === "success" && "bg-success",
          tone === "warning" && "bg-warning",
        )}
      />
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-xl border",
            toneClass[tone],
          )}
        >
          {icon}
        </div>
        {change && <Pill tone={tone}>{change}</Pill>}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="font-display text-3xl font-bold tracking-tight">
        <Counter value={value} prefix={prefix ?? ""} suffix={suffix ?? ""} />
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </Glass>
  );
}

/** Accessible-ish glass modal with scale/fade transition. */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div
        className="absolute inset-0 animate-fade-in bg-background/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "glass animate-scale-in relative max-h-[88vh] w-full overflow-y-auto rounded-3xl p-6",
          wide ? "max-w-3xl" : "max-w-xl",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-bold">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-ring";

export function ActionButton({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97]",
        variant === "primary" &&
          "bg-gradient-brand text-primary-foreground shadow-[0_10px_30px_-12px_var(--primary)] hover:brightness-110 hover:shadow-[0_16px_40px_-12px_var(--primary)]",
        variant === "ghost" &&
          "border border-border bg-secondary/40 text-foreground hover:border-primary/40 hover:bg-secondary/70",
        variant === "danger" &&
          "border border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Animated progress bar. */
export function Bar({ value, tone = "primary" }: { value: number; tone?: Tone }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 120);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-1000 ease-out",
          tone === "primary" && "bg-gradient-brand",
          tone === "danger" && "bg-destructive",
          tone === "warning" && "bg-warning",
          tone === "success" && "bg-success",
        )}
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

export function TableWrap({ children }: { children: ReactNode }) {
  return (
    <Glass className="overflow-hidden">
      <div className="overflow-x-auto">{children}</div>
    </Glass>
  );
}
