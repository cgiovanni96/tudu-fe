import { useMutation } from "@tanstack/react-query";
import { axios } from "../axios";

const useCreateUser = () =>
  useMutation({
    mutationKey: ["create-user"],
    mutationFn: async () => {
      await axios.get("/sanctum/csrf-cookie");
      const response = await axios.post("/api/v1/users", {
        name: "prova",
        email: "email@prova.com",
        password: "password1234",
        password_confirmation: "password1234",
      });
      return response.data;
    },
  });

export const USER = {
  useCreateUser,
};
