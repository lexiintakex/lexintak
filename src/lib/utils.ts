import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const documentTypes = [
  { label: "Passport & Green Card", type: "passport" },
  { label: "Birth Certificate", type: "birth_certificate" },
  { label: "Marriage Certificate", type: "marriage_certificate" },
  { label: "Divorce Decree", type: "divorce_decree" },
  { label: "Green Card", type: "green_card" },
  { label: "Drivers License", type: "drivers_license" },
  { label: "Social Security Card", type: "social_security_card" },
  { label: "Tax Return", type: "tax_return" },
  { label: "Medical Exam", type: "medical_exam" },
  { label: "Police Clearance", type: "police_clearance" },
];

export function formatDate(isoString: string): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
