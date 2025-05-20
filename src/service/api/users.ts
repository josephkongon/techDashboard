import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";

export const getAllUsers = ({ filter }: { filter?: string }) => {
  let url = "/user";

  if (filter) {
    url += `?${filter}`;
  }

  return apiClient.get<IPaginatedData<any[]>>(url).then((res) => res.data);
};

export const createUser = (payload: any) => {
  return apiClient.post("/user", payload).then((res) => res.data);
};

export const updateUser = (id: string, payload: any) => {
  return apiClient.patch(`/user/${id}`, payload).then((res) => res.data);
};
