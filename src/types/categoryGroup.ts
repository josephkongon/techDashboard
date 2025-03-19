import { FileMetadata } from "@/types/file.ts";

export interface CategoryGroup {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  fileId: string;
  file?: FileMetadata;
}
