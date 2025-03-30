import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";

export const createCategoryMenu = ({ payload }: { payload: any }) => {
  return apiClient.post("/category-menu", payload).then((res) => res.data);
};

export const getCategoryMenu = () => {
  return apiClient
    .get<IPaginatedData<any[]>>("/category-menu?join=categoryGroups")
    .then((res) => res.data);
};

export const updateCategoryMenu = ({
  id,
  payload,
}: {
  id: string;
  payload: any;
}) => {
  return apiClient
    .patch(`/category-menu/${id}`, payload)
    .then((res) => res.data);
};
