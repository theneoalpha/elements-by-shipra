export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  budget: string;
  message: string;
}

export interface ConsultationApiResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
  };
}
