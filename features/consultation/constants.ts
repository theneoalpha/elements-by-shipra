import type { TFieldConfig } from "@/shared/components/forms/types";

export const SERVICE_OPTIONS = [
  "Interior Design",
  "External Elevation",
  "Vastu Consultation",
  "Commercial Design",
  "Modular Furniture",
] as const;

export const BUDGET_RANGES = [
  "Under ₹10 Lakh",
  "₹10 – 25 Lakh",
  "₹25 – 50 Lakh",
  "₹50 Lakh – 1 Cr",
  "₹1 Cr+",
] as const;

export const MESSAGE_MAX_LENGTH = 500;

export const SERVICE_OPTIONS_LIST = [...SERVICE_OPTIONS];
export const BUDGET_RANGE_OPTIONS = [...BUDGET_RANGES];

export const consultationFields: TFieldConfig[] = [
  {
    name: "service",
    label: "Select Service Required",
    type: "chip",
    options: SERVICE_OPTIONS.map((s) => ({ value: s, label: s })),
    required: true,
    size: { xs: 12 },
  },
  {
    name: "name",
    label: "Your Full Name",
    type: "input",
    placeholder: "e.g. Vikram Verma",
    required: true,
    size: { xs: 12, sm: 6 },
  },
  {
    name: "phone",
    label: "Contact Number",
    type: "input",
    inputType: "tel",
    placeholder: "e.g. 98765 43210",
    required: true,
    size: { xs: 12, sm: 6 },
  },
  {
    name: "email",
    label: "Email Address",
    type: "input",
    inputType: "email",
    placeholder: "e.g. vikram@example.com",
    required: false,
    size: { xs: 12, sm: 6 },
  },
  {
    name: "location",
    label: "Project City / Location",
    type: "input",
    placeholder: "e.g. Bilaspur / Raipur",
    required: true,
    size: { xs: 12, sm: 6 },
  },
  {
    name: "budget",
    label: "Estimated Budget",
    type: "chipGroup",
    options: BUDGET_RANGES.map((b) => ({ value: b, label: b })),
    required: true,
    size: { xs: 12 },
  },
  {
    name: "message",
    label: "Tell Us About Your Space (Optional)",
    type: "textarea",
    placeholder: "Describe your space, timeline, and aesthetic preferences...",
    rows: 3,
    maxLength: MESSAGE_MAX_LENGTH,
    required: false,
    size: { xs: 12 },
  },
];
