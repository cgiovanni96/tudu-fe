import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import { axios } from "@/client/axios";
import { AuthContext } from "@/providers";

type UseLoginMutation = { onSuccess?: () => Promise<void> };

export const useLoginMutation = ({ onSuccess }: UseLoginMutation) => {
  const auth = useContext(AuthContext);
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
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
      if (onSuccess) {
        await onSuccess();
      }
    },
    onError: async () => {
      await auth?.clear();
    },
  });
};
