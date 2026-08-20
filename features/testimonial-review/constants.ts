import type { TFieldConfig } from "@/shared/components/forms/types";

export const reviewFields: TFieldConfig[] = [
  {
    name: "quote",
    label: "Your Review",
    type: "textarea",
    placeholder: "Tell us about your experience working with us...",
    rows: 2,
    required: true,
    size: { xs: 12 },
  },
  {
    name: "name",
    label: "Your Name",
    type: "input",
    placeholder: "e.g. Vikram Verma",
    required: true,
    size: { xs: 12, sm: 6 },
  },
  {
    name: "role",
    label: "Project Type",
    type: "input",
    placeholder: "e.g. RESIDENTIAL PROJECT, LUXE VILLA PROJECT",
    required: true,
    size: { xs: 12, sm: 6 },
  },
  {
    name: "projectImage",
    label: "Project Photo",
    type: "image",
    required: false,
    size: { xs: 12 },
  },
];
