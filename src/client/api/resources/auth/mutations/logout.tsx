import { axios } from "@/client/axios";
import { MutationParams } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = ({ client }: MutationParams) =>
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
    onSettled: async () => {
      client.invalidateQueries({ queryKey: ["me"] });
      client.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
