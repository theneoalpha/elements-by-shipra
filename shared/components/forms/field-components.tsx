"use client";

import { BudgetChipGroup, ChipGroup } from "@/shared/components/ui/chip-group";
import { Input, Select, Textarea } from "@/shared/components/ui/input";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FIELD_COMPONENTS: Record<string, React.ComponentType<any>> = {
  input: Input,
  select: Select,
  chip: ChipGroup,
  chipGroup: BudgetChipGroup,
  textarea: Textarea,
};
