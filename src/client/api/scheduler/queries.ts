import { queryOptions } from "@tanstack/react-query";

import { axios } from "@/client/axios";
import { ScheduledTask } from "@/client/schema";
import { BaseResponse } from "@/client/types";

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

export const QUERIES = {
  getScheduledTasks,
  getSchedulerCounts,
};
