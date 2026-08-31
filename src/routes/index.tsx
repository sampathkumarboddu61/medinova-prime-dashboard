import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ActivitySquare,
  BedDouble,
  CalendarCheck,
  HeartPulse,
  Stethoscope,
  Users,
} from "lucide-react";
import { Bar, Glass, Pill, SectionTitle, StatCard, statusTone } from "@/components/medi/kit";
import { useStore } from "@/lib/store";
import { DEPARTMENT_STATS, DOCTORS } from "@/lib/hospital-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — MediNova Hospital Management" },
      {
        name: "description",
        content:
          "Live hospital overview: patients, doctors on duty, today's appointments and bed availability at MediNova.",
      },
      { property: "og:title", content: "Dashboard — MediNova Hospital Management" },
      {
        property: "og:description",
        content: "Live hospital overview of patients, doctors, appointments and beds.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { patients, appointments } = useStore();
  const today = new Date().toISOString().slice(0, 10);
  const todays = appointments.filter((a) => a.date === today);

  return (
    <>
      {/* Hero */}
      <Glass className="relative overflow-hidden p-6 sm:p-9">
        <div className="animate-float pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-violet/25 blur-[90px]" />
        <div className="animate-float pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-primary/25 blur-[90px] [animation-delay:-6s]" />
        <div className="relative max-w-2xl">
          <Pill tone="primary">
            <HeartPulse className="h-3.5 w-3.5" /> Healthcare, Reimagined.
          </Pill>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Good Morning, Admin <span className="animate-pulse-glow inline-block">👋</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Manage your hospital operations smarter, faster and more efficiently.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/patients"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-14px_var(--primary)] transition-all hover:brightness-110 active:scale-[0.97]"
            >
              <Users className="h-4 w-4" /> Add New Patient
            </Link>
            <Link
              to="/appointments"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-5 py-3 text-sm font-semibold transition-all hover:border-primary/50 active:scale-[0.97]"
            >
              <CalendarCheck className="h-4 w-4" /> Schedule Appointment
            </Link>
          </div>
        </div>
      </Glass>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Total Patients"
          value={2486}
          note="Across all departments"
          change="+12.5%"
          tone="primary"
          delay={0}
        />
        <StatCard
          icon={<Stethoscope className="h-5 w-5" />}
          label="Available Doctors"
          value={64}
          note="On duty right now"
          change="+4 new"
          tone="violet"
          delay={80}
        />
        <StatCard
          icon={<CalendarCheck className="h-5 w-5" />}
          label="Today's Appointments"
          value={128}
          note="18 pending confirmation"
          change="+8.2%"
          tone="pink"
          delay={160}
        />
        <StatCard
          icon={<BedDouble className="h-5 w-5" />}
          label="Available Beds"
          value={42}
          note="7 critical care occupied"
          change="-3 today"
          tone="success"
          delay={240}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {/* Recent patients */}
        <Glass className="p-5 xl:col-span-2">
          <SectionTitle
            title="Recent Admissions"
            subtitle="Latest patients registered in the system"
            action={
              <Link to="/patients" className="text-sm font-semibold text-primary hover:underline">
                View all
              </Link>
            }
          />
          <ul className="mt-5 space-y-2">
            {patients.slice(0, 5).map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-transparent bg-secondary/30 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/30"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-primary-foreground">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {p.department} · {p.doctor}
                    </p>
                  </div>
                </div>
                <Pill tone={statusTone(p.status)}>{p.status}</Pill>
              </li>
            ))}
          </ul>
        </Glass>

        {/* Today schedule */}
        <Glass className="p-5">
          <SectionTitle title="Today's Schedule" subtitle={`${todays.length} appointments`} />
          <ul className="mt-5 space-y-3">
            {(todays.length ? todays : []).slice(0, 5).map((a) => (
              <li key={a.id} className="rounded-xl bg-secondary/30 p-3 transition-colors hover:bg-secondary/60">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{a.patient}</p>
                  <span className="shrink-0 text-xs font-bold text-primary">{a.time}</span>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {a.doctor} · {a.type}
                </p>
              </li>
            ))}
            {todays.length === 0 && (
              <li className="rounded-xl bg-secondary/30 p-4 text-sm text-muted-foreground">
                No appointments scheduled today.
              </li>
            )}
          </ul>
        </Glass>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <Glass className="p-5 xl:col-span-2">
          <SectionTitle title="Department Occupancy" subtitle="Live bed utilisation" />
          <div className="mt-5 space-y-4">
            {DEPARTMENT_STATS.slice(0, 5).map((d) => (
              <div key={d.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="truncate font-medium">{d.name}</span>
                  <span className="text-muted-foreground">{d.occupancy}%</span>
                </div>
                <Bar
                  value={d.occupancy}
                  tone={d.occupancy > 85 ? "danger" : d.occupancy > 70 ? "warning" : "primary"}
                />
              </div>
            ))}
          </div>
        </Glass>

        <Glass className="p-5">
          <SectionTitle title="Top Doctors" subtitle="By patient load" />
          <ul className="mt-5 space-y-3">
            {DOCTORS.slice(0, 4).map((d) => (
              <li key={d.name} className="flex min-w-0 items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
                  {d.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{d.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{d.specialization}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {d.patients}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-primary/10 p-3 text-xs text-muted-foreground">
            <ActivitySquare className="h-4 w-4 shrink-0 text-primary" />
            All systems operational · Last sync just now
          </div>
        </Glass>
      </div>
    </>
  );
}
