import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";

export const createProduct = (payload: any) => {
  return apiClient.post("/product", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProduct = () => {
  return apiClient
    .get<IPaginatedData<any[]>>("/product?join=productImages")
    .then((res) => res.data);
};
