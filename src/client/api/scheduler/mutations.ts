import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/client/axios";

const useDeleteScheduledTask = () => {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["delete-scheduled-task"],
    mutationFn: async (taskId: number) => {
      const response = await axios.delete(`/api/v1/tasks_mail/${taskId}`);
      return response.data;
    },

    onSettled: async () => {
      await client.invalidateQueries({ queryKey: ["scheduled-tasks"] });
    },
  });
};

export const MUTATIONS = {
  useDeleteScheduledTask,
};
