"use client";

import { useFormContext, type FieldValues } from "react-hook-form";

import { FIELD_COMPONENTS } from "./field-components";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import type { TFieldConfig } from "./types";

function getComponentProps<T extends FieldValues>(
  fieldConfig: TFieldConfig<T>,
) {
  const {
    type,
    name: _name,
    label: _label,
    required: _required,
    disabled: _disabled,
    hidden: _hidden,
    showWhen: _showWhen,
    description: _description,
    size: _size,
    ...rest
  } = fieldConfig;

  if (type === "input") {
    const { inputType, ...inputRest } = rest as {
      inputType?: string;
      placeholder?: string;
    };
    return { ...inputRest, type: inputType ?? "text" };
  }

  if (type === "image") {
    const { accept } = rest as { accept?: string };
    return { accept };
  }

  return rest;
}

function FieldRenderer<T extends FieldValues>({
  fieldConfig,
}: {
  fieldConfig: TFieldConfig<T>;
}) {
  const { control } = useFormContext<T>();
  const { type, name, label, required, disabled, description } = fieldConfig;
  const Component = FIELD_COMPONENTS[type];

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="ml-0.5 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Component
              {...getComponentProps(fieldConfig)}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
          {description && (
            <p className="text-[11px] text-[#6E675E]">{description}</p>
          )}
        </FormItem>
      )}
    />
  );
}

export { FieldRenderer };
