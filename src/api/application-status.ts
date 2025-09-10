import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface ApplicationStatus {
  id: string;
  user_id: string;
  status: string;
  message: string;
  lawyer_id: string;
  updated_at: string;
  created_at: string;
}

export interface UpdateApplicationStatusPayload {
  id: string;
  status: string;
  message: string;
}

export interface CreateApplicationStatusPayload {
  user_id: string;
  status: string;
  message: string;
}

export const useGetApplicationStatus = (user_id: string) => {
  return useQuery<ApplicationStatus[]>({
    queryKey: ["applicationStatus", user_id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/application-status/${user_id}`);
      return res.data.application_status;
    },
  });
};
export const useCreateApplicationStatus = () => {
  return useMutation<
    CreateApplicationStatusPayload,
    Error,
    CreateApplicationStatusPayload
  >({
    mutationFn: async (payload: CreateApplicationStatusPayload) => {
      const res = await axiosInstance.post(`/application-status`, {
        user_id: payload.user_id,
        status: payload.status,
        message: payload.message,
      });
      return res.data;
    },
  });
};

// ✅ Update Application Status Hook
export const useUpdateApplicationStatus = () => {
  return useMutation<
    UpdateApplicationStatusPayload,
    Error,
    UpdateApplicationStatusPayload
  >({
    mutationFn: async (payload: UpdateApplicationStatusPayload) => {
      const res = await axiosInstance.put(`/application-status/${payload.id}`, {
        status: payload.status,
        message: payload.message,
      });
      return res.data;
    },
  });
};

export const useDeleteApplicationStatus = () => {
  return useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/application-status/${id}`);
      console.log("res", res);
      return res.data;
    },
  });
};
