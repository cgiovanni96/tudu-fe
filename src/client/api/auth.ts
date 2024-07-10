import { useQuery } from "@tanstack/react-query";

import { axios } from "../axios";
import { User } from "../schema";
import { MUTATIONS } from "./resources/auth/mutations";

export type Login = {
  email: string;
  password: string;
};

const me = async () => {
  try {
    const response = await axios.get("/api/v1/auth/me");
    return response.data as User;
  } catch (e) {
    console.error("me-error", e);
    throw new Error();
  }
};

const useMe = () => useQuery({ queryKey: ["me"], queryFn: me });

export const AUTH = {
  MUTATIONS,
  useMe,
  me,
};
