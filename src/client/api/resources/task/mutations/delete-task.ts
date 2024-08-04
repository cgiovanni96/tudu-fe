import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/client/axios";
import { Task } from "@/client/schema";
import { BaseResponse } from "@/client/types";

export const useDeleteTaskMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["delete-task"],
    mutationFn: async (id: number) => {
      try {
        await axios.delete(`/api/v1/tasks/${id}`);
        return true;
      } catch (e) {
        console.error("delete-task-error", e);
        return false;
      }
    },
    onSettled: async () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
    },

    onMutate: (id: number) => {
      const previousTasks = client.getQueryData(["tasks"]) as BaseResponse<
        Array<Task>
      >;

      return {
        data: previousTasks.data.filter((task) => task.id !== id),
      };
    },
  });
};
