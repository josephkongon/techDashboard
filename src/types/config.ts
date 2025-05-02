export interface IAppConfig {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  hotline: string;
  email: string;
  whatsappNumber: string;
  facebook: string;
  baseWhatsappMessage: string;
  enableWhatsapp: boolean;
  aboutUs: string | null;
  configImages: any[];
}
