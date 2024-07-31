import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/axios";

type UseRegisterMutation = { onSuccess?: () => Promise<void> };

export const useRegisterMutation = ({ onSuccess }: UseRegisterMutation) => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (dto: {
      email: string;
      password: string;
      name: string;
    }) => {
      try {
        await axios.get("/sanctum/csrf-cookie");
        await axios.post("/api/v1/users", {
          ...dto,
          password_confirmation: dto.password,
        });
        return { success: true };
      } catch {
        throw new Error();
      }
    },
    onSuccess: async () => {
      if (onSuccess) await onSuccess();
    },
  });
};
