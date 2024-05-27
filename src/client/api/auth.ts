import { QueryClient, useMutation } from "@tanstack/react-query";

import { axios } from "../axios";
import { User } from "../schema";

export type Login = {
  email: string;
  password: string;
};

const useLoginMutation = (client: QueryClient) =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: Login) => {
      try {
        await axios.get("/sanctum/csrf-cookie");
        await axios.post("/api/v1/auth/login", {
          email,
          password,
        });
        return { success: true };
      } catch {
        throw new Error();
      }
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["me"] });
    },
  });

const me = async () => {
  try {
    const response = await axios.get("/api/v1/auth/me");
    return response.data as User;
  } catch {
    console.log("here");
    throw new Error();
  }
};

const useLogoutMutation = (client: QueryClient) =>
  useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        axios.post("/api/v1/auth/logout");
        return { success: true };
      } catch {
        throw new Error();
      }
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["me"] });
      await client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

export const AUTH = {
  useLoginMutation,
  me,
  useLogoutMutation,
};
