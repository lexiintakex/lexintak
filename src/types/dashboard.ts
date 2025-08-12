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
  userId: string;
  clientName: string;
  initiateDate?: string;
  caseType?: string;
  formType?: string;
  assignedAttorney?: string;
  lastActivity: string;
  status: "Active" | "Pending" | "Completed";
  note?: string;
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

export type ClientDashboardResponse = {
  stats: {
    status: string;
    progress: number;
    totalDocuments: number;
    totalResponses: number;
  };
  overview: {
    submittedDate: string;
    lastUpdated: string;
    lawyerName: string;
    applicationProgress: {
      step: string;
      completed: boolean;
      eta?: string;
    }[];
  };
  applicationData: {
    key_name: string;
    key_value: string;
    created_at: string;
  }[];
  documents: {
    document_type: string;
    file_paths: {
      file_path: string;
      file_type: string;
    }[];
    created_at: string; // ISO date string
  }[];
};
