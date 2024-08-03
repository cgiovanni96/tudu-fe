import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/client/axios";

export const useLogoutMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        axios.post("/api/v1/auth/logout");
        return { success: true };
      } catch {
        throw new Error();
      }
    },
    onSettled: async () => {
      client.invalidateQueries({ queryKey: ["me"] });
      client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
