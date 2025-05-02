import { apiClient } from "@/service/axios.service.ts";
import { FileMetadata } from "@/types/file.ts";

export interface ILocation {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  city: string;
  phone1: string;
  phone2: string | null;
  address: string;
  officeHours: string;
  fileId: string;
  file: FileMetadata;
}
export const createContactUs = (payload: any) => {
  return apiClient
    .post("/contact-us/create", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const getContactUs = () => {
  return apiClient.get<ILocation[]>("/contact-us").then((res) => res.data);
};
