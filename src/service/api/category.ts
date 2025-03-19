import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";

export const createCategory = (payload: {
  name: string;
  categoryGroupId: string;
}) => {
  return apiClient.post("/category", payload).then((res) => res.data);
};

export const getCategory = () => {
  return apiClient
    .get<IPaginatedData<any[]>>("/category")
    .then((res) => res.data);
};
