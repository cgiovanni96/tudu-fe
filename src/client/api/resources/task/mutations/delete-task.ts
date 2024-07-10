import { axios } from "@/client/axios";
import { Task } from "@/client/schema";
import { BaseResponse } from "@/client/types";
import { QueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteTaskMutation = (client: QueryClient) =>
  useMutation({
    mutationKey: ["delete-task"],
    mutationFn: async (dto: { id: number }) => {
      try {
        await axios.delete(`/api/v1/tasks/${dto.id}`);
        return true;
      } catch (e) {
        console.error("delete-task-error", e);
        return false;
      }
    },
    onSettled: async () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
    },

    onMutate: (dto: { id: number }) => {
      const previousTasks = client.getQueryData(["tasks"]) as BaseResponse<
        Array<Task>
      >;

      return {
        data: previousTasks.data.filter((task) => task.id !== dto.id),
      };
    },
  });
