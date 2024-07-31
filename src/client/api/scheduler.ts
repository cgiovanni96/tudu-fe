import { queryOptions } from "@tanstack/react-query";
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

export const SCHEDULERS = {
  getScheduledTasks,
};
