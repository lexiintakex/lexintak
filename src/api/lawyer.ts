import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRegisterLawyer = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post("/register-lawyer", data);
      return res.data;
    },
  });
};

export const useGetLawyers = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ["lawyers", page, limit, search],
    queryFn: async () => {
      const res = await axiosInstance.get("/lawyers", {
        params: { page, limit, search },
      });
      return res.data;
    },
  });
};

export const useDeleteLawyer = () => {
  return useMutation({
    mutationFn: async (lawyerId: string) => {
      const res = await axiosInstance.delete(`/lawyers/${lawyerId}`);
      return res.data;
    },
  });
};
