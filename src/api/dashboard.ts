import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface DashboardMetric {
  count: number;
  change: number;
  trend: "up" | "down";
}

export interface DashboardData {
  activeClients: DashboardMetric;
  applicationStarted: DashboardMetric;
  applicationCompleted: DashboardMetric;
  applicationPending: DashboardMetric;
}

export const useDashboardData = () : UseQueryResult<DashboardData, Error> => {
  return useQuery<DashboardData, Error>({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard");
      return res.data.data as DashboardData;
    },
  });
};




