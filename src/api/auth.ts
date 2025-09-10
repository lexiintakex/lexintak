import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export interface RegisterClientPayload {
  full_name: string;
  email: string;
  phone: string;
  form_type: string;
  username: string;
  password: string;
  created_by: string;
}

interface SendOtpPayload {
  type: "email" | "phone";
  value: string;
}

export const useRegisterClient = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  return useMutation({
    mutationFn: async (payload: RegisterClientPayload) => {
      const res = await axiosInstance.post("/register", payload);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("🚀 ~ useRegisterClient ~ data:", data);
      onSuccess?.();
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Registration failed";
      onError?.(message);
    },
  });
};

export const useSendOtp = (
  onSuccess?: (msg: string) => void,
  onError?: (msg: string) => void
) => {
  return useMutation({
    mutationFn: async (payload: SendOtpPayload) => {
      const res = await axiosInstance.post(
        "/forgot-password/send-otp",
        payload
      );
      return res.data;
    },
    onSuccess: (data) => {
      onSuccess?.(data.message);
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Failed to send OTP";
      onError?.(message);
    },
  });
};

interface VerifyOtpPayload {
  type: "email" | "phone";
  email: string;
  otp: string;
}

export const useVerifyOtp = (
  onSuccess?: (userId: string) => void,
  onError?: (msg: string) => void
) => {
  return useMutation({
    mutationFn: async (payload: VerifyOtpPayload) => {
      const res = await axiosInstance.post(
        "/forgot-password/verify-otp",
        payload
      );
      return res.data;
    },
    onSuccess: (data) => {
      onSuccess?.(data.user_id);
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "OTP verification failed";
      onError?.(message);
    },
  });
};

interface ResetPasswordPayload {
  email: string;
  new_password: string;
}

export const useResetPassword = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const res = await axiosInstance.post("/forgot-password/reset", payload);
      return res.data;
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Password reset failed";
      onError?.(message);
    },
  });
};

export const useUpdateProfile = (
  onSuccess?: (data: any) => void,
  onError?: (msg: string) => void
) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.put("/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      onSuccess?.(data.user);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error || "Failed to update profile";
      onError?.(message);
    },
  });
};

export interface ClientStatus {
  userId: string;
  clientName: string;
  initiateDate: string;
  status: "Pending" | "Active" | "Completed";
  caseType: string;
  assignedAttorney: string;
  lastActivity: string;
}

interface Filters {
  page?: number;
  limit?: number;
  search?: string;
  email?: string;
  status?: string;
}

export const useClientStatusTable = (filters: Filters = {}) => {
  return useQuery<ClientStatus[]>({
    queryKey: ["clientStatusTable", filters],
    queryFn: async () => {
      const res = await axiosInstance.get("/clients/status-table", {
        params: filters,
      });
      return res.data;
    },
  });
};

interface ApplicationNotePayload {
  clientId: string;
  note: string;
  noteId?: string;
}

export const useCreateApplicationNote = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  return useMutation({
    mutationFn: async (payload: ApplicationNotePayload) => {
      const res = await axiosInstance.post("/application-notes", payload);
      return res.data;
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error || "Failed to create application note";
      onError?.(message);
    },
  });
};

export const useUpdateApplicationNote = (
  onSuccess?: () => void,
  onError?: (msg: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ApplicationNotePayload) => {
      const res = await axiosInstance.put("/application-notes", payload);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["notesByClient", variables.clientId],
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.error || "Failed to update application note";
      onError?.(message);
    },
  });
};

export const useGetNotesByClient = (clientId: string) => {
  return useQuery({
    queryKey: ["notesByClient", clientId],
    queryFn: async () => {
      const res = await axiosInstance.get("/application-notes", {
        params: { clientId },
      });
      return res.data;
    },
  });
};
