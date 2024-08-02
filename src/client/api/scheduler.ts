import { QueryClient, queryOptions, useMutation } from "@tanstack/react-query";
import { axios } from "../axios";
import { ScheduledTask } from "../schema";
import { BaseResponse } from "../types";

const getScheduledTasks = queryOptions({
  queryKey: ["scheduled-tasks"],
  queryFn: async () => {
    const response = await axios.get("/api/v1/tasks_mail/");
    const data = response.data as BaseResponse<Array<ScheduledTask>>;
    return data.data;
  },
});

const getSchedulerCounts = queryOptions({
  queryKey: ["scheduled-tasks-count"],
  queryFn: async () => {
    const response = await axios.get("/api/v1/scheduler_count");
    console.log("response", response.data);

    return response.data as { tasks: number };
  },
});

const useDeleteScheduledTask = (client: QueryClient) =>
  useMutation({
    mutationKey: ["delete-scheduled-task"],
    mutationFn: async (taskId: number) => {
      const response = await axios.delete(`/api/v1/tasks_mail/${taskId}`);
      return response.data;
    },

    onSettled: async () => {
      await client.invalidateQueries({ queryKey: ["scheduled-tasks"] });
    },
  });

export const SCHEDULERS = {
  getScheduledTasks,
  getSchedulerCounts,
  useDeleteScheduledTask,
};
