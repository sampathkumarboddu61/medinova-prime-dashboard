/** Realistic seed data for the MediNova hospital dashboard. */

export type PatientStatus = "Stable" | "Observation" | "Critical" | "Discharged";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  email?: string;
  bloodGroup?: string;
  department: string;
  doctor: string;
  status: PatientStatus;
  address?: string;
  notes?: string;
}

export type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

export interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  department: string;
  date: string; // yyyy-mm-dd
  time: string;
  type: string;
  status: AppointmentStatus;
}

export const DEPARTMENTS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Emergency",
  "General Medicine",
  "Dermatology",
  "Radiology",
] as const;

export const DOCTORS = [
  {
    name: "Dr. Ananya Sharma",
    specialization: "Cardiologist",
    department: "Cardiology",
    experience: "12 yrs",
    rating: 4.9,
    patients: 218,
    available: true,
    initials: "AS",
  },
  {
    name: "Dr. Vikram Rao",
    specialization: "Orthopedic Surgeon",
    department: "Orthopedics",
    experience: "16 yrs",
    rating: 4.8,
    patients: 184,
    available: true,
    initials: "VR",
  },
  {
    name: "Dr. Sneha Mehta",
    specialization: "Neurologist",
    department: "Neurology",
    experience: "9 yrs",
    rating: 4.7,
    patients: 143,
    available: false,
    initials: "SM",
  },
  {
    name: "Dr. Arjun Patel",
    specialization: "General Physician",
    department: "General Medicine",
    experience: "7 yrs",
    rating: 4.6,
    patients: 306,
    available: true,
    initials: "AP",
  },
  {
    name: "Dr. Kavya Nair",
    specialization: "Pediatrician",
    department: "Pediatrics",
    experience: "11 yrs",
    rating: 4.9,
    patients: 251,
    available: true,
    initials: "KN",
  },
  {
    name: "Dr. Rohit Desai",
    specialization: "Emergency Medicine",
    department: "Emergency",
    experience: "14 yrs",
    rating: 4.5,
    patients: 402,
    available: false,
    initials: "RD",
  },
];

export const SEED_PATIENTS: Patient[] = [
  {
    id: "PT-1042",
    name: "Rahul Verma",
    age: 46,
    gender: "Male",
    phone: "+91 98220 41122",
    department: "Cardiology",
    doctor: "Dr. Ananya Sharma",
    status: "Critical",
    bloodGroup: "B+",
  },
  {
    id: "PT-1043",
    name: "Meera Iyer",
    age: 33,
    gender: "Female",
    phone: "+91 99870 22314",
    department: "Neurology",
    doctor: "Dr. Sneha Mehta",
    status: "Observation",
    bloodGroup: "O+",
  },
  {
    id: "PT-1044",
    name: "Sahil Khan",
    age: 27,
    gender: "Male",
    phone: "+91 90045 88190",
    department: "Orthopedics",
    doctor: "Dr. Vikram Rao",
    status: "Stable",
    bloodGroup: "A+",
  },
  {
    id: "PT-1045",
    name: "Ishita Bose",
    age: 8,
    gender: "Female",
    phone: "+91 98111 20034",
    department: "Pediatrics",
    doctor: "Dr. Kavya Nair",
    status: "Stable",
    bloodGroup: "AB+",
  },
  {
    id: "PT-1046",
    name: "Deepak Menon",
    age: 61,
    gender: "Male",
    phone: "+91 97654 71209",
    department: "General Medicine",
    doctor: "Dr. Arjun Patel",
    status: "Discharged",
    bloodGroup: "O-",
  },
  {
    id: "PT-1047",
    name: "Priya Raut",
    age: 39,
    gender: "Female",
    phone: "+91 93720 55418",
    department: "Emergency",
    doctor: "Dr. Rohit Desai",
    status: "Critical",
    bloodGroup: "B-",
  },
  {
    id: "PT-1048",
    name: "Aditya Kulkarni",
    age: 52,
    gender: "Male",
    phone: "+91 98904 33871",
    department: "Cardiology",
    doctor: "Dr. Ananya Sharma",
    status: "Observation",
    bloodGroup: "A-",
  },
  {
    id: "PT-1049",
    name: "Farida Sheikh",
    age: 45,
    gender: "Female",
    phone: "+91 90210 74466",
    department: "Dermatology",
    doctor: "Dr. Arjun Patel",
    status: "Stable",
    bloodGroup: "AB-",
  },
];

const today = () => new Date().toISOString().slice(0, 10);
const offset = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "AP-3301",
    patient: "Rahul Verma",
    doctor: "Dr. Ananya Sharma",
    department: "Cardiology",
    date: today(),
    time: "09:30",
    type: "Follow-up",
    status: "Confirmed",
  },
  {
    id: "AP-3302",
    patient: "Meera Iyer",
    doctor: "Dr. Sneha Mehta",
    department: "Neurology",
    date: today(),
    time: "11:00",
    type: "Consultation",
    status: "Pending",
  },
  {
    id: "AP-3303",
    patient: "Sahil Khan",
    doctor: "Dr. Vikram Rao",
    department: "Orthopedics",
    date: today(),
    time: "13:15",
    type: "Post-op review",
    status: "Completed",
  },
  {
    id: "AP-3304",
    patient: "Ishita Bose",
    doctor: "Dr. Kavya Nair",
    department: "Pediatrics",
    date: offset(1),
    time: "10:00",
    type: "Vaccination",
    status: "Confirmed",
  },
  {
    id: "AP-3305",
    patient: "Priya Raut",
    doctor: "Dr. Rohit Desai",
    department: "Emergency",
    date: offset(1),
    time: "16:45",
    type: "Trauma review",
    status: "Pending",
  },
  {
    id: "AP-3306",
    patient: "Deepak Menon",
    doctor: "Dr. Arjun Patel",
    department: "General Medicine",
    date: offset(2),
    time: "12:30",
    type: "Health check",
    status: "Cancelled",
  },
  {
    id: "AP-3307",
    patient: "Aditya Kulkarni",
    doctor: "Dr. Ananya Sharma",
    department: "Cardiology",
    date: offset(3),
    time: "08:45",
    type: "Angiography prep",
    status: "Confirmed",
  },
];

export const DEPARTMENT_STATS = [
  { name: "Cardiology", doctors: 12, patients: 342, beds: 18, occupancy: 82 },
  { name: "Neurology", doctors: 8, patients: 214, beds: 11, occupancy: 68 },
  { name: "Orthopedics", doctors: 10, patients: 268, beds: 14, occupancy: 74 },
  { name: "Pediatrics", doctors: 9, patients: 301, beds: 22, occupancy: 61 },
  { name: "Emergency", doctors: 14, patients: 486, beds: 9, occupancy: 93 },
  { name: "General Medicine", doctors: 16, patients: 512, beds: 26, occupancy: 57 },
  { name: "Dermatology", doctors: 5, patients: 128, beds: 6, occupancy: 34 },
  { name: "Radiology", doctors: 7, patients: 196, beds: 8, occupancy: 45 },
];

export type BedStatus = "Available" | "Occupied" | "Critical" | "Cleaning";

export const WARDS = ["General Ward", "ICU", "Emergency", "Maternity", "Pediatric"] as const;

export const BEDS = Array.from({ length: 40 }, (_, i) => {
  const ward = WARDS[i % WARDS.length]!;
  const statuses: BedStatus[] = ["Available", "Occupied", "Critical", "Cleaning"];
  const status = statuses[(i * 3 + (i % 5)) % 4]!;
  return {
    id: `${ward.slice(0, 2).toUpperCase()}-${101 + i}`,
    ward,
    status,
    patient:
      status === "Occupied" || status === "Critical" ? SEED_PATIENTS[i % 8]!.name : null,
  };
});


export const MEDICINES = [
  {
    id: "MD-01",
    name: "Amoxicillin 500mg",
    category: "Antibiotic",
    stock: 480,
    price: 12.5,
    expiry: "2027-04-12",
    supplier: "Cipla Ltd.",
  },
  {
    id: "MD-02",
    name: "Atorvastatin 20mg",
    category: "Cardiac",
    stock: 42,
    price: 18.0,
    expiry: "2026-11-30",
    supplier: "Sun Pharma",
  },
  {
    id: "MD-03",
    name: "Paracetamol 650mg",
    category: "Analgesic",
    stock: 1260,
    price: 3.2,
    expiry: "2028-01-20",
    supplier: "Mankind",
  },
  {
    id: "MD-04",
    name: "Insulin Glargine",
    category: "Diabetology",
    stock: 26,
    price: 410.0,
    expiry: "2026-09-08",
    supplier: "Novo Nordisk",
  },
  {
    id: "MD-05",
    name: "Salbutamol Inhaler",
    category: "Respiratory",
    stock: 154,
    price: 235.0,
    expiry: "2027-06-14",
    supplier: "Cipla Ltd.",
  },
  {
    id: "MD-06",
    name: "Heparin 5000 IU",
    category: "Anticoagulant",
    stock: 18,
    price: 320.0,
    expiry: "2026-10-02",
    supplier: "Dr. Reddy's",
  },
  {
    id: "MD-07",
    name: "Ondansetron 4mg",
    category: "Antiemetic",
    stock: 388,
    price: 9.4,
    expiry: "2027-12-01",
    supplier: "Zydus",
  },
];

export const INVOICES = [
  {
    id: "INV-9021",
    patient: "Rahul Verma",
    treatment: "Angioplasty",
    doctor: "Dr. Ananya Sharma",
    amount: 248000,
    status: "Paid" as const,
    date: "2026-08-24",
  },
  {
    id: "INV-9022",
    patient: "Meera Iyer",
    treatment: "MRI + Consultation",
    doctor: "Dr. Sneha Mehta",
    amount: 18400,
    status: "Pending" as const,
    date: "2026-08-26",
  },
  {
    id: "INV-9023",
    patient: "Sahil Khan",
    treatment: "ACL Reconstruction",
    doctor: "Dr. Vikram Rao",
    amount: 162500,
    status: "Paid" as const,
    date: "2026-08-27",
  },
  {
    id: "INV-9024",
    patient: "Priya Raut",
    treatment: "Emergency Trauma Care",
    doctor: "Dr. Rohit Desai",
    amount: 74300,
    status: "Overdue" as const,
    date: "2026-07-30",
  },
  {
    id: "INV-9025",
    patient: "Ishita Bose",
    treatment: "Pediatric Observation",
    doctor: "Dr. Kavya Nair",
    amount: 9800,
    status: "Paid" as const,
    date: "2026-08-29",
  },
  {
    id: "INV-9026",
    patient: "Aditya Kulkarni",
    treatment: "Cardiac Screening",
    doctor: "Dr. Ananya Sharma",
    amount: 22600,
    status: "Pending" as const,
    date: "2026-08-30",
  },
];

export const LAB_TESTS = [
  {
    id: "LT-5501",
    patient: "Rahul Verma",
    test: "Troponin-I",
    doctor: "Dr. Ananya Sharma",
    date: "2026-08-30",
    result: "0.42 ng/mL",
    status: "Critical" as const,
  },
  {
    id: "LT-5502",
    patient: "Meera Iyer",
    test: "MRI Brain Contrast",
    doctor: "Dr. Sneha Mehta",
    date: "2026-08-30",
    result: "Pending",
    status: "Pending" as const,
  },
  {
    id: "LT-5503",
    patient: "Sahil Khan",
    test: "Vitamin D3",
    doctor: "Dr. Vikram Rao",
    date: "2026-08-29",
    result: "22 ng/mL",
    status: "Completed" as const,
  },
  {
    id: "LT-5504",
    patient: "Ishita Bose",
    test: "CBC Panel",
    doctor: "Dr. Kavya Nair",
    date: "2026-08-29",
    result: "Normal",
    status: "Completed" as const,
  },
  {
    id: "LT-5505",
    patient: "Priya Raut",
    test: "Arterial Blood Gas",
    doctor: "Dr. Rohit Desai",
    date: "2026-08-31",
    result: "Pending",
    status: "Pending" as const,
  },
  {
    id: "LT-5506",
    patient: "Deepak Menon",
    test: "HbA1c",
    doctor: "Dr. Arjun Patel",
    date: "2026-08-28",
    result: "9.1%",
    status: "Critical" as const,
  },
];

export const PATIENT_GROWTH = [
  { month: "Mar", patients: 1620, admissions: 420 },
  { month: "Apr", patients: 1785, admissions: 468 },
  { month: "May", patients: 1902, admissions: 501 },
  { month: "Jun", patients: 2104, admissions: 552 },
  { month: "Jul", patients: 2288, admissions: 590 },
  { month: "Aug", patients: 2486, admissions: 634 },
];

export const REVENUE_TREND = [
  { month: "Mar", revenue: 42 },
  { month: "Apr", revenue: 47 },
  { month: "May", revenue: 51 },
  { month: "Jun", revenue: 49 },
  { month: "Jul", revenue: 58 },
  { month: "Aug", revenue: 64 },
];

export const APPOINTMENT_MIX = [
  { name: "Confirmed", value: 62 },
  { name: "Pending", value: 18 },
  { name: "Completed", value: 34 },
  { name: "Cancelled", value: 6 },
];
