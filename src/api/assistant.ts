import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useWorkflowId = (
  form_type?: string,
  language?: "English" | "Spanish"
) => {
  return useQuery({
    queryKey: ["workflow", form_type, language],
    queryFn: async () => {
      if (!form_type || !language) throw new Error("Missing parameters");

      const response = await axiosInstance.get("/workflow", {
        params: {
          visa_type: form_type.toUpperCase(), // e.g., "I130"
          language,
        },
      });

      return response.data.workflow_id as string;
    },
    enabled: !!form_type && !!language, // Only fetch when both exist
    retry: 1,
  });
};
