import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SEED_APPOINTMENTS,
  SEED_PATIENTS,
  type Appointment,
  type AppointmentStatus,
  type Patient,
} from "./hospital-data";

/** Local persistence keys. */
const KEYS = {
  patients: "medinova.patients",
  appointments: "medinova.appointments",
  settings: "medinova.settings",
  theme: "medinova.theme",
};

export interface Settings {
  hospitalName: string;
  hospitalEmail: string;
  hospitalPhone: string;
  address: string;
  adminName: string;
  adminRole: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
  criticalAlerts: boolean;
  twoFactor: boolean;
  autoLogout: boolean;
  compactMode: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  hospitalName: "MediNova Multi-Speciality Hospital",
  hospitalEmail: "admin@medinova.health",
  hospitalPhone: "+91 22 4000 8800",
  address: "24 Marine Drive, Mumbai 400020",
  adminName: "Dr. Neel Kapoor",
  adminRole: "Chief Administrator",
  emailAlerts: true,
  smsAlerts: false,
  criticalAlerts: true,
  twoFactor: true,
  autoLogout: false,
  compactMode: false,
};

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

interface StoreValue {
  hydrated: boolean;
  patients: Patient[];
  appointments: Appointment[];
  settings: Settings;
  theme: "dark" | "light";
  toggleTheme: () => void;
  addPatient: (p: Omit<Patient, "id">) => void;
  updatePatient: (id: string, p: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  addAppointment: (a: Omit<Appointment, "id">) => void;
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updateSettings: (s: Partial<Settings>) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(SEED_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    setPatients(load(KEYS.patients, SEED_PATIENTS));
    setAppointments(load(KEYS.appointments, SEED_APPOINTMENTS));
    setSettings({ ...DEFAULT_SETTINGS, ...load(KEYS.settings, {}) });
    setTheme(load<"dark" | "light">(KEYS.theme, "dark"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEYS.patients, JSON.stringify(patients));
    localStorage.setItem(KEYS.appointments, JSON.stringify(appointments));
    localStorage.setItem(KEYS.settings, JSON.stringify(settings));
    localStorage.setItem(KEYS.theme, JSON.stringify(theme));
  }, [hydrated, patients, appointments, settings, theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const addPatient = useCallback((p: Omit<Patient, "id">) => {
    setPatients((prev) => [
      { ...p, id: `PT-${1050 + prev.length + Math.floor(Math.random() * 40)}` },
      ...prev,
    ]);
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      hydrated,
      patients,
      appointments,
      settings,
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      addPatient,
      updatePatient: (id, patch) =>
        setPatients((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))),
      deletePatient: (id) => setPatients((prev) => prev.filter((p) => p.id !== id)),
      addAppointment: (a) =>
        setAppointments((prev) => [
          { ...a, id: `AP-${3310 + prev.length + Math.floor(Math.random() * 40)}` },
          ...prev,
        ]),
      setAppointmentStatus: (id, status) =>
        setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a))),
      updateSettings: (s) => setSettings((prev) => ({ ...prev, ...s })),
    }),
    [hydrated, patients, appointments, settings, theme, addPatient],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
