import { apiClient } from "@/service/axios.service.ts";
import { IAppConfig } from "@/types/config.ts";

export const getConfig = () => {
  return apiClient.get<IAppConfig[]>("/company-config").then((res) => res.data);
};

export const updateBasic = (id: string, payload: any) => {
  return apiClient
    .patch(`/company-config/${id}`, payload)
    .then((res) => res.data);
};

export const updateImage = (id: string, payload: any) => {
  return apiClient
    .post(`/company-config/update-image/${id}`, payload)
    .then((res) => res.data);
};

export const deleteImage = (id: string) => {
  return apiClient.delete(`/company-config/${id}`).then((res) => res.data);
};
