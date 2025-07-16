export type CardData = {
  label: string;
  value: number | string;
  icon: string;
  iconBgColor?: string; // e.g. bg-[#D8E8FF]
  change?: number;
  changeText: string;
  changeType: "up" | "down"; // used for arrow icon and color
  changePercent?: string;
  percentColor?: string; // e.g. text-[#1FE08F] for up, text-[#FF5757] for down"
  bottomIcon?: string; // Optional, used for additional icons if needed
};

export type CardProps = {
  data: CardData;
  type?: "first" | "second";
};

export interface TableData {
  id?: string;
  clientName: string;
  initiateDate?: string;
  caseType?: string;
  assignedAttorney?: string;
  lastActivity: string;
  status: "Active" | "Pending" | "Completed";
}

export interface ChartData {
  month: string;
  applications: number;
  completed: number;
}

export type LawyerData = {
  id: string;
  clientName: string;
  password: string;
  status: "Active" | "Submitted";
  role: "Lawyer" | "Admin";
  lastActivity: string;
};
