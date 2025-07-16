import { LawyerData } from "@/types/dashboard";

const firstNames = ["Steve", "Philips", "Marven", "Zeeshan", "Emily", "John"];
const lastNames = ["Smith", "Hugs", "Jones", "Ahmad", "Brown", "Taylor"];
const passwords = ["Steve_5112", "Philips_3444", "Marven_law4567", "Zee_3344"];
const lastActivities = ["Academic Journal", "Legal Brief", "Case Summary"];

const rand = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function generateMockLawyerData(count = 10): LawyerData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    clientName: `${rand(firstNames)} ${rand(lastNames)}`,
    password: rand(passwords),
    status: Math.random() > 0.5 ? "Submitted" : "Active",
    role: "Lawyer",
    lastActivity: rand(lastActivities),
  }));
}
