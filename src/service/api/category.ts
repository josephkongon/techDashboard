import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";

export const createCategory = (payload: {
  name: string;
  categoryGroupId: string;
}) => {
  return apiClient.post("/category", payload).then((res) => res.data);
};

export const getCategory = ({ filter }: { filter?: string }) => {
  let url = "/category";

  if (filter) {
    url += `?${filter}`;
  }

  return apiClient.get<IPaginatedData<any[]>>(url).then((res) => res.data);
};

export const updateCategory = (
  id: string,
  payload: {
    name: string;
    categoryGroupId: string;
  },
) => {
  return apiClient.patch(`/category/${id}`, payload).then((res) => res.data);
};
