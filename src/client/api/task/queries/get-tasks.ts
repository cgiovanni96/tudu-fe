import { queryOptions } from "@tanstack/react-query";

import { axios } from "@/client/axios";

import type { Task } from "@/client/schema";
import type { BaseResponse } from "@/client/types";

export const getTasks = queryOptions({
  queryKey: ["tasks"],
  queryFn: async () => {
    const response = await axios.get("/api/v1/tasks/");
    return response.data as BaseResponse<Array<Task>>;
  },
});
