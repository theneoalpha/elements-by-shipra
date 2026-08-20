"use client";

import { useFormContext, useWatch, type FieldValues } from "react-hook-form";

import { cn } from "@/shared/utils";

import { FieldRenderer } from "./field-renderer";
import type { TFieldConfig } from "./types";
import { getResponsiveColSpan } from "./utils";

function RenderFields<T extends FieldValues>({
  fields,
  className,
}: {
  fields: TFieldConfig<T>[];
  className?: string;
}) {
  const { control } = useFormContext<T>();
  const watchedValues = useWatch({ control }) as T;

  return (
    <div className={cn("grid grid-cols-12 gap-4 md:gap-6", className)}>
      {fields.map((field) => {
        const isVisible =
          !field.hidden &&
          (field.showWhen ? field.showWhen(watchedValues) : true);

        if (!isVisible) return null;

        return (
          <div key={field.name} className={getResponsiveColSpan(field.size)}>
            <FieldRenderer fieldConfig={field} />
          </div>
        );
      })}
    </div>
  );
}

export { RenderFields };
