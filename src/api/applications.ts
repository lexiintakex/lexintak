import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { User } from "@/types/auth";

export interface UserResponse {
  key_name: string;
  key_value: string;
  language: string;
}

export interface DocumentFile {
  file_type: string;
  file_url: string;
}

export interface Document {
  document_id: number;
  document_type: string;
  file_paths: DocumentFile[];
}

export interface ApplicationData {
  success: boolean;
  user_id: string;
  responses: UserResponse[];
  documents: Document[];
  user: User;
  pdf_summary: {
    is_completed_pdf: boolean;
    is_completed_pdf_url?: string;
  };
}

export const useApplicationByUserId = (
  userId: string | undefined,
  enabled: boolean = true
) => {
  return useQuery<ApplicationData>({
    queryKey: ["applicationByUser", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/applications/by-user/${userId}`);
      return res.data;
    },
    enabled: !!userId && enabled,
  });
};
