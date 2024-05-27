import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "../axios";
import { BaseResponse } from "../types";
import { Task } from "../schema";

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

const useTasksQuery = () =>
  useQuery<BaseResponse<Array<Task>>>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/tasks/");
      return response.data as BaseResponse<Array<Task>>;
    },
  });

export const TASK = {
  useSaveMutation,
  useTasksQuery,
};
