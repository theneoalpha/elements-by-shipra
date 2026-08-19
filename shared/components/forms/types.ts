import type { FieldPath, FieldValues } from "react-hook-form";

export type SelectOption = {
  value: string | number;
  label: string;
};

export type TColSpan = Partial<
  Record<"xs" | "sm" | "md" | "lg" | "xl", number>
>;

type TBaseField<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  showWhen?: (values: T) => boolean;
  description?: string;
  size?: TColSpan;
};

type TFieldTypeProps =
  | {
      type: "input";
      inputType?: React.ComponentProps<"input">["type"];
      placeholder?: string;
    }
  | { type: "select"; options: SelectOption[]; placeholder?: string }
  | { type: "chip"; options: SelectOption[] }
  | { type: "chipGroup"; options: SelectOption[] }
  | {
      type: "textarea";
      placeholder?: string;
      rows?: number;
      maxLength?: number;
    };

export type TFieldConfig<T extends FieldValues = FieldValues> = TBaseField<T> &
  TFieldTypeProps;

export type FormSubmitStatus =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };
