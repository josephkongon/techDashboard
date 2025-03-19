import { apiClient } from "@/service/axios.service.ts";
import { UsersType } from "@/types/auth.ts";

export const login = async (payload: { email: string; password: string }) => {
  return apiClient
    .post<UsersType>(`/auth/login`, payload)
    .then((res) => res.data);
};
