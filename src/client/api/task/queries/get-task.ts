import { axios } from "@/client/axios";
import { Task, TaskContent } from "@/client/schema";
import { BaseResponse } from "@/client/types";
import { queryOptions } from "@tanstack/react-query";

export const getTask = (id?: number) =>
  queryOptions({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/tasks/${id}`);
      const responseData = response.data as BaseResponse<Task>;

      const content = responseData.data.content;
      if (!content) {
        return responseData;
      }

      const parsed = JSON.parse(content as unknown as string) as TaskContent;

      return {
        data: {
          ...responseData.data,
          content: parsed.length > 0 ? parsed : undefined,
        },
      };
    },
    enabled: !!id,
  });
