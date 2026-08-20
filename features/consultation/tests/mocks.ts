import type { ConsultationFormData } from "@/features/consultation/types";

export const mockConsultationData: ConsultationFormData = {
  name: "Test User",
  phone: "9876543210",
  email: "test@example.com",
  location: "Bilaspur",
  service: "Interior Design",
  budget: "₹25L – ₹50L",
  message: "Test consultation inquiry",
};

export const mockFetchSuccess = () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      success: true,
      message: "Consultation submitted successfully",
    }),
  });
};

export const mockFetchError = (message = "Failed to submit") => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: message }),
  });
};
