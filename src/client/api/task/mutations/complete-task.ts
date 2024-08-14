import { axios } from "@/client/axios";
import { Task } from "@/client/schema";
import { BaseResponse } from "@/client/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCompleteTaskMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["complete-task"],
    mutationFn: async (id: number) => {
      try {
        const response = await axios.patch(`/api/v1/tasks/${id}/complete`);
        return response.data;
      } catch (e) {
        console.error(e);
        throw new Error();
      }
    },
    onMutate: async (id: number) => {
      const previousTasks = client.getQueryData(["tasks"]) as BaseResponse<
        Array<Task>
      >;

      const filteredTasks = previousTasks.data.filter((task) => task.id !== id);

      return {
        data: filteredTasks,
      };
    },
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
