export interface FileMetadata {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  fileName: string;
  size: string;
  mimeType: string;
  originalUrl: string;
  thumbnailUrl: string;
  mediumUrl: string;
  largeUrl: string;
}
