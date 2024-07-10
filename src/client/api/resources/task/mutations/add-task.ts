import { axios } from "@/client/axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { AddTaskDto } from "../dto";

export const useAddTaskMutation = (client: QueryClient) =>
  useMutation({
    mutationKey: ["add-task"],
    mutationFn: async (dto: AddTaskDto) => {
      try {
        const response = await axios.post("/api/v1/tasks/", dto);
        return response.data;
      } catch (e) {
        console.error("add-task-error", e);
        throw new Error("Add Task Failed");
      }
    },
    onSettled: async () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
