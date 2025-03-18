import { apiClient } from "@/service/axios.service.ts";

export const login = async (payload: { email: string; password: string }) => {
  return apiClient.post(`/auth/login`, payload).then((res) => res.data);
};
