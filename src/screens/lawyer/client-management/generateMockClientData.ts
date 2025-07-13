// utils/generateMockClientData.ts
import { TableData } from "@/types/dashboard";

const firstNames = [
  "Lily",
  "James",
  "Sophia",
  "Noah",
  "Isla",
  "Liam",
  "Olivia",
  "Mason",
  "Ava",
  "Lucas",
];
const lastNames = [
  "Brown",
  "Wilson",
  "Johnson",
  "Smith",
  "Miller",
  "Garcia",
  "Martinez",
  "Davis",
  "Lopez",
  "Anderson",
];
const caseTypes = ["Will Prep", "Estate Planning", "Trust Setup", "Probate"];
const attorneys = [
  "Michael White",
  "Jennifer Davis",
  "David Miller",
  "Emily Clark",
];

const workflowStatuses = ["Active", "Pending", "Completed"] as const;

// random helpers ----------------------------------------------------------
const rand = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const pad = (n: number) => n.toString().padStart(2, "0");
const randomDate = () => {
  const dt = new Date(Date.now() - Math.random() * 31536000000); // past year
  return `${pad(dt.getDate())}/${pad(dt.getMonth() + 1)}/${dt.getFullYear()}`;
};
const randomLastActivity = () =>
  ["Updated", "Admin Message Sent", "Completed", "Passport Uploaded"][
    Math.floor(Math.random() * 4)
  ] +
  ` ${Math.floor(Math.random() * 12) + 1}:${pad(
    Math.floor(Math.random() * 60)
  )}`;

// -------------------------------------------------------------------------
/** create N rows that satisfy TableData */
export function generateMockClientData(count = 10): TableData[] {
  return Array.from({ length: count }, () => ({
    clientName: `${rand(firstNames)} ${rand(lastNames)}`,
    initiateDate: randomDate(),
    status: rand([...workflowStatuses]),
    caseType: rand(caseTypes),
    assignedAttorney: rand(attorneys),
    lastActivity: randomLastActivity(),
  }));
}
