import type { ConsultationFormData } from "@/features/consultation/types";

export async function sendConsultationEmail(
  data: ConsultationFormData,
): Promise<{ success: boolean; message: string }> {
  const response = await fetch("/api/consultation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to send consultation email");
  }

  return result;
}
