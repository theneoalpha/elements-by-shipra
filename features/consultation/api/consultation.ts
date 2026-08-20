import type { ConsultationFormData } from "@/features/consultation/types";

export async function submitConsultation(
  data: ConsultationFormData,
): Promise<{ success: boolean; message: string }> {
  const response = await fetch("/api/consultation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit consultation");
  }

  return response.json();
}
