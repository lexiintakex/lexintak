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

/**
 * Formats time values from various formats to readable time
 * @param timeValue - Time value that could be seconds, milliseconds, or formatted string
 * @param format - Output format: 'mm:ss', 'hh:mm:ss', or 'readable'
 * @returns Formatted time string
 */
export function formatTimeValue(
  timeValue: number | string | null | undefined,
  format: "mm:ss" | "hh:mm:ss" | "readable" = "mm:ss"
): string {
  if (timeValue === null || timeValue === undefined) return "N/A";

  let totalSeconds: number;

  // Handle string format like "16:32.610000000000014"
  if (typeof timeValue === "string") {
    if (timeValue.includes(":")) {
      // Parse time format like "16:32.610000000000014"
      const parts = timeValue.split(":");
      if (parts.length === 2) {
        const minutes = parseInt(parts[0]) || 0;
        const seconds = parseFloat(parts[1]) || 0;
        totalSeconds = minutes * 60 + seconds;
      } else if (parts.length === 3) {
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        const seconds = parseFloat(parts[2]) || 0;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
      } else {
        return "Invalid format";
      }
    } else {
      // Try to parse as number
      totalSeconds = parseFloat(timeValue) || 0;
    }
  } else {
    // Handle number format
    totalSeconds = timeValue;
  }

  // Convert to appropriate format
  switch (format) {
    case "mm:ss":
      return formatMinutesSeconds(totalSeconds);
    case "hh:mm:ss":
      return formatHoursMinutesSeconds(totalSeconds);
    case "readable":
      return formatReadableTime(totalSeconds);
    default:
      return formatMinutesSeconds(totalSeconds);
  }
}

/**
 * Format time as MM:SS
 */
function formatMinutesSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Format time as HH:MM:SS
 */
function formatHoursMinutesSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Format time in human readable format
 */
function formatReadableTime(totalSeconds: number): string {
  if (totalSeconds < 60) {
    return `${Math.round(totalSeconds)}s`;
  } else if (totalSeconds < 3600) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${minutes}m ${seconds}s`;
  } else {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
}
