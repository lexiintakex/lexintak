export interface CreateCommentPayload {
  user_id: string;
  created_by: string;
  comment: string;
  type: string;
  role?: string;
}
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateCommentPayload) => {
      const res = await axiosInstance.post("/comments", payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.user_id, variables.type],
      });
    },
  });
};

export const useGetComments = (
  userId: string,
  type: string,
  current_user_id: string
) => {
  return useQuery({
    queryKey: ["comments", userId, type, current_user_id],
    queryFn: async () => {
      const res = await axiosInstance.get("/comments", {
        params: { user_id: userId, type, current_user_id },
      });
      return res.data.comments || [];
    },
    enabled: !!userId && !!type,
  });
};

export const useUpdateComment = (commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { comment: string }) => {
      const res = await axiosInstance.put(`/comments/${commentId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => {
      const res = await axiosInstance.delete(`/comments/${commentId}`);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};
