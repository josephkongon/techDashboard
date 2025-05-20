import { apiClient } from "@/service/axios.service.ts";
import { IPaginatedData } from "@/types/api.ts";

export const createOrder = (payload: { userId: string }) => {
  return apiClient.post("/manage-order", payload).then((res) => res.data);
};

export const getAllOrder = ({ filter }: { filter?: string }) => {
  let url = "/manage-order?join=user&sort=createdAt,DESC";

  if (filter) {
    url += `&${filter}`;
  }
  return apiClient.get<IPaginatedData<any[]>>(url).then((res) => res.data);
};

export const getSingleOrder = (id: string) => {
  return apiClient
    .get<any>(
      `/manage-order/${id}?join=user&join=orderProducts&join=orderProducts.product`,
    )
    .then((res) => res.data);
};

export const addProductToOrder = (payload: {
  id: string;
  productId: string;
  quantity: number;
  price?: number;
}) => {
  return apiClient
    .post(`/manage-order/add-product`, payload)
    .then((res) => res.data);
};

export const updateOrderProduct = (id: string, payload: any) => {
  return apiClient
    .patch(`/manage-order/update-order-product/${id}`, payload)
    .then((res) => res.data);
};

export const updateOrder = (id: string, payload: any) => {
  return apiClient
    .patch(`/manage-order/${id}`, payload)
    .then((res) => res.data);
};
