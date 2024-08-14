import { axios } from "@/client/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTaskDto } from "../dto";
import { Task } from "@/client/schema";
import { BaseResponse } from "@/client/types";

export const useUpdateTaskMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["update-task"],
    mutationFn: async (data: { id: number; dto: UpdateTaskDto }) => {
      try {
        const response = await axios.patch(
          `/api/v1/tasks/${data.id}`,
          data.dto,
        );
        return response.data;
      } catch (e) {
        console.error("update-task-error", e);
        throw new Error("Update Task Failed");
      }
    },
    onSettled: async (data?: BaseResponse<Task>) => {
      data && client.invalidateQueries({ queryKey: ["task", data.data.id] });
    },
  });
};
