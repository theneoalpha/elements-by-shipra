import { z } from "zod";

import {
  BUDGET_RANGES,
  MESSAGE_MAX_LENGTH,
  SERVICE_OPTIONS,
} from "@/features/consultation/constants";
import { REGEX } from "@/shared/helper/regex";

export const consultationFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(
      REGEX.alphabeticNameWithHyphen.pattern,
      REGEX.alphabeticNameWithHyphen.message,
    ),
  phone: z
    .string()
    .regex(REGEX.mobileNumber.pattern, REGEX.mobileNumber.message),
  email: z
    .string()
    .regex(REGEX.email.pattern, REGEX.email.message)
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .min(2, "Location is required")
    .regex(REGEX.cityName.pattern, REGEX.cityName.message),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please select a service",
  }),
  budget: z.enum(BUDGET_RANGES, {
    message: "Please select a budget range",
  }),
  message: z
    .string()
    .max(
      MESSAGE_MAX_LENGTH,
      `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer`,
    )
    .optional()
    .or(z.literal("")),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;
