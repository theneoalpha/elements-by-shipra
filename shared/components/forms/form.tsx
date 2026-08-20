"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

import { cn } from "@/shared/utils";

const FormFieldContext = React.createContext<{ name: string }>(
  {} as { name: string },
);

function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const FormItemContext = React.createContext<{ id: string }>(
  {} as { id: string },
);

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  };
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("flex flex-col gap-y-1.5", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  const { error, formItemId } = useFormField();

  return (
    <label
      data-slot="form-label"
      htmlFor={formItemId}
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.16em] text-[#4A453E]",
        error && "text-red-500",
        className,
      )}
      {...props}
    />
  );
}

function FormControl({ children }: React.ComponentProps<"div">) {
  const { formItemId, formMessageId, error } = useFormField();

  return (
    <div
      data-slot="form-control"
      id={formItemId}
      aria-describedby={error ? formMessageId : undefined}
      aria-invalid={!!error}
    >
      {children}
    </div>
  );
}

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? "") : children;

  if (!body) return null;

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-[11px] text-red-500", className)}
      {...props}
    >
      {body}
    </p>
  );
}

function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  className,
  children,
}: {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <FormProvider {...form}>
      <form
        className={cn("space-y-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage };
