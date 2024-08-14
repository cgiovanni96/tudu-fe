import { axios } from "@/client/axios";
import { User } from "@/client/schema";
import { useQuery } from "@tanstack/react-query";

const me = async () => {
  try {
    const response = await axios.get("/api/v1/auth/me");
    return response.data as User;
  } catch (e) {
    console.error("me-error", e);
    throw new Error();
  }
};

export const useMe = () => useQuery({ queryKey: ["me"], queryFn: me });
