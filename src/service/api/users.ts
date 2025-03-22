import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";
import { CategoryGroup } from "@/types/categoryGroup.ts";

export const getAllUsers = () => {
  return apiClient
    .get<IPaginatedData<CategoryGroup[]>>("/user")
    .then((res) => res.data);
};

export const createUser = (payload: any) => {
  return apiClient.post("/user", payload).then((res) => res.data);
};

export const updateUser = (id: string, payload: any) => {
  return apiClient.patch(`/user/${id}`, payload).then((res) => res.data);
};
