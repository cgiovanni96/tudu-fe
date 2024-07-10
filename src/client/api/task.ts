import { QueryClient, useMutation } from "@tanstack/react-query";

import { axios } from "../axios";
import { BaseResponse } from "../types";
import { Task } from "../schema";
import { MUTATIONS } from "./resources/task/mutations";

const useSaveMutation = (client?: QueryClient) =>
  useMutation({
    mutationKey: ["save-task"],
    mutationFn: async (dto: { name: string; description?: string }) => {
      try {
        const response = await axios.post("/api/v1/tasks/", dto);
        return response.data;
      } catch (e) {
        console.error("e");
        throw new Error();
      }
    },
    onSuccess: async () => {
      client?.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

const useCompleteMutation = (client: QueryClient) =>
  useMutation({
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
      client?.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

const getTasks = {
  queryKey: ["tasks"],
  queryFn: async () => {
    const response = await axios.get("/api/v1/tasks/");
    return response.data as BaseResponse<Array<Task>>;
  },
};

export const TASK = {
  useSaveMutation,
  useCompleteMutation,
  ...MUTATIONS,
  getTasks,
};

export type { AddTaskDto } from "./resources/task/dto";
export { addTaskSchema } from "./resources/task/dto";
