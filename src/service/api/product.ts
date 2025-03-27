import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";

export const createProduct = (payload: any) => {
  return apiClient.post("/product", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getProducts = ({ filter }: { filter?: string }) => {
  let url = "/product?join=productImages";

  if (filter) {
    url += `&${filter}`;
  }

  return apiClient.get<IPaginatedData<any[]>>(url).then((res) => res.data);
};

export const updateProduct = (id: string, payload: any) => {
  return apiClient.patch(`/product/${id}`, payload);
};

export const getProduct = (id: string) => {
  return apiClient
    .get<any>(`/product/${id}?join=productImages`)
    .then((res) => res.data);
};
