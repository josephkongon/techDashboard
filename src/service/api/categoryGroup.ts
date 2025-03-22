import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";
import { CategoryGroup } from "@/types/categoryGroup.ts";

export const createCategoryGroup = ({ payload }: { payload: FormData }) => {
  return apiClient
    .post("/category-group", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const getCategoryGroup = () => {
  return apiClient
    .get<IPaginatedData<CategoryGroup[]>>("/category-group?join=file")
    .then((res) => res.data);
};

export const updateCategoryGroup = ({
  id,
  payload,
}: {
  id: string;
  payload: FormData;
}) => {
  return apiClient
    .patch(`/category-group/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};
