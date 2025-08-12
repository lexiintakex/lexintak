import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { ClientDashboardResponse } from "@/types/dashboard";

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

export const useDashboardData = (): UseQueryResult<DashboardData, Error> => {
  return useQuery<DashboardData, Error>({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard");
      return res.data.data as DashboardData;
    },
  });
};

export const useGetClientDashboardData = (): UseQueryResult<
  ClientDashboardResponse,
  Error
> => {
  return useQuery<ClientDashboardResponse, Error>({
    queryKey: ["client-dashboard-data"],
    queryFn: async () => {
      const res = await axiosInstance.get("/dashboard/client");
      return res.data as ClientDashboardResponse;
    },
  });
};
